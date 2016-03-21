'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AlbumArtSchema = new Schema({
  _id: String,
  url: String,
  img: {
    data: Buffer,
    contentType: String
  }
});

module.exports = mongoose.model('AlbumArt', AlbumArtSchema);