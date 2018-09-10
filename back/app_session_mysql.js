const express = require('express');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const bodyparser = require('body-parser');
const db_config = require('./db_config.json');
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
app.get('/count', function(req, res) {
    if(req.session.count) {
        req.session.count++;
    } else {
        req.session.count = 1;
    }
    res.send('count : ' + req.session.count);
});
app.get('/auth/logout', function(req, res){
    delete req.session.displayName;
    req.session.save(function() {
        res.redirect('/welcome');
    });
});
app.get('/welcome', function(req, res) {
    if(req.session.displayName) {
        res.send(`
        <h1>Hello, ${req.session.displayName}</h1>
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
let users = [
    {
        username: 'kitae',
        password: '111',
        displayName: 'kitae'
    }
];
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
    </form>
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
    `;

    res.send(output);
});
app.post('/auth/login', function(req, res) {
    let uname = req.body.username;
    let pwd = req.body.password;
    for(let i=0; i<users.length; i++) {
        let user = users[i];
        if(uname === user.username && pwd === user.password) {
            req.session.displayName = user.displayName;
            return req.session.save(function() {
                res.redirect('/welcome');
            });
        }
    }
    res.send('Who are you? <a href="/auth/login">login</a>');
});
app.post('/auth/register', function(req, res) {
    let user = {
        username: req.body.username,
        password: req.body.password,
        displayName: req.body.displayName
    };
    users.push(user);
    req.session.displayName = req.body.displayName;
    req.session.save(function() {
        res.redirect('/welcome');
    });
});
app.listen(7260, function() {
    console.log('Connected 7260 port!!!');
});