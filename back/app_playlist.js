// '/playlist' 에 접속하면 내가 플레이리스트로 등록해둔곡 리스트 뜨게 하기

const express = require('express');
const bodyparser = require('body-parser');
//const db_config = require('./db_config.json');
const mysql = require('mysql');

const conn = mysql.createConnection({
    host      : 'localhost',
    user      : 'root',
    password  : 'rlaqhdnjs96',
    database  : 'new_semibasement'
})

conn.connect();
const app = express();

app.use(express.static('public'));
// false 로 할지 true로 할지 찾아보기
app.use(bodyparser.urlencoded({ extended: false }));

app.get('/playlist/:user_id', function(req, res) {
    console.log("@" + req.method + " " + req.url);
    var res_user_list = new Array();
    var user_id = req.params.user_id;
    var sql_list_id = 'SELECT list_id FROM list WHERE user_id = ?';
    var sql_music_id = 'select m.play_url from music_01 m join list_connect_id l where l.list_id = ? and l.music_id = m.music_id;';

    conn.query(sql_list_id, [user_id], function(err, result_list_id){
        if(err){
            console.log(err);
        }
        else{
            //res.send(result_list_id);
            console.log("result_list_id : " + JSON.stringify(result_list_id));
        }

        var param_list_id;
        var re_param_list_id = new Array();
        var result;
        var temp;

        param_list_id = JSON.stringify(result_list_id);
        param_list_id = param_list_id.replace(/[^0-9]/g,',');
        console.log("param_list_id : " + param_list_id);
        result = param_list_id.split(',');

        re_param_list_id[0] = parseInt(result[12]);
        // for(var i = 1; i < result_list_id.length; i++){
        //     re_param_list_id[i] = parseInt(result[12 + 13*(i)]);
        // }
        console.log("user_id에 따라 추출한 list_id : " + re_param_list_id);

        //여기까지는 user_id에 해당하는 list_id 추출한 것

        // list_id에 해당하는 play_url을 뽑아내면 됨 --> sql문을 잘쓰면 해결 가능
        conn.query(sql_music_id, [re_param_list_id], function(err, result_music_id){
            if(err){
                console.log(err);
            }
            else{
                res.send(result_music_id);
                for(var i = 0; i < result_music_id.length; i++){
                    console.log("result_music_id " + "'"+ i + "'" + ": " +JSON.stringify(result_music_id[i]));
                }
            }
        });
    });

});

app.listen(7260, function() {
    console.log('Connected 7260 port!!!');
});