const dbSchemas = require('../repository/dbSchemas');
const bcrypt = require("bcrypt");
const saltRounds = 10;


module.exports = class UserController{

    constructor(){
        this.User = dbSchemas.User;
    }

    addUser(email, password, cb){   
        
        bcrypt.hash(password, saltRounds).then( (err, hash) => {
            // Store hash in your password DB.
           
            if(err){
                cb(err);
            } else {
                
                const newUser = new this.User({
                    email: email,
                    password: hash
                });
                
                newUser.save((err, result) =>{
                    if(err){ 
                       cb(err);
                    } else { 
                        cb(null, result);
                    }}
                );
            }
        });
    }

    deleteUser(id){
        
        this.User.deleteOne({_id: id}).exec((err, user)=>{
           if(err){
            throw err;
           } else {
            return true;
           }
        });
    }

    findUserByEmail(email, cb){
        if(typeof cb !== "function"){
            throw new Error("A function is expected in this parameter")
        }
         this.User.findOne({email: email}).then((err, foundUser)=>{
            if(foundUser){
                cb(null,foundUser);
            } else {
                cb(null);
            }
        });
    };

    checkPassword(password, hash){
        const result = bcrypt.compareSync(password, hash, function(err, result) {
            if(err){
                throw err;
            } else {
                console.log("hey");
                //console.log(result);
            return result;
            }
        });
        return result;
    };


    findAllUsers(){
        this.User.find({}).then( (err, allUsers)=>{
            if(err){ 
                console.log(err)
            } else {
                console.log(allUsers);
            }
        });
    };
}
