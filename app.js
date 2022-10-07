const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dbSchemas = require('./repository/dbSchemas');


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/userDb").catch(err => console.log(err));
  
}

function addUser(email, password){

    const User = dbSchemas.User;

    let newUser = new User({
        email: email,
        password: password
    });
    newUser.save(err => {if(err){ console.log("err")} else { console.log("it worked");}});
}

function deleteUser(id){
    const User = dbSchemas.User;
    User.deleteOne({_id: id}, (err)=>{ if(err){ console.log("error deleting user")}});
}


app.route("/").get((req,res) =>{
    res.json("testing");
})

app.listen(3000, () =>{
   console.log("server running on port 3000");
    
});

