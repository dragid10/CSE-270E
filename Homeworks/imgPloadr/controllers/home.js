/*
 Name: Alex Oladele
 Date: 1/12/2017
 Course: CSE 270e
 */

// Pull in sidebar, and image model modules
var sidebar = require('../helpers/sidebar'),
    ImageModel = require('../models').Image;

module.exports = {
    // When user navigates to index (aka home)
    index: function (req, res) {
        // Create viewModel with empty images object property
        var viewModel = {
            images: {}
        };

        // Retrieves list of the newest images to display on the homepage

        // find ( parameter, mapping, options)
        // find (no parameters, no specific mapping (full schema returned), oldest images first
        ImageModel.find({}, {}, {sort: {timestamp: -1}},
            function (err, images) {
                if (err) {
                    throw err;
                }

                // Attach the image array returned from find to viewModel.images
                viewModel.images = images;
                sidebar(viewModel, function (viewModel) {
                    res.render('index', viewModel);
                });
            });
    }
};