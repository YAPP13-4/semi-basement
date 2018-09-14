const express = require('express');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const bodyparser = require('body-parser');
const db_config = require('./db_config.json');
const pbkdf2Password = require('pbkdf2-password');
const hasher = pbkdf2Password();
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const mysql = require('mysql');
const conn = mysql.createConnection({
    host : db_config.host,
    user : db_config.user,
    password : db_config.password,
    database : db_config.database
})
conn.connect();
const app = express();
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
app.get('/welcome', function(req, res) {
    if(req.user && req.user.displayName) {
        res.send(`
        <h1>Hello, ${req.user.displayName}</h1>
        <a href="/auth/logout">Logout</a>
        `);
    } else {
        res.send(`
        <h1>Welcome</h1>
        <ul>
        <li><a href="/auth/login">Login</a></li>
        <li><a href="/auth/register">Register</a></li>
        </ul>
        `);
    }
});
app.get('/auth/logout', function(req, res){
    req.logout();
    req.session.save(function() {
        res.redirect('/welcome');
    });
});
app.get('/auth/register', function(req, res) {
    let output =
    `
    <h1>Register</h1>
    <form action="/auth/register" method="post">
     <p>
      <input type="text" name="username" placeholder="username">
     </p>
     <p>
      <input type="password" name="password" placeholder="password">
     </p>
     <p>
      <input type="text" name="displayName" placeholder="displayName">
     </p>
     <p>
      <input type="submit">
     </p>
    </fhaporm>
    `;
    res.send(output);
});

app.get('/auth/login', function(req, res){ 
    let output = `
    <h1>Login</h1>
    <form action="/auth/login" method="post">
     <p>
      <input type="text" name="username" placeholder="username">
     </p>
     <p>
      <input type="password" name="password" placeholder="password">
     </p>
     <p>
      <input type="submit">
     </p>
    </form>
    <a href="/auth/facebook">Facebook</a>
    <a href="/auth/google">Google</a>
    `;
    res.send(output);
});
passport.serializeUser(function(user, done) {
    //console.log('serializeUser', user);
    done(null, user.authId);
});
  
passport.deserializeUser(function(id, done) {
    //console.log('deserializeUser', id);
    let sql = 'SELECT * FROM users WHERE authId=?';
    conn.query(sql, [id], function(err, results) {
        if(err) {
            console.log(err);
            done('There is no user.');
        } else {
            done(null, results[0]);
        }
    });
});
passport.use(new LocalStrategy(
    function(username, password, done) {
        let uname = username;
        let pwd = password;
        let sql = 'SELECT * FROM users WHERE authId=?';
        conn.query(sql, ['google:'+uname], function(err, results) {
            if(err) {
                return done('There is no users');
            }
            let user = results[0];
            return hasher({ password: pwd, salt: user.salt }, function (err, pass, salt, hash) {
                if (hash === user.password) {
                    //console.log('LocalStrategy', user);
                    done(null, user);
                } else {
                    done(null, false);
                }
            });
        });
    }
));
passport.use(new GoogleStrategy({
    clientID: db_config.clientID,
    clientSecret: db_config.clientSecret,
    callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    let newuser = {};
    let authId = 'google:' + profile.id;
    let sql = 'SELECT * FROM users WHERE authId=?';
    conn.query(sql, [authId], function(err, results) {
        if(results.length > 0) {
            done(null, results[0]);
        } else {
            newuser['authId'] = authId;
            newuser['displayName'] = profile.displayName;
            newuser['email'] = profile.emails[0].value;
            let sql = 'INSERT INTO users SET ?';
            conn.query(sql, newuser, function(err, results) {
                if(err) {
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
        successRedirect: '/welcome',
        failureRedirect: '/auth/login'
      }
    )
);
app.post('/auth/register', function(req, res) {
    hasher({password:req.body.password}, function(err, pass, salt, hash) {
        let user = {
            authId:'local:'+req.body.username,
            username: req.body.username,
            password: hash,
            salt: salt,
            displayName: req.body.displayName
        };
        let sql = 'INSERT INTO users SET ?';
        conn.query(sql, user, function(err, results) {
            if(err) {
                console.log(err);
                res.status(500);
            } else {
                req.login(user, function(err){
                    req.session.save(function() {
                        res.redirect('/welcome');
                    });
                });
            }
        });
    });
});
app.listen(7260, function() {
    console.log('Connected 7260 port!!!');
});