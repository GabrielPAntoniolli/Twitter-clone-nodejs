const express = require('express');
const app = express();
const mongoose = require('mongoose');
const UserController = require("./src/controller/UserController");
const bodyParser = require("body-parser");
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');
require('dotenv').config();

const controller = new UserController();

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB_CONNECTION).catch(err => console.log(err));
  
}

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.authenticate('session'));

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user.id, email: user.email });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});


passport.use(new LocalStrategy({usernameField: 'email'},
  function(email, password, done) {
        controller.findUserByEmail(email, (err,user) => { 
          
        if (err) { 
          console.log("1");
          return done(err); 
  
        } else if(!user) { 
          console.log("2");
          return done(null, false);

        } else if (controller.checkPassword(password, user.password) == false) { 
          console.log("3");
          return done(null, false);
        
        } else { 
          console.log(controller.checkPassword(password, user.password));
          return done(null, user);
        }
      });
    }
  
));


app.use(bodyParser.urlencoded(
  { extended: true }
));

app.route("/").get((req,res) =>{
    res.sendFile(__dirname + "/signin.html");
});

app.get("/success", (req,res)=>{
  res.sendFile(__dirname + "/success.html");
})

app.post('/v1/auth', 
  passport.authenticate('local', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/success');
  });

app.listen(process.env.PORT || 3000, () =>{
    console.log("Server running on port 3000");
    //controller.findUserByEmail("lucas");
    //controller.findAllUsers();
   //git dUser("Lucas","SouGremista");
  //  let bool = controller.checkPassword("123", "$2b$10$UwLdR.fWQt5TO0nNIDoPSuJxCic1s1Lphuo24DNszLhan1/dolBQq");
  //  console.log(bool);
    
});

