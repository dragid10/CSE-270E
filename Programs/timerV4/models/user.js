/**
 * Name: Alex Oladele
 * Date: 1/17/17
 * Course CSE 270e
 * Assignment: Timer V4.0
 */



var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    path = require('path'),
    passwordHash = require('password-hash');
mongoose.Promise = global.Promise;

var UserSchema = new mongoose.Schema({
    username:   String,
    password:   String,
    email:      String,
    lastAccess: {type: Date, default: Date.now},
    visits:     {type: Number, default: 0}
});


// ==================================================== Functions
/**
 *
 * @param username - Username to check if password is correct
 * @param password - Password to check for
 * @param callback - What to do post check
 */
UserSchema.methods.checkPassword = function (username, password, callback) {
    this.model('User').find({username: username}, function (error, result) {
        if (error) {
            console.log("Twas a error");
        } else {
            if (result.length !== 1) {
                var e = new Error("User Not Found in Database!");
                console.log(e);
                callback(e, null);
            } else {
                console.log("Got exactly " + result.length + " result back!");
                callback(null, result)
            }
        }
    })
};

UserSchema.methods.checkExists = function (username, callback) {
    this.model('User').find({username: username}, function (error, result) {
        if (error) {
            // Prints error to console if there was one
            console.log("Twas a error");
        } else {
            if (result.length > 0) {
                var e = new Error("User already exists");
                console.log(e);
                callback(e, null);
            } else {
                console.log("User does not already exist (WHICH IS GOOD)");
                callback(null, result)
            }
        }

    })
};

UserSchema.methods.updateVisits = function (username, callback) {
    this.model('User').update({username: username}, {$set : {visits: visits + 1}}, function (error, result) {
        if (error) {
            var e = new Error("Could not search database for user");
            console.log(e);
        } else {
            if (result.length > 0) {
                callback(null, result);
            } else {
                callback(e, null);
            }
        }
    })
};

UserSchema.pre('save', function (next) {
    console.log(this);
    //see if user exists and if so throw err
    if (this.username.length < 2 || this.password.length < 2 || this.email.length < 2) {
        var e = new Error("Invalid username, password or email");
        console.log(e);
        next(e);
    }
    console.log("Saved user successfully!");
    next();
});

// ==================================================== End Functions


var User = mongoose.model('User', UserSchema);

var a = new User({username: "scott", password: "hello", email: "campbest@miamioh.edu"});
var hashword = passwordHash.generate(a.password);
if (passwordHash.isHashed(hashword)) {
    a.password = hashword;
}
a.save(function (err) {
    if (err)
        console.log("This is an error: " + err);
});
module.exports = User;



