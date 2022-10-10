const express = require('express');
const app = express();
const mongoose = require('mongoose');
const controller = require("./dbController");


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/userDb").catch(err => console.log(err));
  
}

app.route("/").get((req,res) =>{
    res.json("testing");
})

app.listen(3000, () =>{
    console.log("Server running on port 3000");
   
    
});

