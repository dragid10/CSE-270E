/*
    Name: Alex Oladele
    Date: 1/12/2017
    Course: CSE 270e
*/

// Pulls in dependencies (modules)
var path = require('path'),
    routes = require('./routes'),
    // Templating engine used for views
    exphbs = require('express-handlebars'),
    express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    morgan = require('morgan'),
    methodOverride = require('method-override'),
    errorHandler = require('errorhandler'),
    moment = require('moment'),
    multer = require('multer'),
    upload = multer({
        dest: path.join(__dirname, 'public/upload/temp')
    }),
    session = require('express-session');

/*Defines the actual module that this file makes*/

// module that accepts an app object as a parameter
module.exports = function (app) {
    app.engine('handlebars', exphbs.create({
        defaultLayout: 'main',
        layoutsDir: app.get('views') + '/layouts',
        partialsDir: [app.get('views') + '/partials'],
        helpers: {
            timeago: function (timestamp) {
                console.log(timestamp);
                return moment(timestamp).startOf('minute').fromNow();
            }
        }
    }).engine);
    app.set('view engine', 'handlebars');


    /*Middleware used!*/
    // Used for logging, helpful for debugging
    app.use(morgan('dev'));

    // Packs up any form fields that are submitted via HTTP. Fields submitted via post are available via req.body
    // app.use(bodyParser({
    //     uploadDir: path.join(__dirname, 'public/upload/temp')
    // }));

    // app.use(upload);
    app.use(multer({
        dest: path.join(__dirname, 'public/upload/temp')
    }));

    // For older browsers that don't support REST HTTP verbs (cuz they're dumb)
    app.use(methodOverride());

    // Allows cookies to be sent and recieved 
    app.use(cookieParser('some-secret-value-here'));

    // Enables sessions!
    app.use(session({
        secret: "SOME SECRET"
    }));

    // Tells Express that you're using a router with your server. Respond to requests like GET, POST, PUT, UPDATE
    routes(app); //moving the routes to routes folder

    // Renders static content files from predefined directories
    app.use('/public/', express.static(path.join(__dirname, '../public')));
    if ('development' === app.get('env')) {
        // Handles any errors that occur throughout middleware process
        app.use(errorHandler());
    }
    routes(app);
    return (app);

};