const express = require('express');
const bodyparser = require('body-parser');
const mysql = require('mysql');
const db_config = require('./db_config.json');
const conn = mysql.createConnection({
    host      : db_config.host,
    user      : db_config.user,
    password  : db_config.password,
    database  : db_config.database
});

function isEmpty(obj) {
    for(const key123 in obj) {
        if(obj.hasOwnProperty(key123))
            return false;
    }
    return true;
}

// ** heartlist 테이블은 heartlist/:user_id URL에 접근하는 시점에 만들어짐

// 1. 해당 url로 들어왔을 때 유저마다 해당 뮤직에 대한 좋아요 를 누른 이력이 있는 확인

// 2. 있는 경우 화면에 뮤직에 대한 unlike 표시를 하게 한다.
//    없는 경우 화면에 뮤직에 대한 like 표시를 하게 한다.

// 3. 버튼을 누르면 post Request를 보내게 되고 like를 누른 경우 +1, 반대의 경우 -1 하여 update문으로 music 테이블을 수정하고
// heartlist_? 에서 컬럼을 insert 또는 delete 함

conn.connect();
const app = express();
app.use(express.static('public'));
app.use(bodyparser.urlencoded({ extended: false }));

app.get('/heartlist/:user_id', function(req, res) {  
    let user_id = req.params.user_id;
    user_id = parseInt(user_id);
    let sql_createH = 'CREATE TABLE IF NOT EXISTS `kitae`.`heartlist_?` (`heartlist_id` INT(11) NOT NULL AUTO_INCREMENT, `music_id` INT(11) NULL DEFAULT NULL, PRIMARY KEY (`heartlist_id`));'
    let sql_select = 'SELECT music_name, like_count, sc_id from music;'
    let sql_check = 'SELECT DISTINCT m.music_name, m.like_count, m.sc_id FROM (music m INNER JOIN heartlist_? h on m.sc_id=h.music_id);'
    let sql_check2 = 'SELECT DISTINCT m.music_name, m.like_count, m.sc_id FROM music m LEFT JOIN heartlist_? h on m.sc_id = h.music_id WHERE h.music_id IS NULL;'
    let display = '';

    conn.query(sql_createH, [user_id], function(err, result_music_url){
        if(err){
            console.log(err);
        }
        else{
            console.log('hearlist_' + user_id + '테이블이 잘 생성됨');
        }
    });

    conn.query(sql_check, [user_id], function (err, result) {
        if (err) {
            console.log(err);
        } else {
            if (isEmpty(result)) {
                console.log('아무 음악도 좋아요 한 적이 없음');
                conn.query(sql_select, function(err, musiclist) {
                    if(err) {
                        console.log(err);
                    } else {
                        display='';
                        for (let i = 0; i < Object.keys(musiclist).length; i++) {
                            display += '<li>' + musiclist[i].music_name + ' : ' + musiclist[i].like_count + '<button type="submit" style="padding:0; border:none; background:none;" name="' + musiclist[i].sc_id + '" value="like,' + user_id + '"><img src="/heart.png" width="24" height="24"></button></li>'
                        }
                        res.send(`
                            <!DOCTYPE html>
                            <html>
                            <head>
                            <meta charset="utf-8">
                            <title></title>
                            </head>
                            <body>
                                Music list
                            <form action="/updateHL" method="post">
                            <ul>
                                ${display}
                            </ul>
                            </form>
                            </body>
                            </html>`);            
                    }
                });
            } else {
                console.log('몇몇 음악을 이미 좋아요 누름');
                display='';
                for (let i = 0; i < Object.keys(result).length; i++) {
                    display += '<li>' + result[i].music_name + ' : ' + result[i].like_count + '<button type="submit" style="padding:0; border:none; background:none;" name="' + result[i].sc_id + '" value="unlike,' + user_id + '"><img src="/unheart.jpg" width="24" height="24"></button></li>'
                }
                conn.query(sql_check2, [user_id], function (err, result2) {
                    if (err) {
                        console.log(err);
                    } else {
                        for (let i = 0; i < Object.keys(result2).length; i++) {
                            display += '<li>' + result2[i].music_name + ' : ' + result2[i].like_count + '<button type="submit" style="padding:0; border:none; background:none;" name="' + result2[i].sc_id + '" value="like,' + user_id + '"><img src="/heart.png" width="24" height="24"></button></li>'
                        }
                    }
                    res.send(`
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <meta charset="utf-8">
                        <title></title>
                    </head>
                    <body>
                        Music list
                    <form action="/updateHL" method="post">
                    <ul>
                        ${display}
                    </ul>
                    </form>
                    </body>
                    </html>`);
                });
            } 
        }
    });
});

app.post('/updateHL', function(req, res) {
    let sql_select = 'select like_count from music where sc_id=?'
    let sql_update = 'update music set like_count=? where sc_id=?';
    let sc_id = Object.keys(req.body)[0];
    let checkLike = Object.values(req.body)[0].split(',')[0];
    let user_id = Object.values(req.body)[0].split(',')[1];
    user_id = parseInt(user_id);
    let like_count = 0;
    let sql_insertH = 'insert into heartlist_? (music_id) values ('+sc_id+')';
    let sql_deleteH = 'delete from heartlist_? where music_id = ?';
    conn.query(sql_select, [sc_id], function(err, result, fields) {
        if(err) {
            console.log(err);
        } else {
            if(checkLike === 'like') {
                like_count = like_count + result[0].like_count + 1;
                conn.query(sql_insertH, [user_id], function(err, result, fields) {
                    if(err) {
                        console.log(err);
                    } else {
                        console.log('heartlist_' + user_id +' 테이블에 sc_id 대입 성공');
                    }
                });
            } else {
                like_count = like_count + result[0].like_count - 1;
                conn.query(sql_deleteH, [user_id, sc_id], function(err, result, fields) {
                    if(err) {
                        console.log(err);
                    } else {
                        console.log('heartlist_' + user_id +' 테이블에 sc_id 삭제 성공');
                    }
                });
            }
            conn.query(sql_update, [like_count, sc_id], function(err, result, fields) {
                if(err) {
                    console.log(err);
                } else {
                    res.redirect('/heartlist/'+ user_id);
                }
            });
        }
    });
});

// 사용자의 좋아요 리스트 보여주기
app.get('/show_heartlist/:user_id', function(req, res) {
    let user_id = req.params.user_id;
    user_id = parseInt(user_id);

    let sql_heartlist = 'SELECT m.play_url from (music m inner join heartlist_? c on m.sc_id=c.music_id);';

    conn.query(sql_heartlist, [user_id], function(err, result_music_url){
        if(err){
            console.log(err);
        }
        else{
            res.send(result_music_url);
            console.log("result_music_url : " + JSON.stringify(result_music_url));
        }
    });
});

app.listen(7260, function() {
    console.log('Connected 7260 port!!!');
});