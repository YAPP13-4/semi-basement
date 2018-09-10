const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser('2354DadsflkajE!@#(@*&1JFa'));

let products = {
    1:{title:'History of Web'},
    2:{title:'Next web'}
};

app.get('/products', function(req, res){
    let output = '';
    for(const name in products) {
        output += `
        <li>
            <a href="/cart/${name}">${products[name].title}</a>
        </li>`
    }
    res.send(`<h1>Products</h1><ul>${output}</ul><a href="/cart">Cart</a>`);
});

app.get('/cart', function(req, res) {
    let cart = req.signedCookies.cart;
    let output = '';
    if(!cart) {
        res.send('Empty!');
    } else {
        for(const id in cart) {
            output += `<li>${products[id].title} (${cart[id]})</li>`;
        }
    }
    res.send(`<h1>Cart</h1><ul>${output}</ul><a href="/products">Products List</a>`);
});

app.get('/cart/:id', function(req, res) {
    let id = req.params.id;
    let cart = {};
    if(req.signedCookies.cart) {
        cart = req.signedCookies.cart;
    } else {
        cart = {};
    }
    if(!cart[id]) {
        cart[id] = 0;
    }
    cart[id] = parseInt(cart[id])+1;
    res.cookie('cart', cart, {signed:true});
    res.redirect('/cart');
});

app.get('/count', function(req, res) {
    let count = -1;
    if(req.signedCookies.count) {
        count = parseInt(req.signedCookies.count);
    } else {
        count = 0;
    }
    count = count +1;
    res.cookie('count', count, {signed:true});
    res.send('count : ' + count);
});

// const passport = require('passport');
// var GoogleStrategy = require( 'passport-google-oauth20' ).Strategy

// passport.serializeUser(function(user, done) {
//     done(null, user);
// });

// passport.deserializeUser(function(obj, done) {
//     done(null, obj);
// });

// passport.use(new GoogleStrategy({
//         clientID: '897395922802-9qrfgn7kc87so1lqb5u4r913m3c1fhe7.apps.googleusercontent.com',
//         clientSecret: 'KLtFQTyi3POAmJbqHMlVR1av',
//         callbackURL: 'http://localhost:7260'
//     }, function(accessToken, refreshToken, profile, done) {
//         process.nextTick(function() {
//             user = profile;
//             return done(null, user);
//         });
//     }
// ));

app.listen(7260, function() {
    console.log('Connected 7260 port!!!');
});

