// Required modules
var fs = require('fs'),
    path = require('path'),
    sidebar = require('../helpers/sidebar'),
    Models = require('../models'),
    md5 = require('md5');

module.exports = {
    index:   function (req, res) {

        // viewModel to be populated using mongo
        var viewModel = {
            image:    {},
            comments: []
        };

        // Uses findOne to return a single result
        // Uses regex (reg exp) to get the id of an image from the url
        Models.Image.findOne({filename: {$regex: req.params.image_id}},
            function (err, image) {
                if (err) {
                    throw err;
                }
                // Checks If image object is null. Returns db object with image
                if (image) {

                    // increments the views for an image
                    image.views = image.views + 1;

                    // Attach image from find to viewModel
                    viewModel.image = image;

                    // Saves image to the database
                    image.save();

                    // Retrieves any comments for the image and sorts by newest first
                    Models.Comment.find(
                        {image_id: image._id},
                        {},
                        {sort: {'timestamp': 1}},
                        function (err, comments) {
                            // Attach the comments to the viewModel
                            viewModel.comments = comments;

                            // Call sidebar function to add viewModel to sidebar
                            sidebar(viewModel, function (viewModel) {
                                res.render('image', viewModel);
                            });
                        }
                    );
                } else {
                    // If null, it means the filename / image doesn't exist and redirect back ot home page
                    res.redirect('/');
                }
            });
    },
    create:  function (req, res) {
        // Upon upload, saves the image with a random name
        var saveImage = function () {
            var possible = 'abcdefghijklmnopqrstuvwxyz0123456789',
                imgUrl = '';

            for (var i = 0; i < 6; i += 1) {
                imgUrl += possible.charAt(Math.floor(Math.random() * possible.length));
            }

            // Checks to see if the imageURL already exists, if so, it calls the save func again
            Models.Image.find({filename: imgUrl}, function (err, images) {
                if (images.length > 0) {
                    saveImage();
                } else {
                    // creates tempPath for the image with its new filename
                    var tempPath = req.files.file.path,
                        ext = path.extname(req.files.file.name).toLowerCase(),
                        targetPath = path.resolve('./public/upload/' + imgUrl + ext);

                    // If the user actually uploads the image, then make the url to the image permanent
                    if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
                        fs.rename(tempPath, targetPath, function (err) {
                            if (err) {
                                throw err;
                            }

                            // Create new image model with data
                            var newImg = new Models.Image({
                                title:       req.body.title,
                                filename:    imgUrl + ext,
                                description: req.body.description
                            });
                            // Saves the image model to mongo db
                            newImg.save(function (err, image) {
                                console.log('Successfully inserted image: ' + image.filename);

                                // When successfully saved to db, then redirect page to the new image
                                res.redirect('/images/' + image.uniqueId);
                            });
                        });
                    } else {
                        // Whatever was uploaded was NOT an image file
                        fs.unlink(tempPath, function () {
                            if (err) throw err;

                            res.json(500, {error: 'Only image files are allowed.'});
                        });
                    }
                }
            });
        };

        // Gotta do this, or nothing will happen
        saveImage();
    },
    like:    function (req, res) {
        // Find one instance of the image
        Models.Image.findOne({filename: {$regex: req.params.image_id}},
            function (err, image) {
                // If err is null and the image exists
                if (!err && image) {

                    // Increment the like prop
                    image.likes = image.likes + 1;

                    // Save to db
                    image.save(function (err) {
                        if (err) {
                            res.json(err);
                        } else {
                            res.json({likes: image.likes});
                        }
                    });
                }
            });
    },
    comment: function (req, res) {
        // Find one instance of image
        Models.Image.findOne({filename: {$regex: req.params.image_id}},
            function (err, image) {
                // IF err is null and image exists
                if (!err && image) {
                    // Creates new comment model from the current comment that came to us
                    var newComment = new Models.Comment(req.body);

                    // Stores hashed value of the commenters email address
                    newComment.gravatar = md5(newComment.email);

                    // Attach the images id  prop to the new Comment
                    newComment.image_id = image._id;

                    // Save to dv
                    newComment.save(function (err, comment) {
                        if (err) {
                            throw err;
                        }

                        // Redirect to the image page and scrolls down to the comment
                        res.redirect('/images/' + image.uniqueId + '#' + comment._id);
                    });
                } else {
                    res.redirect('/');
                }
            });
    },
    remove:  function (req, res) {
        Models.Image.findOne({filename: {$regex: req.params.image_id}},
            function (err, image) {
                if (err) {
                    throw err;
                }

                fs.unlink(path.resolve('./public/upload/' + image.filename),
                    function (err) {
                        if (err) {
                            throw err;
                        }

                        Models.Comment.remove({image_id: image._id},
                            function (err) {
                                image.remove(function (err) {
                                    if (!err) {
                                        res.json(true);
                                    } else {
                                        res.json(false);
                                    }
                                });
                            });
                    });
            });
    }
};