/*
    Name: Alex Oladele
    Date: 1/12/2017
    Course: CSE 270e
*/

// Grab modules needed
var express = require('express'),
    router = express.Router(),
    home = require('../controllers/home'),
    image = require('../controllers/image');
    // student = require('../controllers/student');

// Creates the module that this file is and attaches all the routes to the app instance
module.exports = function (app) {
    router.get('/', home.index);
    // router.get('/student', student.get);
    router.get('/images/:image_id', image.index);
    // router.post('/student', student.post);
    router.post('/images', image.create);
    router.post('/images/:image_id/like', image.like);
    router.post('/images/:image_id/comment', image.comment);
    // app.get('/student', student.get);
    // app.post('/student', student.post);
    app.use(router);
};