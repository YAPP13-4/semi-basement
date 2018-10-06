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

// 1. music 테이블에 있는 데이터들을 date 컬럼에 기반하여 오름차순으로 데이터들을 가져온다.

// 2. 이를 화면에 나타냄

conn.connect();
const app = express();
app.use(express.static('public'));
app.use(bodyparser.urlencoded({ extended: false }));

// 날짜에 기반한 music 테이블 데이터들을 오름차순으로 가져옴
app.get('/recentChart', function(req, res) {
    let sql_recentChart = 'SELECT music_name, author, date FROM music ORDER BY date DESC;'

    conn.query(sql_recentChart, function(err, result){
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    });
});

app.listen(7260, function() {
    console.log('Connected 7260 port!!!');
});