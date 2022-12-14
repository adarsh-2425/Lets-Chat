const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User Schema
const UserSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true
    }, 
    role: {
        type: String,
        default:'member'  
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    about: {
        type: String,
    },
    image: {
        type: String,
    },
    password: {
        type: String,
        required: true
    }
});


const User = module.exports = mongoose.model('User', UserSchema);

// Retrieve User Using ID
module.exports.getUserById = function(id, callback){
User.find(id, callback);
}

// Retrieve User Using Email
module.exports.getUserByEmail = function(email, callback){
const query = {email: email}
User.findOne(query, callback);
}


// Saving User To The Database
module.exports.addUser = function(newUser,callback){
bcrypt.genSalt(10, (err,salt)=>{
    bcrypt.hash(newUser.password, salt, (err,hash)=>{
        if(err) throw err;
        newUser.password = hash;
        newUser.save(callback);
    });
});
};


// Comparing Passwords
module.exports.comparePassword = function(candidatePassword, hash, callback){
bcrypt.compare(candidatePassword, hash, (err, isMatch)=>{
    if (err) throw err;
    callback(null, isMatch);
});
}