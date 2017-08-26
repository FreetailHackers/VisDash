var mongoose   = require('mongoose'),
    validator  = require('validator')

// define the schema for our submission model
var schema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  owner: {
    type: String,
    required: true
  },

  likes: {
    type: Number,
    required: true,
    default: 0
  },
  
  code: {
    type: String,
    required: true,
    default: ""
  }
});
schema.set('toJSON', {
  virtuals: true
});

schema.set('toObject', {
  virtuals: true
});

//=========================================
// Instance Methods
//=========================================

schema.statics.isOwner = function(user, callback){
  return callback(
      owner == user
    );
};

module.exports = mongoose.model('User', schema);
