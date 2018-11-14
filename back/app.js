const express = require("express")
const session = require("express-session")
const MySQLStore = require("express-mysql-session")(session)
const bodyparser = require("body-parser")
const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth2").Strategy
const axios = require("axios")
const mysql = require("mysql")
const db_config = require("./config/db_config.json")
const googleCredentials = require("./config/google.json")
const uuidv4 = require("uuid/v4")

const conn = mysql.createConnection({
  host: db_config.host,
  user: db_config.user,
  password: db_config.password,
  database: db_config.database,
  insecureAuth: true
})

class Database {
  query(sql, args) {
    return new Promise((resolve, reject) => {
      conn.query(sql, args, (err, rows) => {
        if (err) return reject(err)
        resolve(rows)
      })
    })
  }
}

let database = new Database()

function isEmpty(obj) {
  for (const key123 in obj) {
    if (obj.hasOwnProperty(key123)) return false
  }
  return true
}

conn.connect()
const app = express()

app.use(express.static("public"))
app.use(
  bodyparser.urlencoded({
    extended: false
  })
)
app.use(
  session({
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
  })
)
app.use(passport.initialize())
app.use(passport.session())

/////////////////////////////////////////////////////////////

// 고정 변수
const API_HOSTNAME = "//api.soundcloud.com"
const CLIENT_ID = "a281614d7f34dc30b665dfcaa3ed7505"
const resolveUrl = songUrl =>
  `https:${API_HOSTNAME}/resolve.json?url=${songUrl}&client_id=${CLIENT_ID}`

var SONG_URL

var USER_ID

////////////////////////////////////////////////////////////////

// 0. 로그인

app.get("/welcome", function(req, res) {
  if (req.user && req.user.displayName) {
    res.send(`
        <h1>Hello, ${req.user.displayName}</h1>
        <a href="/auth/logout">Logout</a>
        `)
  } else {
    res.send(`
        <h1>Welcome</h1>
        <ul>
        <li><a href="/auth/login">Login</a></li>
        </ul>
        `)
  }
})
app.get("/auth/logout", function(req, res) {
  let user_email = req.user.email
  let sql = "update user_info set access_Token = NULL where email=?"
  conn.query(sql, [user_email], function(err, rows) {
    if (err) {
      console.log(err)
    } else {
      req.logout()
      req.session.save(function() {
        res.send("logout")
      })
    }
  })
})

app.get("/auth/login", function(req, res) {
  let output = `
    <h2>You can also login with</h2>
    <a href="/auth/google">Google</a>
    `
  res.send(output)
})
passport.serializeUser(function(user, done) {
  done(null, user.email)
})

passport.deserializeUser(function(id, done) {
  //console.log('deserializeUser', id);
  let sql = "SELECT * FROM user_info WHERE email=?"
  conn.query(sql, [id], function(err, results) {
    if (err) {
      console.log(err)
      done("There is no user.")
    } else {
      done(null, results[0])
    }
  })
})
passport.use(
  new GoogleStrategy(
    {
      clientID: googleCredentials.web.client_id,
      clientSecret: googleCredentials.web.client_secret,
      callbackURL: googleCredentials.web.redirect_uris[0]
    },
    function(accessToken, refreshToken, profile, done) {
      let newuser = {}
      let authId = profile.id
      let sql = "SELECT * FROM user_info WHERE auth_id=?"
      conn.query(sql, [authId], function(err, results) {
        if (results.length > 0) {
          done(null, results[0])
        } else {
          newuser["auth_id"] = authId
          newuser["display_name"] = profile.displayName
          newuser["email"] = profile.emails[0].value
          let sql = "INSERT INTO user_info SET ?"
          conn.query(sql, newuser, function(err, results) {
            if (err) {
              console.log(err)
              done("Error")
            } else {
              done(null, newuser)
            }
          })
        }
      })
    }
  )
)
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: "https://www.googleapis.com/auth/plus.profile.emails.read"
  })
)
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/login"
  }),
  function(req, res) {
    const token = uuidv4()
    let user_email = req.user.email
    let sql = "update user_info set access_Token = ? where email=?"
    conn.query(sql, [token, user_email], function(err, rows) {
      if (err) {
        console.log(err)
      } else {
        res.send(JSON.stringify(req.user))
      }
    })
  }
)

/////////////////////////////////////////////////////////////////

