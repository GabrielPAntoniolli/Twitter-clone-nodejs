const dbSchemas = require('../repository/dbSchemas');

module.exports = class UserController{

    constructor(){
        this.User = dbSchemas.User;
    }
    

    addUser(email, password){    

        const newUser = new this.User({
            email: email,
            password: password
        });

        
        newUser.save((err, result) =>{
            if(err){ 
                throw err
            } else { 
                return true;
            }}
        );
    }

    deleteUser(id){
        
        this.User.deleteOne({_id: id}, (err)=>{ if(err){ console.log("error deleting user")}});
    }

    /*findUserByEmail(email, cb){
        /*if(typeof cb !== "function"){
            throw new Error("")

        }
         this.User.findOne({email: email}, (err, foundUser)=>{
            if(foundUser){
                return foundUser;
                
            } else {

                throw err;
            }
    })};*/

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
