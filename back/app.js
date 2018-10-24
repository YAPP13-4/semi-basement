const express = require('express');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const bodyparser = require('body-parser');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const axios = require('axios');
const mysql = require('mysql');
const db_config = require('./db_config.json');

const conn = mysql.createConnection({
    host      : db_config.host,
    user      : db_config.user,
    password  : db_config.password,
    database  : db_config.database,
	insecureAuth : true
})

function isEmpty(obj) {
    for(const key123 in obj) {
        if(obj.hasOwnProperty(key123))
            return false;
    }
    return true;
}

conn.connect();
const app = express();

app.use(express.static('public'));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(session({
    secret: db_config.session_key,
    resave: false,
    saveUninitialized: true,
    store: new MySQLStore({
        host: db_config.host,
        port: db_config.port,
        user: db_config.user,
        password: db_config.password,
        database: db_config.database
    })
}));
app.use(passport.initialize());
app.use(passport.session());

/////////////////////////////////////////////////////////////

// 고정 변수
const API_HOSTNAME = '//api.soundcloud.com';
const CLIENT_ID = 'a281614d7f34dc30b665dfcaa3ed7505';
const resolveUrl = songUrl => `https:${API_HOSTNAME}/resolve.json?url=${songUrl}&client_id=${CLIENT_ID}`

var SONG_URL;

var USER_ID;

////////////////////////////////////////////////////////////////

// 0. 로그인 

app.get('/welcome', function (req, res) {
    if (req.user && req.user.displayName) {
        res.send(`
        <h1>Hello, ${req.user.displayName}</h1>
        <a href="/auth/logout">Logout</a>
        `);
    } else {
        res.send(`
        <h1>Welcome</h1>
        <ul>
        <li><a href="/auth/login">Login</a></li>
        </ul>
        `);
    }
});
app.get('/auth/logout', function (req, res) {
    req.logout();
    req.session.save(function () {
        res.redirect('/welcome');
    });
});

app.get('/auth/login', function (req, res) {
    let output = `
    <h2>You can also login with</h2>
    <a href="/auth/google">Google</a>
    `;
    res.send(output);
});
passport.serializeUser(function (user, done) {
    //console.log('serializeUser', user);
    done(null, user.auth_id);
});

passport.deserializeUser(function (id, done) {
    //console.log('deserializeUser', id);
    let sql = 'SELECT * FROM user_info WHERE auth_id=?';
    conn.query(sql, [id], function (err, results) {
        if (err) {
            console.log(err);
            done('There is no user.');
        } else {
            done(null, results[0]);
        }
    });
});
passport.use(new GoogleStrategy({
    clientID: db_config.clientID,
    clientSecret: db_config.clientSecret,
    callbackURL: "https://semibasement.com/auth/google/callback"
},
    function (accessToken, refreshToken, profile, done) {
        let newuser = {};
        let authId = 'google:' + profile.id;
        let sql = 'SELECT * FROM user_info WHERE auth_id=?';
        conn.query(sql, [authId], function (err, results) {
            if (results.length > 0) {
                done(null, results[0]);
            } else {
                newuser['auth_id'] = authId;
                newuser['display_name'] = profile.displayName;
                newuser['email'] = profile.emails[0].value;
                let sql = 'INSERT INTO user_info SET ?';
                conn.query(sql, newuser, function (err, results) {
                    if (err) {
                        console.log(err);
                        done('Error');
                    } else {
                        done(null, newuser);
                    }
                });
            }
        });
    }
));
app.post(
    '/auth/login',
    passport.authenticate(
        'local',
        {
            successRedirect: '/welcome',
            failureRedirect: '/auth/login',
            failureFlash: false
        }
    )
);
app.get(
    '/auth/google',
    passport.authenticate(
        'google',
        { scope: 'https://www.googleapis.com/auth/plus.profile.emails.read' }
    )
);
app.get(
    '/auth/google/callback',
    passport.authenticate(
        'google',
        {
            successRedirect: '/loginOk',
            failureRedirect: '/auth/login'
        }
    )
);

