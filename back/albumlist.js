// '/show_albumlist:user_id' 에 접속하면 내가 등록한 곡 리스트 뜨게 하기
// '/add_albumlist:user_id' 에서 곡 등록하기

// 나중에 해결해야할 것 
// - 앨범의 이름은 어떤식으로 처리할 것인지 (사용자가 이름부여 가능? or 디폴트 이름? / 만약 사용자가 이름부여하면 url과 같이 이름넘겨 주어야함)
// - 프론트에서부터 받아오는 과정 (지금은 받아와서 변수에 저장했다고 하고 진행 중)

const express = require('express');
const bodyparser = require('body-parser');
const axios = require('axios');
const db_config = require('./db_config.json');
const mysql = require('mysql');

const conn = mysql.createConnection({
    host      : db_config.host,
    user      : db_config.user,
    password  : db_config.password,
    database  : db_config.database
})

conn.connect();
const app = express();

app.use(express.static('public'));
app.use(bodyparser.urlencoded({ extended: false }));

// 고정 변수
const API_HOSTNAME = '//api.soundcloud.com';
const CLIENT_ID = 'a281614d7f34dc30b665dfcaa3ed7505';
const resolveUrl = songUrl => `https:${API_HOSTNAME}/resolve.json?url=${songUrl}&client_id=${CLIENT_ID}`
const SONG_URL_LIST = [
    'https://soundcloud.com/amirarief/love-will-set-you-free-amirarief-kodaline-cover-mp3',
    'https://soundcloud.com/filous/kodaline-high-hopes-filous',
    'https://soundcloud.com/amirarief/love-will-set-you-free-amirarief-kodaline-cover-mp3',
    'https://soundcloud.com/filous/kodaline-high-hopes-filous',
    'https://soundcloud.com/in-demand-scotland/kodaline-all-i-want-session',
    'https://soundcloud.com/filous/kodaline-high-hopes-filous',
    'https://soundcloud.com/youngma/young-ma-ooouuu-1'

];
var SONG_URL;


// 사용자가 자신의 곡을 앨범으로 업로드 
app.get('/add_albumlist/:user_id', function(req, res){
    console.log("@" + req.method + " " + req.url);
    var user_id = req.params.user_id;
    user_id = parseInt(user_id);

    // 0. 프론트로부터 버튼이 눌렸을때 url 받기 (나중에 처리해야할 사항)

    var testurl = 'https://soundcloud.com/amirarief/love-will-set-you-free-amirarief-kodaline-cover-mp3';

    SONG_URL = testurl;

    // 1. 테이블 생성 (테이블이 없을때만 생성 - IF NOT EXISTS 를 이용) 

    var sql_createA = 'CREATE TABLE IF NOT EXISTS `new_semibasement`.`album_?` (`album_id` INT(11) NOT NULL, `album_name` VARCHAR(45) NULL DEFAULT NULL, PRIMARY KEY (`album_id`));'
    var sql_createAc = 'CREATE TABLE IF NOT EXISTS `new_semibasement`.`album_connect_?` (`album_id` INT(11) NULL DEFAULT NULL, `music_id` INT(11) NULL DEFAULT NULL, INDEX `c_album_?_idx` (`album_id` ASC), CONSTRAINT `c_album_?` FOREIGN KEY (`album_id`) REFERENCES `new_semibasement`.`album_?` (`album_id`) ON DELETE CASCADE ON UPDATE CASCADE);';

    conn.query(sql_createA, [user_id], function(err, rows){
        if(err){
            console.log(err);
        }else{
            console.log('album_' + user_id +' 테이블이 생성됨.');
        }
    });

    conn.query(sql_createAc, [user_id, user_id, user_id, user_id], function(err, rows){
        if(err){
            console.log(err);
        }else{
            console.log('album_connect' + user_id +' 테이블이 생성됨.');
        }
    });


    // 2. 프론트에서 받은 url로 먼저 sc_id를 커넥트 테이블에 저장 & 중복 처리

    var sql_albumC = 'INSERT INTO album_connect_? (music_id) VALUES (?);';
    var sql_musicUrl = 'SELECT sc_id FROM music WHERE play_url = ?;'

    conn.query(sql_musicUrl, [SONG_URL], function(err, re_overlap){
        if(err){
            console.log(err)
        }else{
            if(JSON.stringify(re_overlap) == '[]'){
                // 중복되는 url 없음
                _requestId = () =>{
                    return axios.get(resolveUrl(SONG_URL))
                        .then(response => {
                            let music_id = response.data.id;
                            conn.query(sql_albumC, [user_id, music_id], function(err, rows){
                                if(err){
                                    console.log(err);
                                }else{
                                    console.log("insert to album_connect done");
                                    // 3. 해당 url를 '/fillMusicTable' 으로 리다이렉트 시켜서 뮤직테이블에 정보 저장 
                                    res.redirect('/fillMusicTable');
                                }
                            });
                        })
                        .catch(err => {
                            console.log(err);
                        })
                }
                _requestId();
            }else{
                console.log("중복되는 url임. music 테이블에 삽입 불가");
            }
        }
    });
});