//1. 앨범 리스트
// 사용자가 자신의 곡을 앨범으로 업로드
// 1) 테이블 생성 (테이블이 없을때만 생성 - IF NOT EXISTS 를 이용)
// 2) 프론트에서 받은 url로 먼저 sc_id를 커넥트 테이블에 저장 & 중복 처리
app.post("/add_albumlist", function(req, res) {
  console.log("@" + req.method + " " + req.url)

  let genre = req.body.genre_Num
  let token = req.body.access_Token
  SONG_URL = req.body.url
  let sql_select1 = "SELECT user_id from semibasement.user_info where access_Token = ?"
  let sql_createA = "CREATE TABLE IF NOT EXISTS `semibasement`.`album_?` (`album_id` INT(11) NOT NULL AUTO_INCREMENT, `music_id` INT(11) NULL DEFAULT NULL, PRIMARY KEY (`album_id`));"
  let sql_updateCheck = "SELECT m.sc_id FROM semibasement.music m;"
  let sql_insertAscid = "INSERT INTO semibasement.album_? (music_id) VALUES (?);"
  let user_id = 0
  let sc_id

  _requestId = () => {
    return axios
        .get(resolveUrl(SONG_URL))
        .then(response => {
          let music_id = response.data.id
          res.send(music_id)
        })
        .catch(err => {
          console.log(err)
        })
  }

  database
    .query(sql_select1, [token])
    .then(rows => {
      user_id = parseInt(rows[0].user_id)
      return database.query(sql_createA, [user_id])
    })
    .then(() => {
      console.log("앨범 테이블 만들었다.")
      // 여기서 axios 해야함
      console.log(SONG_URL)
      _requestId()
    })
    .catch(err => {
      console.log(err)
    })




  // // 0. 프론트로부터 버튼이 눌렸을때 url 받기 (나중에 처리해야할 사항)
  // // var testurl = 'https://soundcloud.com/amirarief/love-will-set-you-free-amirarief-kodaline-cover-mp3';

  // let genre = req.body.genre_Num
  // let token = req.body.access_Token
  // let sql_select1 = "SELECT user_id from user_info where access_Token = ?"
  // let sql_createA = "CREATE TABLE IF NOT EXISTS `semibasement`.`album_?` (`album_id` INT(11) NOT NULL, PRIMARY KEY (`album_id`));"
  // let sql_createAc = "CREATE TABLE IF NOT EXISTS `semibasement`.`album_connect_?` (`album_id` INT(11) NULL DEFAULT NULL, `music_id` INT(11) NULL DEFAULT NULL, INDEX `c_album_?_idx` (`album_id` ASC), CONSTRAINT `c_album_?` FOREIGN KEY (`album_id`) REFERENCES `semibasement`.`album_?` (`album_id`) ON DELETE CASCADE ON UPDATE CASCADE);"
  // let sql_albumC = "INSERT INTO album_connect_? (music_id) VALUES (?);"
  // let sql_musicUrl = "SELECT sc_id FROM music WHERE play_url = ?;"
  // let user_id = 0
  // SONG_URL = req.body.url

  // console.log(SONG_URL)

  // // database
  // //   .query(sql_select1, [token])
  // //   .then(rows => {
  // //     user_id = parseInt(rows[0].user_id)
  // //     return database.query(sql_createA, [user_id])
  // //   })
  // //   .then(() => {
  // //     return database.query(sql_createAc, [user_id, user_id, user_id, user_id])
  // //   })
  // //   .then(() => {
  // //     return database.query(sql_musicUrl, [SONG_URL])
  // //   })
  // //   .then(() => {
  // //     _requestId = () => {
  // //       return axios
  // //         .get(resolveUrl(SONG_URL))
  // //         .then(response => {
  // //           let music_id = response.data.id
  // //           return database.query(sql_albumC, [user_id, music_id])
  // //         })
  // //     }
  // //   })
    

  // // 1. 테이블 생성 (테이블이 없을때만 생성 - IF NOT EXISTS 를 이용)

  // // 2. 프론트에서 받은 url로 먼저 sc_id를 커넥트 테이블에 저장 & 중복 처리

  // conn.query(sql_musicUrl, [SONG_URL], function(err, re_overlap) {
  //   if (err) {
  //     console.log(err)
  //   } else {
  //     //if(JSON.stringify(re_overlap) == '[]'){
  //     // 중복되는 url 없음
  //     _requestId = () => {
  //       return axios
  //         .get(resolveUrl(SONG_URL))
  //         .then(response => {
  //           let music_id = response.data.id
  //           conn.query(sql_albumC, [user_id, music_id], function(err, rows) {
  //             if (err) {
  //               console.log(err)
  //             } else {
  //               console.log("insert to album_connect done")
  //               // 3. 해당 url를 '/fillMusicTable' 으로 리다이렉트 시켜서 뮤직테이블에 정보 저장
  //               let redirectUrl = "/fillMusicTable/" + genre
  //               res.redirect(redirectUrl)
  //             }
  //           })
  //         })
  //         .catch(err => {
  //           console.log(err)
  //         })
  //     }
  //     _requestId()
  //     //}else{
  //     //    console.log("중복되는 url임. music 테이블에 삽입 불가");
  //     //}
  //   }
  // })
})

