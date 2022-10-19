const dbSchemas = require('../repository/dbSchemas');
const bcrypt = require("bcrypt");
const saltRounds = 10;


module.exports = class UserController{

    

    constructor(){
        this.User = dbSchemas.User;

    }
    

    addUser(email, password){   
        
        bcrypt.hash(password, saltRounds, (err, hash) => {
            // Store hash in your password DB.
           
            if(err){
                console.log(err);
            } else {
                
                const newUser = new this.User({
                    email: email,
                    password: hash
                });
                
                newUser.save((err, result) =>{
                    if(err){
                     
                        throw err
                        
                    } else { 
                        console.log(result);
                    }}
                );
            }
        });
       
    }

    deleteUser(id){
        
        this.User.deleteOne({_id: id}, (err, response) => { 
            if(err){ 
                console.log("error deleting user")
            } else {
                console.log(response);
                return true;
            }
        });
    }

    findUserByEmail(email, cb){
        if(typeof cb !== "function"){
            throw new Error("A function is expected in this parameter")
        }
         this.User.findOne({email: email}, (err, foundUser)=>{
            if(foundUser){
                cb(null,foundUser);
            } else {
                cb(null);
            }
        })
    }


    findAllUsers(){
        this.User.find({}, (err, allUsers)=>{
            if(err){ 
                console.log(err)
            } else {
                console.log(allUsers);
            }
        });
    };
}
