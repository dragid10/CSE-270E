
/* jshint node: true */
"use strict";

var models = require('../models'),
    async = require('async');

module.exports = {
    newest: function(callback) {
        // Finds comments and limits them to 5, sorted by newest first
        models.Comment.find({}, {}, { limit: 5, sort: { 'timestamp': -1 } },
            function(err, comments){
                var attachImage = function(comment, next) {
                    // find one image and attaches image model to comments image prop
                    models.Image.findOne({ _id : comment.image_id},
                        function(err, image) {
                            if (err) throw err;

                            comment.image = image;
                            next(err);
                        });
                };

                // Applies the attachImage func to every comment
                async.each(comments, attachImage,
                    function(err) {
                        if (err) throw err;
                        callback(err, comments);
                    });
            });
    }
};