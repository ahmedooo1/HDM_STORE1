const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
    content: { type: String, required: true },  
    stuffId: { type: String, required: true },
    user: {   
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User'  
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
      }  
  });
  commentSchema.virtual('userId.name').get(function() {
    return this.userId.name;
  });
  module.exports = mongoose.model('Comments', commentSchema);