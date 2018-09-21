// '/playlist:user_id' 에 접속하면 내가 플레이리스트로 등록해둔곡 리스트 뜨게 하기

const express = require('express');
const bodyparser = require('body-parser');
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

app.get('/playlist/:user_id', function(req, res) {
    console.log("@" + req.method + " " + req.url);
    var res_user_list = new Array();
    var user_id = req.params.user_id;
    user_id = parseInt(user_id);

    var sql_music_id = 'SELECT m.play_url from (music m left join list_connect_? c on m.music_id=c.music_id)left join list_? l  on c.list_id=l.list_id;';

    conn.query(sql_music_id, [user_id,user_id], function(err, result_music_url){
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