app.get('/loginOk', function(req, res){
    USER_ID = req.user.user_id;
    console.log(USER_ID);
    res.send(req.user);
});

/////////////////////////////////////////////////////////////////

//1. 앨범 리스트
// 사용자가 자신의 곡을 앨범으로 업로드 
app.post('/add_albumlist', function(req, res){
    console.log("@" + req.method + " " + req.url);

    // 0. 프론트로부터 버튼이 눌렸을때 url 받기 (나중에 처리해야할 사항)

    //var testurl = 'https://soundcloud.com/amirarief/love-will-set-you-free-amirarief-kodaline-cover-mp3';

    var user_id = req.body.user_id;
    console.log(req.body);
    user_id = parseInt(user_id);
    console.log(user_id);
    SONG_URL = req.body.url;
    console.log(SONG_URL);

    // 1. 테이블 생성 (테이블이 없을때만 생성 - IF NOT EXISTS 를 이용) 

    var sql_createA = 'CREATE TABLE IF NOT EXISTS `new_semibasement`.`album_?` (`album_id` INT(11) NOT NULL, PRIMARY KEY (`album_id`));'
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
            //if(JSON.stringify(re_overlap) == '[]'){
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
            //}else{
            //    console.log("중복되는 url임. music 테이블에 삽입 불가");
            //}
        }
    });
});


