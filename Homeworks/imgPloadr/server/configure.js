/*
 Name: Alex Oladele
 Date: 1/12/2017
 Course: CSE 270e
 */

/*
 * Handles the setup for all the middleware used in the program
 */

/* Modules Used */
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
    session = require('express-session');
/* End of Modules */


/*
 * Defines the actual module that this file makes
 * Function that accepts the app object as a parameter, and returns the same object
 */
module.exports = function (app) {
    /**
     * @param "handlebars" - The file extension that the rendering engine should look for (aka handlebars)
     * @param exphbs.create - Calls express-hbs create function. Takes options object as a parameter that defines constants for server
     */
    app.engine('handlebars', exphbs.create({
        // Sets the default layout to be
        defaultLayout: 'main',

        // sets layoutsDir to the layouts folder
        layoutsDir: app.get('views') + '/layouts',

        // sets partialsDir to the partials folder
        partialsDir: [app.get('views') + '/partials'],

        // Creates the timeago helper (in the helpers property) for global use throughout the program
        helpers: {
            timeago: function (timestamp) {
                console.log(timestamp);
                return moment(timestamp).startOf('minute').fromNow();
            }
        }
    }).engine);

    // view-engine = handlebars
    app.set('view engine', 'handlebars');


    /*
     * Middleware used!
     */

    // Used for logging, helpful for debugging Node server
    app.use(morgan('dev'));

    app.use(multer({
        dest: path.join(__dirname, 'public/upload/temp')
    }).any());

    // For older browsers that don't support REST HTTP verbs (e.g. UPDATE, PUT, ETC) (cuz they're dumb)
    app.use(methodOverride());

    // Allows cookies to be sent and received

    // Packs up any form fields that are submitted via HTTP. Fields submitted via post are available via req.body
    // app.use(bodyParser.urlencoded({extended: true}));

    app.use(cookieParser('Long-Ago-The-Four-Nations-Lived-Together-In-Harmony-Then-Everything-Changed-When-The-Fire-Nation-Attacked'));

    // Enables sessions!
    app.use(session({
        secret:            "Adetayo Alexander Oluwaseyi Oladele",
        resave:            true,
        saveUninitialized: false,
        cookie:            {}
    }));

    // Tells Express that you're using (Express) router with your server. Respond to requests like GET, POST, PUT, UPDATE
    routes(app); //moving the routes to routes folder

    // Renders static content files from predefined directories
    app.use('/public/', express.static(path.join(__dirname, '../public')));
    if ('development' === app.get('env')) {

        // Handles any errors that occur throughout middleware process
        app.use(errorHandler());
    }

    return (app);

};