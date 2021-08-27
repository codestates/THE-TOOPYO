require('dotenv').config();
const cors = require('cors');
const session = require('express-session');
// const https = require('https');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();

const controllers = require('./controllers');

app.use(
    session({
        secret: 'thetoopyo',
        resave: false,
        saveUninitialized: true,
        cookie: {
            domain: 'localhost',
            path: '/',
            maxAge: 24 * 6 * 60 * 10000,
            sameSite: 'none',
            httpOnly: true,
            secure: true,
        },
    }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
    cors({
        origin: ['https://the-toopyo.com'],
        credentials: true,
        methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    }),
);

app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('hi');
});
app.post('/login', controllers.login);
app.get('/signout', controllers.signOut);
app.post('/signup', controllers.signUp);

app.all('/user', controllers.userInfo);

app.all('/content', controllers.content);

const HTTPS_PORT = 80;

app.listen(HTTPS_PORT, () => {
    console.log('열려라 서버!');
});

module.exports = app;
