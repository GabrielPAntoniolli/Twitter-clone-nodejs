const dbSchemas = require('./repository/dbSchemas');

exports.addUser = (email, password)=>{

    const User = dbSchemas.User;

    let newUser = new User({
        email: email,
        password: password
    });
    newUser.save(err => {if(err){ console.log("err")} else { console.log("it worked");}});
}

exports.deleteUser = id =>{
    const User = dbSchemas.User;
    User.deleteOne({_id: id}, (err)=>{ if(err){ console.log("error deleting user")}});
}