// 사용자의 앨범 리스트 보여주기
app.post("/show_albumlist", function(req, res) {
  console.log("@" + req.method + " " + req.url)

  let token = req.body.access_Token
  let sql_select = "SELECT user_id from user_info where access_Token = ?"
  let sql_albumlist = "SELECT m.* from (semibasement.music m inner join semibasement.album_? a on m.sc_id=a.music_id);"
  let user_id = 0

  database
    .query(sql_select, [token])
    .then(rows => {
      user_id = parseInt(rows[0].user_id)
      return database.query(sql_albumlist, [user_id])
    })
    .then(rows => {
      res.send(JSON.stringify(rows))
    })
    .catch(err => {
      console.log(err)
    })
})

// 사용자의 앨범 리스트에서 삭제
// 1) album_(user_id) 테이블에서 해당 music의 sc_id를 가지는 행 삭제
// 2) music 테이블에서 해당 music의 sc_id를 가지는 행 삭제
app.post("/delete_albumlist", function(req, res) {
  console.log("@" + req.method + " " + req.url)

  let sc_id = req.body.sc_id
  let token = req.body.access_Token
  let sql_select1 = "SELECT user_id from user_info where access_Token = ?"
  let sql_del_album = "delete from album_? where music_id = ?;"
  let sql_del_music = "delete from music where sc_id = ?;"
  let user_id = 0
  
  database
    .query(sql_select1, [token])
    .then(rows => {
      user_id = parseInt(rows[0].user_id)
      return database.query(sql_del_album, [user_id, sc_id])
    })
    .then(() => {
      return database.query(sql_del_music, [sc_id])
    })
    .then(() => {
      res.send("delete complete")
    })
    .catch(err => {
      console.log(err)
    })
})

///////////////////////////////////////////////////////////////////////

// 음악테이블 채우기

// '/add_albumlist/:user_id' 에서 설정한 SONG_URL 값을 이용해서 music 테이블 채우기

