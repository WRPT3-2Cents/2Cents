const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer')
require('dotenv').config();

const db = (req) => req.app.get('db');

const postRegister = async (req, res) => {
    const { userName, userEmail, userPassword } = req.body;
    
    let transport = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        secureConnection: false,
        port: 587,
        tls: {
          ciphers:'SSLv3'
       },
        auth: {
          user: process.env.EMAIL_NAME,
          pass: process.env.EMAIL_PASS
        },
      });
    
      let mailText = {
        from: process.env.EMAIL_NAME,
        to: userEmail,
        subject: "Welcome to 2cents",
        text: "Thank you for registering with 2Cents!",
      };
    
      transport.sendMail(mailText, function(err){
        if (err) {
          console.log(err);
        }
        console.log('Message Sent')
      });
    
      try {
        const result = await db(req).get_user(userName);
        const existingUser = result[0];

        if (existingUser){
            return res.status(409).json(`Username taken`);
        } else {
            const hash = bcrypt.hashSync(userPassword);
            const registeredUser = await db(req).register_user([userName, hash, userEmail]);
            const user = registeredUser[0];
            req.session.user = {
                username: user.username,
                email: user.email
            }
            return res.status(201).send(req.session.user);
        }
    } catch (err){
        console.log(`Error registering user: ${err}`);
        return res.status(500).send(err);
    }
}


const postLogin = async (req, res) => {
    const { userName, password } = req.body;
    try {
        const foundUser = await db(req).get_user(userName);
        const user = foundUser[0];
        if (!user){
            res.status(401).send(`User not found. Please register a new user before logging in.`)
        } else {
            const isAuthenticated = bcrypt.compareSync(password, user.password);
            if (!isAuthenticated){
                 res.status(403).send(`Incorrect password!`);
            } else {
                req.session.user = {
                    id: user.user_id,
                    username: user.username,
                    email: user.email,
                    recommendations: user.recommendations,
                    watchlist: user.watchlist,
                    follows: user.follows
                }
                res.status(200).send(req.session.user);
            }
        }
    } catch(err){
        console.log(`Error logging in user: ${err}`);
        res.status(500).send(err);
    }
}

const getUser = async (req, res) => {
    if (req.session.user)res.status(200).send(req.session.user)
        else {res.sendStatus(401)
    }
}


const logout = async (req ,res) => {
    req.session.destroy();
    res.status(200).send(`User logged out`);
}

module.exports = {
    postRegister,
    postLogin,
    getUser,
    logout
}