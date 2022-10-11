const express = require('express');
const app = express();
const mongoose = require('mongoose');
const controller = require("./userController");
const bodyParser = require("body-parser");
const LocalStrategy = require("passport-local");
const passport = require("passport");


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/userDb").catch(err => console.log(err));
  
}

app.use(bodyParser.urlencoded(
  { extended: true }
));

passport.use(controller.user.createStrategy());

//passport.serializeUser(controller.user.serializeUser());
//passport.deserializeUser(controller.user.deserializeUser())



app.route("/").get((req,res) =>{
    res.sendFile(__dirname + "/signin.html");
});

app.get("/success", (req,res)=>{
  res.sendFile(__dirname + "success.html");
})

// app.route("/v1/auth")
//   .post((req,res)=>{
   
//     console.log(req.body);
//     let user = {
//       email: req.body.email,
//       password: req.body.password
//     };
//     console.log(controller.findUserByEmail(user.email));
//     if(controller.findUserByEmail(user.email) === true){
//       res.redirect("/success");
//     } else {
//       res.redirect("/");
//     } 

// });

app.post("/v1/auth", 
  passport.authenticate('local', { failureRedirect:  '/'}),
  function(req, res) {
    res.redirect('/success');
  });  

app.listen(3000, () =>{
    console.log("Server running on port 3000");
   // controller.findAllUsers();
   //controller.addUser("gabriel99","mypass");
    
});

