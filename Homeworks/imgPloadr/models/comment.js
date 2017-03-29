/**
 * Name: Alex Oladele
 * Date: 1/17/17
 * Course CSE 270e
 * Assignment: //TODO
 */

// SEE models/image.js FOR RELEVANT COMMENTS ON WHATS HAPPENING

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,

    // Links comment model (this) with image model with the ID
    ObjectId = Schema.ObjectId;

var CommentSchema = new Schema({
    image_id:  {type: ObjectId},
    email:     {type: String},
    name:      {type: String},
    gravatar:  {type: String},
    comment:   {type: String},
    timestamp: {type: Date, 'default': Date.now}
});

// How we attach related image when we retireve comments in controllers
CommentSchema.virtual('image')
    .set(function (image) {
        this._image = image;
    })
    .get(function () {
        return this._image;
    });

module.exports = mongoose.model('Comment', CommentSchema);
