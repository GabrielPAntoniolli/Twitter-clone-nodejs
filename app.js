const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dbSchemas = require('./repository/dbSchemas');


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/userDb");
  
}


app.route("/").get((req,res) =>{
    res.json("testing");
})

app.listen(3000, () =>{
    console.log(dbSchemas);
    
});

