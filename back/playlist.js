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


// 사용자의 플레이 리스트에 추가
app.get('/add_playlist/:user_id', function(req, res) {
    console.log("@" + req.method + " " + req.url);
    var user_id = req.params.user_id;
    user_id = parseInt(user_id);

    // 0. 프론트로부터 버튼이 눌렸을때 url 받기 (나중에 처리해야할 사항)

    var testurl = 'https://soundcloud.com/youngma/young-ma-ooouuu-1';
    SONG_URL = testurl;

    // 1. 테이블이 없으면 생성 (list_테이블만)

    var sql_createPL = 'CREATE TABLE IF NOT EXISTS `new_semibasement`.`list_?` (`list_id` INT(11) NOT NULL AUTO_INCREMENT, `music_id` INT(11) NULL DEFAULT NULL, PRIMARY KEY (`list_id`));';

    conn.query(sql_createPL, [user_id], function(err, result_music_url){
        if(err){
            console.log(err);
        }else{
            console.log('list_' + user_id +' 테이블이 생성됨.');
        }
    });

    // 2. list 테이블에 값 대입 (중복되는 노래는 삽입하지 않도록 예외처리) 
    
    var sql_list = 'insert into list_? (music_id) select ? from dual where not exists (select music_id from list_? where music_id=?);';
    var sql_scid = 'SELECT sc_id FROM music WHERE play_url = ?;'

    conn.query(sql_scid, [SONG_URL], function(err, re_overlap){
        if(err){
            console.log(err)
        }else{
            _requestId = () =>{
                return axios.get(resolveUrl(SONG_URL))
                    .then(response => {
                        let music_id = response.data.id;
                        conn.query(sql_list, [user_id, music_id,user_id, music_id], function(err, rows){
                            if(err){
                                console.log(err);
                            }else{
                                console.log("insert to list table done");
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


// 사용자의 플레이 리스트 보여주기 
app.get('/show_playlist/:user_id', function(req, res){
    console.log("@" + req.method + " " + req.url);
    var user_id = req.params.user_id;
    user_id = parseInt(user_id);

    var sql_music_id = 'SELECT m.play_url from (music m inner join list_? l on m.sc_id=l.music_id);';
    conn.query(sql_music_id, [user_id], function(err, result_music_url){
        if(err){
            console.log(err);
        }
        else{
            res.send(result_music_url);
            console.log("result_music_url : " + JSON.stringify(result_music_url));
        }
    });
});


// 사용자의 플레이 리스트에서 삭제 
app.get('/delete_playlist/:user_id', function(req, res){
    console.log("@" + req.method + " " + req.url);
    var user_id = req.params.user_id;
    user_id = parseInt(user_id);

        // 임시로 받아오는 url (프론트단에서 어떤 값 가져올지 결정 후 구현)
        var testurl = 'https://soundcloud.com/amirarief/love-will-set-you-free-amirarief-kodaline-cover-mp3';
        SONG_URL = testurl;
    
        var sql_musicUrl = 'SELECT sc_id FROM music WHERE play_url = ?;'
        var sql_del_conn = 'delete from list_? where music_id = ?;';
    
        conn.query(sql_musicUrl, [SONG_URL], function(err, re_overlap){
            if(err){
                console.log(err)
            }else{
                _requestId = () =>{
                    return axios.get(resolveUrl(SONG_URL))
                    .then(response => {
                            let music_id = response.data.id;
                            conn.query(sql_del_conn, [user_id, music_id], function(err, rows){
                                if(err){
                                    console.log(err);
                                }else{
                                    console.log("delete list table done");
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

app.listen(7260, function() {
    console.log('Connected 7260 port!!!');
});