app.get("/fillMusicTable/:genre", function(req, res) {
  let sql_insert =
    "INSERT INTO music (date, music_name, play_url, hashtag_1, hashtag_2, hashtag_3, author, sc_id, duration, like_count, genre) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)"
  let sql_update =
    "UPDATE music SET music_name = ?, hashtag_1 = ?, hashtag_2 = ?, hashtag_3 = ? WHERE sc_id = ?"
  let genre = req.params.genre

  conn.query("select m.sc_id from music m;", function(err, count_row, fields) {
    if (err) {
      console.log(err)
    } else {
      var updateTrigger = 0
      _requestId = () => {
        return axios
          .get(resolveUrl(SONG_URL))
          .then(response => {
            let sc_id = response.data.id
            let play_url = response.data.permalink_url
            var date = response.data.created_at
            if (date == null) {
              date = "no data"
            }
            var music_name = response.data.title
            if (music_name == null) {
              music_name = "no data"
            }
            var author = response.data.user.username
            if (author == null) {
              author = "no data"
            }
            var hashtag_1 = "no data"
            var hashtag_2 = "no data"
            var hashtag_3 = "no data"
            var like_count = 0
            var duration = response.data.duration
            duration = parseFloat(duration / 60000)

            var rr = new Array()
            rr = response.data.tag_list.split('"')

            if (rr.length == 1) {
              if (rr[0] != "") {
                hashtag_1 = rr[0]
              }
            } else {
              if (rr[1] != null) {
                hashtag_1 = rr[1]
              }
              hashtag_2 = rr[2]
              hashtag_3 = rr[3]
            }

            //res.send(response.data);

            for (var i = 0; i < count_row.length; i++) {
              if (count_row[i].sc_id == response.data.id) {
                console.log("update 필요")
                updateTrigger = 1
              }
            }

            if (updateTrigger == 1) {
              conn.query(
                sql_update,
                [music_name, hashtag_1, hashtag_2, hashtag_3, sc_id],
                function(err, rows) {
                  if (err) {
                    console.log(err)
                  } else {
                    console.log("update done")
                    res.redirect("/rankingChart")
                  }
                }
              )
            } else if (updateTrigger == 0) {
              conn.query(
                sql_insert,
                [
                  date,
                  music_name,
                  play_url,
                  hashtag_1,
                  hashtag_2,
                  hashtag_3,
                  author,
                  sc_id,
                  duration,
                  like_count,
                  genre
                ],
                function(err, rows) {
                  if (err) {
                    console.log(err)
                  } else {
                    console.log("insert done")
                    res.redirect("/rankingChart")
                  }
                }
              )
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
      _requestId()
    }
  })
})

///////////////////////////////////////////////////////////////////

//3. 플레이 리스트

// 사용자의 플레이 리스트에 추가
// 1) 테이블이 없으면 생성 (list_테이블만)
// 2) list 테이블에 값 대입 (중복되는 노래는 삽입하지 않도록 예외처리)
app.post("/add_playlist", function(req, res) {
  console.log("@" + req.method + " " + req.url)

  let token = req.body.access_Token
  var sc_id = req.body.sc_id
  let sql_select1 = "SELECT user_id from user_info where access_Token = ?"
  var sql_createPL = "CREATE TABLE IF NOT EXISTS `semibasement`.`list_?` (`list_id` INT(11) NOT NULL AUTO_INCREMENT, `music_id` INT(11) NULL DEFAULT NULL, PRIMARY KEY (`list_id`));"
  var sql_list = "insert into list_? (music_id) select ? from dual where not exists (select music_id from list_? where music_id=?);"
  let user_id = 0


  database
    .query(sql_select1, [token])
    .then(rows => {
      user_id = parseInt(rows[0].user_id)
      return database.query(sql_createPL, [user_id])
    })
    .then(() => {
      return database.query(sql_list, [user_id, sc_id, user_id, sc_id])
    })
    .then(() => {
      res.send("insert to list table done")
    })
    .catch(err => {
      console.log(err)
    })
})

// 사용자의 플레이 리스트 보여주기
app.post("/show_playlist", function(req, res) {
  console.log("@" + req.method + " " + req.url)

  let token = req.body.access_Token
  let sql_select = "SELECT user_id from user_info where access_Token = ?"
  var sql_music_id = "SELECT m.* from (music m inner join list_? l on m.sc_id=l.music_id);"
  let user_id = 0

  database
    .query(sql_select, [token])
    .then(rows => {
      user_id = parseInt(rows[0].user_id)
      return database.query(sql_music_id, [user_id])
    })
    .then((rows) => {
      res.send(JSON.stringify(rows))
    })
    .catch(err => {
      console.log(err)
    })
})

// 사용자의 플레이 리스트에서 삭제
app.post("/delete_playlist", function(req, res) {
  console.log("@" + req.method + " " + req.url)

  let token = req.body.access_Token
  let sc_id = req.body.sc_id
  let sql_select1 = "SELECT user_id from semibasement.user_info where access_Token = ?"
  let sql_del_list = "delete from semibasement.list_? where music_id = ?;"
  let user_id = 0

  database
    .query(sql_select1, [token])
    .then(rows => {
      user_id = parseInt(rows[0].user_id)
      return database.query(sql_del_list, [user_id, sc_id])
    })
    .then(() => {
      res.send("delete list table done")
    })
    .catch(err => {
      console.log(err)
    })
})

/////////////////////////////////////////////////////////////////////

//4. 하트 리스트

app.post("/heartlist", function(req, res) {
  let token = req.body.access_Token
  let sql_select1 = "SELECT user_id from user_info where access_Token = ?"
  let user_id = 0
  let sql_createH =
    "CREATE TABLE IF NOT EXISTS `semibasement`.`heartlist_?` (`heartlist_id` INT(11) NOT NULL AUTO_INCREMENT, `music_id` INT(11) NULL DEFAULT NULL, PRIMARY KEY (`heartlist_id`));"
  let sql_select2 = "SELECT music_name, like_count, sc_id from music;"
  let sql_check =
    "SELECT DISTINCT m.music_name, m.like_count, m.sc_id FROM (music m INNER JOIN heartlist_? h on m.sc_id=h.music_id);"
  let sql_check2 =
    "SELECT DISTINCT m.music_name, m.like_count, m.sc_id FROM music m LEFT JOIN heartlist_? h on m.sc_id = h.music_id WHERE h.music_id IS NULL;"

  database
    .query(sql_select1, [token])
    .then(rows => {
      user_id = parseInt(rows[0].user_id)
      return database.query(sql_createH, [user_id])
    })
    .then(() => {
      return database.query(sql_check, [user_id])
    })
    .then(rows => {
      if (isEmpty(rows)) {
        return database.query(sql_select2)
      } else {
        return database.query(sql_check2)
      }
    })
    .then(rows => {
      res.send(JSON.stringify(rows))
    })
    .catch(err => {
      console.log(err)
    })
})

app.post("/updateHL", function(req, res) {
  let token = req.body.access_Token
  let checkLike = req.body.checkLike
  let sc_id = req.body.sc_id
  let sql_select = "SELECT user_id from user_info where access_Token = ?"
  let sql_select1 = "select like_count from music where sc_id=?"
  let sql_update = "update music set like_count=? where sc_id=?"
  let sql_insertH = "insert into heartlist_? (music_id) values (" + sc_id + ")"
  let sql_deleteH = "delete from heartlist_? where music_id = ?"
  let numOfLike
  let user_id

  database
    .query(sql_select, [token])
    .then(rows => {
      user_id = parseInt(rows[0].user_id)
      return database.query(sql_select1, [sc_id])
    })
    .then(rows => {
      if (isEmpty(rows)) throw "there is no music matched with sc_id"
      else numOfLike = rows[0].like_count
      if (checkLike === "like") {
        numOfLike += 1
        return database.query(sql_update, [numOfLike, sc_id]).then(() => {
          return database.query(sql_insertH, [user_id])
        })
      } else {
        numOfLike -= 1
        if (numOfLike < 0) numOfLike = 0
        return database.query(sql_update, [numOfLike, sc_id]).then(() => {
          return database.query(sql_deleteH, [user_id, sc_id])
        })
      }
    })
    .then(() => {
      res.send("complete")
    })
    .catch(err => {
      console.log(err)
    })
})

// 사용자의 좋아요 리스트 보여주기
app.post("/show_heartlist", function(req, res) {
  let token = req.body.access_Token
  let sql_select = "SELECT user_id from user_info where access_Token = ?"
  let sql_heartlist =
    "SELECT m.* from (music m inner join heartlist_? c on m.sc_id=c.music_id);"
  let user_id = 0

  database
    .query(sql_select, [token])
    .then(rows => {
      user_id = parseInt(rows[0].user_id)
      return database.query(sql_heartlist, [user_id])
    })
    .then(rows => {
      res.send(JSON.stringify(rows))
    })
    .catch(err => {
      console.log(err)
    })
})

//////////////////////////////////////////////////////////////////

// 5. 차트 기능

// 좋아요 수에 기반한 music 테이블 데이터들을 오름차순으로 가져옴
app.get("/rankingChart", function(req, res) {
  let sql_rankChart =
    "SELECT music_name, author, like_count FROM music ORDER BY like_count DESC;"
  conn.query(sql_rankChart, function(err, result) {
    if (err) {
      console.log(err)
    } else {
      res.send(JSON.stringify(result))
    }
  })
})

// 날짜에 기반한 music 테이블 데이터들을 오름차순으로 가져옴
app.get("/recentChart", function(req, res) {
  let sql_recentChart =
    "SELECT music_name, author, date FROM music ORDER BY date DESC;"
  conn.query(sql_recentChart, function(err, result) {
    if (err) {
      console.log(err)
    } else {
      res.send(JSON.stringify(result))
    }
  })
})

// 태그에 기반한 music 테이블 데이터들을 가져옴
app.get("/tagChart", function(req, res) {
  let sql_tag = "select music_name, author, hashtag_1 from music;"
  conn.query(sql_tag, function(err, result) {
    if (err) {
      console.log(err)
    } else {
      res.send(JSON.stringify(result))
    }
  })
})

// 장르에 기반한 music 테이블 데이터들을 가져옴 (장르 : 1,2,3)
app.get("/genreChart/:genre", function(req, res) {
  let sql_genre = "SELECT music_name, author FROM music WHERE genre = ?;"
  let genre = req.params.genre

  conn.query(sql_genre, [genre], function(err, result) {
    if (err) {
      console.log(err)
    } else {
      res.send(JSON.stringify(result))
    }
  })
})

//////////////////////////////////////////////////////////////////
app.listen(7260, function() {
  console.log("Connected 7260 port!!!")
})
