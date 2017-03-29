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

var TimerSchema = new mongoose.Schema({
    username:  String,
    timerName: String,
    timerNum:  Number,
    doneTime:  {type: Number, default: -1},
    state:     {type: Number, default: 0}
});

// ==================================================== Functions

TimerSchema.methods.addToMongo = function (username, timerName, timerNum, doneTime, state, callback) {
    debugger;
    this.username = username;
    this.timerName = timerName;
    this.timerNum = timerNum;
    this.doneTime = doneTime;
    this.state = state;
    console.log(this);
    return this.save(callback);
};

TimerSchema.methods.checkForUser = function (username, timerNum, callback) {
    this.model('Timer').find({username: username, timerNum: timerNum}, function (error, result) {
        if (error) {
            // Prints error to console if there was one
            console.log("Twas a error");
        } else {
            if (result.length > 0) {
                callback(null, result);
            } else {
                console.log("User does not exist in database");
                callback(null, 0);
            }
        }
    })
};
// ==================================================== End Functions


var Timer = mongoose.model('Timer', TimerSchema);

var a = new Timer({username: "scott", timerNum: 1, state: 0});
a.save(function (err) {
    if (err)
        console.log("This is an error: " + err);
});
module.exports = Timer;



