const express = require('express');
const app = express();
const userSchema = require('./repository/dbConnector');

app.route("/").get((req,res) =>{
    res.json("testing");
})

app.listen(3000, () =>{
    console.log("server running on port 3000");
    console.log(userSchema.time);
});

