/**
 * Name: Alex Oladele
 * Date: 1/17/17
 * Course CSE 270e
 * Assignment: //TODO
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
// Required! Change default promise to global for sone reason
mongoose.Promise = global.Promise;

// Mongo DB  server to connect to
mongoose.connect('mongodb://localhost:27017/mongotest');

// Log to console, when connection is successful
mongoose.connection.on('open', function () {
    console.log('Mongoose connected.');
});

// Create a new schema (table) with val: prop format
var Account = new Schema({
    username:     {type: String, required: true},
    date_created: {type: Date, default: Date.now()},
    visits:       {type: Number, default: 0},
    active:       {type: Boolean, default: false},
    age:          {type: Number, required: true, min: 13, max: 120}

});

// Static method
Account.statics.findByAgeRange = function (min, max, callback) {
    this.find({age: {$gt: min, $lte: max}}, callback);
};


// Make new model var with account schema. literally like creating a new object....
var AccountModel = mongoose.model('Account', Account);

AccountModel.findByAgeRange(18, 30, function (err, accounts) {
    console.log(accounts.length)
});
var newUser = new AccountModel();
newUser.username = "Alex";
// the same error would occur if we executed:
// newUser.save();


console.log(newUser.username);
console.log(newUser.date_created);
console.log(newUser.visits);
console.log(newUser.active);