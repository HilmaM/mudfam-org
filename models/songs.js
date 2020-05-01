var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SongSchema = new Schema(
  {
    track: {type: Buffer},
    //buckectName: {type: String},
    trackName: {type: String, minlength: 3, maxlength: 50, required: true},
  }
);

SongSchema
.virtual('song-title')
.get(function () {
  return  this.trackName;
});

SongSchema
.virtual('song-file')
.get(function () {
  return  this.buckectName; 
});

SongSchema
.virtual('url')
.get(function () {
  return '/sites/song/' + this._id;
});

//Export model
module.exports = mongoose.model('Song', SongSchema);