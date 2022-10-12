const dbSchemas = require('../repository/dbSchemas');

module.exports = class UserController{

    constructor(){
        this.User = dbSchemas.User;
    }
    

    addUser = (email, password)=>{    

        let newUser = new this.User({
            email: email,
            password: password
        });

        
        newUser.save(err => {if(err){ console.log(err)} else { console.log("User persisted successfully");}});
    }

    deleteUser = id =>{
        
        this.User.deleteOne({_id: id}, (err)=>{ if(err){ console.log("error deleting user")}});
    }

    findUserByEmail = email => { this.User.findOne({email: email}, (err, foundUser)=>{
        if(err){
            console.log("here");
            return false;
        } else {
            if(foundUser !== null){
                console.log("here 2");
                return true;
            }
            return false;
            console.log("here 3");
        }
    })}

    findAllUsers = () => {
        this.User.find({}, (err, allUsers)=>{
            if(err){ 
                console.log(err)
            } else {
                console.log(allUsers);
            }
        });
    };
}
