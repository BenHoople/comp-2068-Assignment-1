// INSTRUCTIONS
/*
  Create a new resource model that uses the User
  as an associative collection (examples):
  - User -> Books
  - User -> Reservation

  Your model must contain at least three attributes
  other than the associated user and the timestamps.

  Your model must have at least one helpful virtual
  or query function. For example, you could have a
  book's details output in an easy format: book.format()
*/

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
  content: {
      type: String,
      required: false
  },
  status: {
      type: String,
      enum: ['DRAFT', 'PUBLISHED'],
      default: 'DRAFT'
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