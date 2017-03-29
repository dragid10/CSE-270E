/**
 * Name: Alex Oladele
 * Date: 1/17/17
 * Course CSE 270e
 * Assignment: //TODO
 */

// Required modules
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    // Path const
    path = require('path');

// Define schema (blueprint for table) with properties that will be used
var ImageSchema = new Schema({
    title:       {type: String},
    description: {type: String},
    filename:    {type: String},
    views:       {type: Number, 'default': 0},
    likes:       {type: Number, 'default': 0},
    timestamp:   {type: Date, 'default': Date.now}
});

// Virtual prop of uniqueId (removes file extension from fileName to store as id)
ImageSchema.virtual('uniqueId')
    .get(function () {
        return this.filename.replace(path.extname(this.filename), '');
    });

// Export it as a module for the rest of the program. Basically creates object out of schema (like a class in java)
module.exports = mongoose.model('Image', ImageSchema);