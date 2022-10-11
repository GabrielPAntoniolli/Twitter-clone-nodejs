const dbSchemas = require('./repository/dbSchemas');

const User = dbSchemas.User;
exports.user = User;


exports.addUser = (email, password)=>{    

    let newUser = new User({
        email: email,
        password: password
    });
    newUser.save(err => {if(err){ console.log("err")} else { console.log("it worked");}});
}

exports.deleteUser = id =>{
    
    User.deleteOne({_id: id}, (err)=>{ if(err){ console.log("error deleting user")}});
}

exports.findUserByEmail = email => { User.findOne({email: email}, (err, foundUser)=>{
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

exports.findAllUsers = () => {
    User.find({}, (err, allUsers)=>{
        if(err){ 
            console.log(err)
        } else {
             console.log(allUsers);
        }
    });
};