// 사용자의 앨범 리스트 보여주기
app.get('/show_albumlist/:user_id', function(req, res) {
    console.log("@" + req.method + " " + req.url);
    var user_id = req.params.user_id;
    user_id = parseInt(user_id);

    var sql_albumlist = 'SELECT m.play_url from (music m inner join album_connect_? c on m.sc_id=c.music_id) left join album_? l  on c.album_id=l.album_id;';

    conn.query(sql_albumlist, [user_id,user_id], function(err, result_music_url){
        if(err){
            console.log(err);
        }
        else{
            res.send(result_music_url);
            console.log("result_music_url : " + JSON.stringify(result_music_url));
        }
    });
});


// 사용자의 앨범 리스트에서 삭제 
// album_connect_(user_id) 테이블에서 해당 music_url을 삭제 
// music 테이블에서 해당 music_url을 가지는 행 삭제 

// 예외처리 할게 있나..?
app.get('/delete_albumlist/:user_id', function(req, res){
    console.log("@" + req.method + " " + req.url);
    var user_id = req.params.user_id;
    user_id = parseInt(user_id);

    // 임시로 받아오는 url (프론트단에서 어떤 값 가져올지 결정 후 구현)
    var testurl = 'https://soundcloud.com/amirarief/love-will-set-you-free-amirarief-kodaline-cover-mp3';
    SONG_URL = testurl;

    var sql_musicUrl = 'SELECT sc_id FROM music WHERE play_url = ?;'
    var sql_del_conn = 'delete from album_connect_? where music_id = ?;';
    var sql_del_music = 'delete from music where sc_id = ?;';

    conn.query(sql_musicUrl, [SONG_URL], function(err, re_overlap){
        if(err){
            console.log("1" + err)
        }else{
            _requestId = () =>{
                return axios.get(resolveUrl(SONG_URL))
                .then(response => {
                        let music_id = response.data.id;
                        conn.query(sql_del_conn, [user_id, music_id], function(err, rows){
                            if(err){
                                console.log(err);
                            }else{
                                console.log("delete album_connect done");
                            }
                        });
                        conn.query(sql_del_music, [music_id], function(err, rows){
                            if(err){
                                console.log(err);
                            }else{
                                console.log("delete music done");
                            }
                        });                    
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
            _requestId();
        }
    });
});


// '/add_albumlist/:user_id' 에서 설정한 SONG_URL 값을 이용해서 music 테이블 채우기
app.get('/fillMusicTable', function(req, res) {

    console.log("@" + req.method + " " + req.url);

    let sql_insert = 'INSERT INTO music (date, music_name, play_url, hashtag_1, hashtag_2, hashtag_3, author, sc_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    let sql_update = 'UPDATE music SET music_name = ?, hashtag_1 = ?, hashtag_2 = ?, hashtag_3 = ? WHERE sc_id = ?';

    conn.query('select m.sc_id from music m;', function(err, count_row, fields) {
        if(err) {
            console.log(err);
        } else {
            var updateTrigger = 0;
            _requestId = () => {
                  return axios.get(resolveUrl(SONG_URL))
                        .then(response => {
                            let sc_id = response.data.id;
                            let play_url = response.data.permalink_url;
                            let date = response.data.created_at;
                            let music_name = response.data.title;
                            let author = response.data.user.username;
                            var hashtag_1 = '';
                            var hashtag_2 = '';
                            var hashtag_3 = '';

                            var rr = new Array();
                            rr = response.data.tag_list.split('\"');

                            if(rr.length == 1){
                                if(rr[0] != ''){
                                    hashtag_1 = rr[0];
                                }
                            } else{
                                hashtag_1 = rr[1];
                                hashtag_2 = rr[2];
                                hashtag_3 = rr[3];
                            }

                            res.send(response.data);


                            for (var i = 0; i < count_row.length; i++){
                                if(count_row[i].sc_id == response.data.id){
                                    console.log("update 필요");
                                    updateTrigger = 1;
                                }
                            }

                            if(updateTrigger == 1){
                                conn.query(sql_update, [music_name, hashtag_1, hashtag_2, hashtag_3, sc_id], function(err, rows){
                                    if(err){
                                        console.log(err);
                                    }else{
                                        console.log("update done");
                                    }
                                })
                            }else if(updateTrigger == 0){
                                conn.query(sql_insert, [date, music_name, play_url, hashtag_1, hashtag_2, hashtag_3, author, sc_id], function(err, rows) {
                                    if(err) {
                                        console.log(err);
                                    } else {
                                        console.log("insert done");
                                    }
                                });    
                            }
                        })
                        .catch(err =>{
                            console.log(err);
                        })
                
            }
            _requestId();
        }
    });
});

app.listen(7260, function() {
    console.log('Connected 7260 port!!!');
});
