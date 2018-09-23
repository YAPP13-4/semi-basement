// '/fillMusicTable 접속시 --> DB의 music_table에 값이 채워지도록 하기

const express = require('express');
const bodyparser = require('body-parser');
const axios = require('axios');
const mysql = require('mysql');

const db_config = require('./db_config.json');
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

// 1. 사운드 클라우드 음악 url에서 정보를 추출하기 
//      --> 날짜, 저작자, 해시태그, 음악제목, url, id
// 2. music 테이블에 삽입

const API_HOSTNAME = '//api.soundcloud.com';
const CLIENT_ID = 'a281614d7f34dc30b665dfcaa3ed7505';
const resolveUrl = songUrl => `https:${API_HOSTNAME}/resolve.json?url=${songUrl}&client_id=${CLIENT_ID}`

const SONG_URL_LIST = [
     'https://soundcloud.com/amirarief/love-will-set-you-free-amirarief-kodaline-cover-mp3',
    // 'https://soundcloud.com/filous/kodaline-high-hopes-filous',
    // 'https://soundcloud.com/amirarief/love-will-set-you-free-amirarief-kodaline-cover-mp3',
    // 'https://soundcloud.com/filous/kodaline-high-hopes-filous',
    // 'https://soundcloud.com/in-demand-scotland/kodaline-all-i-want-session',
    // 'https://soundcloud.com/filous/kodaline-high-hopes-filous'
    // 'https://soundcloud.com/youngma/young-ma-ooouuu-1'

];

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
                SONG_URL_LIST.map( (url)=> {
                  return axios.get(resolveUrl(url))
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

                            //길이가 1이면 0개 혹은 1개 
                            //길이가 1보다 크면 태그가 여러개 

                            // rr[0]이 공백이면 태그 0개

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
                })
            }
            _requestId();
        }
    });
});

app.listen(7260, function() {
    console.log('Connected 7260 port!!!');
});