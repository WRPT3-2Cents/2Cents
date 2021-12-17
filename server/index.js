const express = require('express');
const massive = require('massive');
require('dotenv').config();
const {postRegister, postLogin, getUser, logout} = require('./authController')


const app = express();

app.use(express.json())

massive({
    connectionString: process.env.CONNECTION_STRING,
    ssl:{
        rejectUnauthorized: false
    }
}).then((dbInstance)=>{
    app.set('db', dbInstance);
    console.log('Database connection succesful')
}).catch((e)=>{
    console.log('Database connection error', e)
})

//Authentication Endpoints
app.post('/api/register', postRegister)
app.post('/api/login', postLogin)
app.get('/api/me', getUser)
app.delete('/api/logout', logout)
//Title Endpoints

//User Endpoints

//Comments Endpoints 

const PORT = process.env.SERVER_PORT

app.listen(PORT, ()=> console.log(`Server running on ${PORT}` ))
