/*
 Name: Alex Oladele
 Date: 1/12/2017
 Course: CSE 270e
 */

// Modules
var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    Timer = new require('../models/timer');
var socket = require('../sockets/ws');
mongoose.Promise = global.Promise;


var inTimer = new Timer({});

module.exports = {
    getTimer: function (req, res) {
        debugger;
        var outTimer = new Timer({});
        var d = {
            timer: null,
            error: null
        };
        var q = function getInfo(callback) {
            outTimer.checkForUser(req.params.username, req.params.timerNum, function (err, result) {
                if (err) {
                    d.error = err;
                    console.log("get timer error ");
                    console.log(err);
                } else {
                    if (result[0]) {
                        callback(null, result);
                    } else {
                        callback(null, result);
                    }
                }
            })
        };

        var potassium = function findAndUpdate() {

        };

        q(function (err, result) {
            if (err) {
                var e = new Error("There was an error!");
                console.log(e);
            } else if (result.length <= 0) {
                d.timer = "";
                d.error = "Could not get Timer!";
                res.json(d)
            } else {
                d.timer = result[0];
                d.error = "";
                res.json(d);
            }
        });
    },

    putTimer: function (req, res) {
        debugger;
        // Variables used
        // var promise = query.exec();
        var d = {};
        console.log(req.body);
        var dataIn = req.body;
        inTimer = {
            username: dataIn.username,
            timerNum: dataIn.timerNum
        };



        var a = function saveUser(timerQ, callback) {
            var timer = new Timer({
                username:  timerQ.username,
                timerName: timerQ.timerName,
                timerNum:  timerQ.timerNum,
                doneTime:  timerQ.doneTime,
                state:     timerQ.state
            });
            timer.addToMongo(inTimer.username, inTimer.timerName, inTimer.timerNum, inTimer.doneTime, inTimer.state, function (err, result) {
                if (err) {
                    console.log("eRROR I guess")
                }
                callback(null, result);
            })
        };

        // Find method to check if user is in database
        var b = function checkForUser(callback) {
            Timer.find({username: req.params.username, timerNum: req.params.timerNum}, function (err, result) {
                if (err) {
                    var e = new Error("An error occurred searching from the database!");
                    console(e);
                    callback(e, null);
                } else {
                    console.log("Database successfully searched. " + result.length + " result came back");
                    console.log(err);
                    console.log(result);
                    callback(null, result);
                }
            })
        };

        var c = function updateUser(callback) {
            Timer.update({username: req.params.username, timerNum: req.params.timerNum}, {
                $set: {
                    username:  dataIn.username,
                    timerName: dataIn.timerName,
                    timerNum:  dataIn.timerNum,
                    doneTime:  dataIn.doneTime,
                    state:     dataIn.state
                }
            }, function (err) {
                if (err) {
                    var e = new Error("An error occurred updating the database!");
                    console(e);
                    callback(e);
                } else {
                    console.log("Database successfully updated!");
                    callback(null);
                }
            })
        };


        // What to do after the db check
        b(function (err, result) {
            if (err) {
                var e = new Error("An error occurred! (Couldn't search database most likely)");
                console.log(e);
            } else {
                if (result.length < 1) {
                    inTimer = {
                        username:  dataIn.username,
                        timerName: dataIn.timerName,
                        timerNum:  dataIn.timerNum,
                        doneTime:  dataIn.doneTime,
                        state:     dataIn.state
                    };
                    a(inTimer, function (status, result) {
                        console.log(status);
                    });
                    res.json(inTimer);
                } else {
                    c(function (status) {
                        if (status) {
                            console.log("There was an error updating the user in the database");
                        } else {
                            console.log("No troubles updating the user in the database!");
                        }
                    });
                    inTimer = {
                        timerName: dataIn.timerName,
                        doneTime:  dataIn.doneTime,
                        state:     dataIn.state
                    };
                    res.json(inTimer);
                }
            }

        });
    }

};