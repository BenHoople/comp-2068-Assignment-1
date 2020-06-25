// INSTRUCTIONS
/*
  name/title
  video Url
  thumbnailUrl
  description
  association with user
  public/private
*/
const mongoose = require('mongoose');

const VideoScema = new mongoose.Schema({
  user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
  },
  title:{
      type: String,
      required: true //you must have a title!
  },
  VideoUrl: { //this will reference the video address in the files
      type: String,
      required: true
  },
  status: {
      type: String,
      enum: ['PUBLIC', 'PRIVATE'],
      default: 'PRIVATE'
  }
},{
  timestamps: true
});

//query helpers
VideoScema.query.drafts = function () {
  return this.where({
      status: 'DRAFT'
  })    
};
VideoScema.query.published = function () {
  return this.where({
      status: 'PUBLISHED'
  })    
};
VideoScema.virtual('synopsis').get(function(){
  const post = this.content;
  return post.replace(/(<([^>]+)>)/ig,"").substring(0, 225);
});

module.exports = mongoose.model('Video', VideoScema);