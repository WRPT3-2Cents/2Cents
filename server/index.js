const express = require('express');
const massive = require('massive');
require('dotenv').config();
const session = require('express-session')
const path = require('path');
const {postRegister, postLogin, getUser, logout} = require('./authController')
const {getOneTitle, getTitles, addTitle, editTitle, deleteTitle} = require('./titleController')
const {getUsers, getAllUsers, editUsers, deleteUsers} = require('./userController')
const {getComments, addComment, editComment, deleteComment} = require('./commentsController')
const PORT = process.env.PORT || 5050;

const app = express();

app.use(express.json())
app.use(express.static(path.join(`../build`)));

app.use(session({
    resave: false,
    saveUninitialized:true,
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365
    }
}));

const dbLocation = path.join(__dirname, '../db');

massive({
    connectionString: process.env.DATABASE_URL || process.env.CONNECTION_STRING,
    ssl:{
        rejectUnauthorized: false
    }
}, { scripts: dbLocation }).then((dbInstance)=>{
    app.set('db', dbInstance);
    console.log('Database connection succesful')
}).catch((e)=>{
    console.log('Database connection error', e)
});

//Authentication Endpoints
app.post('/api/register', postRegister);
app.post('/api/login', postLogin);
app.get('/api/me', getUser);
app.delete('/api/logout', logout);
//Title Endpoints
app.get(`/api/titles/:title_id`, getOneTitle);
app.get('/api/titles', getTitles);
app.post('/api/titles', addTitle);
app.put('/api/titles', editTitle);
app.delete('/api/titles/:title_id', deleteTitle);
//User Endpoints
app.get('/api/users', getUsers);
app.get('/api/users/all', getAllUsers);
app.put('/api/users', editUsers);
app.delete('/api/users',deleteUsers);
//Comments Endpoints 
app.get('/api/comments/:title_id', getComments);
app.post('/api/comments', addComment);
app.put('/api/comments/:comment_id', editComment);
app.delete('/api/comments/:title_id/:comment_id', deleteComment);

app.listen(PORT, ()=> console.log(`Server running on ${PORT}` ));