// 사용자의 앨범 리스트 보여주기
app.get('/show_albumlist/:user_id', function(req, res) {
    console.log("@" + req.method + " " + req.url);
    var user_id = req.params.user_id;
    user_id = parseInt(user_id);

    var sql_albumlist = 'SELECT m.* from (music m inner join album_connect_? c on m.sc_id=c.music_id) left join album_? l  on c.album_id=l.album_id;';

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
app.post('/delete_albumlist', function(req, res){
    console.log("@" + req.method + " " + req.url);

    // 임시로 받아오는 url (프론트단에서 어떤 값 가져올지 결정 후 구현) --> sc_id 가져옴
    //var testurl = 'https://soundcloud.com/amirarief/love-will-set-you-free-amirarief-kodaline-cover-mp3';

    var user_id = req.body.user_id;
    user_id = parseInt(user_id);
    var sc_id = req.body.sc_id;

    var sql_del_conn = 'delete from album_connect_? where music_id = ?;';
    var sql_del_music = 'delete from music where sc_id = ?;';

    conn.query(sql_del_conn, [user_id, sc_id], function(err, rows){
        if(err){
            console.log(err);
        }else{
            console.log("delete album_connect done");
        }
    });
    conn.query(sql_del_music, [sc_id], function(err, rows){
        if(err){
            console.log(err);
        }else{
            console.log("delete music done");
        }
    });
});

///////////////////////////////////////////////////////////////////////

// 음악테이블 채우기

// '/add_albumlist/:user_id' 에서 설정한 SONG_URL 값을 이용해서 music 테이블 채우기
app.get('/fillMusicTable', function(req, res) {

    console.log(SONG_URL);
    console.log("@" + req.method + " " + req.url);

    let sql_insert = 'INSERT INTO music (date, music_name, play_url, hashtag_1, hashtag_2, hashtag_3, author, sc_id, duration) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
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
                            var duration = response.data.duration;

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

                            //res.send(response.data);


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
                                        res.redirect('/rankingChart');
                                    }
                                })
                            }else if(updateTrigger == 0){
                                conn.query(sql_insert, [date, music_name, play_url, hashtag_1, hashtag_2, hashtag_3, author, sc_id, duration], function(err, rows) {
                                    if(err) {
                                        console.log(err);
                                    } else {
                                        console.log("insert done");
                                        res.redirect('/rankingChart');
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


///////////////////////////////////////////////////////////////////

//3. 플레이 리스트 

// 사용자의 플레이 리스트에 추가
app.post('/add_playlist', function(req, res) {
    console.log("@" + req.method + " " + req.url);

    // 0. 프론트로부터 버튼이 눌렸을때 url 받기 (나중에 처리해야할 사항)

    //var testurl = 'https://soundcloud.com/youngma/young-ma-ooouuu-1';

    var user_id = req.body.user_id;
    user_id = parseInt(user_id);
    var sc_id = req.body.sc_id;

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

    conn.query(sql_list, [user_id, sc_id,user_id, sc_id], function(err, rows){
        if(err){
            console.log(err);
        }else{
            console.log("insert to list table done");
        }
    });
});


// 사용자의 플레이 리스트 보여주기 
app.get('/show_playlist/:user_id', function(req, res){
    console.log("@" + req.method + " " + req.url);
    var user_id = req.params.user_id;
    user_id = parseInt(user_id);

    var sql_music_id = 'SELECT m.* from (music m inner join list_? l on m.sc_id=l.music_id);';
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
app.post('/delete_playlist', function(req, res){
    console.log("@" + req.method + " " + req.url);

    // 임시로 받아오는 url (프론트단에서 어떤 값 가져올지 결정 후 구현)
    // var testurl = 'https://soundcloud.com/amirarief/love-will-set-you-free-amirarief-kodaline-cover-mp3';

    var user_id = req.body.user_id;
    user_id = parseInt(user_id);
    var sc_id = req.body.sc_id;

    var sql_del_conn = 'delete from list_? where music_id = ?;';

    conn.query(sql_del_conn, [user_id, sc_id], function(err, rows){
        if(err){
            console.log(err);
        }else{
            console.log("delete list table done");
        }
    });  

});

/////////////////////////////////////////////////////////////////////

//4. 하트 리스트 

app.post('/heartlist', function(req, res) {
    let user_id = req.body.user_id;
   // console.log(req);
    console.log(req.body)
    console.log(user_id);
    user_id = parseInt(user_id);
    let sql_createH = 'CREATE TABLE IF NOT EXISTS `new_semibasement`.`heartlist_?` (`heartlist_id` INT(11) NOT NULL AUTO_INCREMENT, `music_id` INT(11) NULL DEFAULT NULL, PRIMARY KEY (`heartlist_id`));'
    let sql_select = 'SELECT music_name, like_count, sc_id from music;'
    let sql_check = 'SELECT DISTINCT m.music_name, m.like_count, m.sc_id FROM (music m INNER JOIN heartlist_? h on m.sc_id=h.music_id);'
    let sql_check2 = 'SELECT DISTINCT m.music_name, m.like_count, m.sc_id FROM music m LEFT JOIN heartlist_? h on m.sc_id = h.music_id WHERE h.music_id IS NULL;'

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
                        res.send(musiclist);            
                    }
                });
            } else {
                console.log('몇몇 음악을 이미 좋아요 누름');
                conn.query(sql_check2, [user_id], function (err, result2) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.send(result + "," + result2);
                    }
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

    let sql_heartlist = 'SELECT m.* from (music m inner join heartlist_? c on m.sc_id=c.music_id);';

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


//////////////////////////////////////////////////////////////////

// 5. 차트 기능 

// 좋아요 수에 기반한 music 테이블 데이터들을 오름차순으로 가져옴
app.get('/rankingChart', function(req, res) {
    let sql_rankChart = 'SELECT music_name, author, like_count FROM music ORDER BY like_count DESC;'
    let display = '';

    conn.query(sql_rankChart, function(err, result){
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    });
});


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

// 태그에 기반한 music 테이블 데이터들을 가져옴
app.get('/tagChart', function(req, res){
    let sql_genre = 'select music_name, author, hashtag_1 from music;';

    conn.query(sql_genre, function(err, result){
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    });
});


//////////////////////////////////////////////////////////////////
app.listen(7260, function() {
    console.log('Connected 7260 port!!!');
});
