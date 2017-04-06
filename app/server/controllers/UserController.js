var _ = require('underscore');
var User = require('../models/User');
const util = require('util');

var validator = require('validator');
var moment = require('moment');

var UserController = {};


// Tests a string if it ends with target s
function endsWith(s, test){
  return test.indexOf(s, test.length - s.length) !== -1;
}

/**
 * Determines whether or not a given title is valid
 * No idea if this actually works
 * @param  {String}   id      Id of the user
 * @param  {String}   title   proposed submission title
 * @param  {Function} callback args(err, true, false)
 * @return {[type]}            [description]
 */
function isValidTitle(id, title, callback){
  User
    .findById(id)
    .exec(function(err, bundle){
      if (err) {
        return callback(err);
      }
      for (let submission of bundle.submissions){
        if(submission.title == title){
          return callback({
            message: 'You already have a submission with this title, please choose a new one.'
          });
        }
      }
      return callback(null, true);
  });
}

/**
 * Determine whether or not a user can register.
 * @param  {String}   email    Email of the user
 * @param  {Function} callback args(err, true, false)
 * @return {[type]}            [description]
 */
function canRegister(email, password, callback){
  if (!password || password.length < 6){
    return callback({ message: "Password must be 6 or more characters."}, false);
  }
  return callback(null, true);
}

/**
 * Login a user given a token
 * @param  {String}   token    auth token
 * @param  {Function} callback args(err, token, user)
 */
UserController.loginWithToken = function(token, callback){
  User.getByToken(token, function(err, user){
    return callback(err, token, user);
  });
};

/**
 * Login a user given an email and password.
 * @param  {String}   email    Email address
 * @param  {String}   password Password
 * @param  {Function} callback args(err, token, user)
 */
UserController.loginWithPassword = function(email, password, callback){

  if (!password || password.length === 0){
    return callback({
      message: 'Please enter a password'
    });
  }

  if (!validator.isEmail(email)){
    return callback({
      message: 'Invalid email'
    });
  }

  User
    .findOneByEmail(email)
    .select('+password')
    .exec(function(err, user){
      if (err) {
        return callback(err);
      }
      if (!user) {
        return callback({
          message: "We couldn't find you!"
        });
      }
      if (!user.checkPassword(password)) {
        return callback({
          message: "That's not the right password."
        });
      }

      // yo dope nice login here's a token for your troubles
      var token = user.generateAuthToken();

      var u = user.toJSON();

      delete u.password;

      return callback(null, token, u);
  });
};

/**
 * Create a new user given an email and a password.
 * @param  {String}   email    User's email.
 * @param  {String}   password [description]
 * @param  {Function} callback args(err, user)
 */
UserController.createUser = function(email, password, callback) {

  if (typeof email !== "string"){
    return callback({
      message: "Email must be a string."
    });
  }

  email = email.toLowerCase();

  // Check that there isn't a user with this email already.
  canRegister(email, password, function(err, valid){
    if (err || !valid){
      return callback(err);
    }

    User
      .findOneByEmail(email)
      .exec(function(err, user){

        if (err) {
          return callback(err);
        }

        if (user) {
          return callback({
            message: 'An account for this email already exists.'
          });
        } else {

          // Make a new user
          var u = new User();
          u.email = email;
          u.password = User.generateHash(password);
          u.save(function(err){
            if (err){
              return callback(err);
            } else {
              // yay! success.
              var token = u.generateAuthToken();

              return callback(
                null,
                {
                  token: token,
                  user: u
                }
              );
            }

          });
        }
    });
  });
};

UserController.getByToken = function (token, callback) {
  User.getByToken(token, callback);
};

/**
 * Get all users.
 * It's going to be a lot of data, so make sure you want to do this.
 * @param  {Function} callback args(err, user)
 */
UserController.getAll = function (callback) {
  User.find({}, callback);
};

/**
 * Get a user by id.
 * @param  {String}   id       User id
 * @param  {Function} callback args(err, user)
 */
UserController.getById = function (id, callback){
  User.findById(id, callback);
};

/**
 * Update a user's name field given an id and a name.
 *
 * @param  {String}   id       Id of the user
 * @param  {String}   name     Name string
 * @param  {Function} callback Callback with args (err, user)
 */
 UserController.updateNameById = function (id, name, callback){
   User.findOneAndUpdate({
     _id: id,
   },
     {
       $set: {
         'lastUpdated': Date.now(),
         'name': name,
       }
     },
     {
       new: true
     },
     callback);
 };

 /**
  * Push a user's new submission, given an id and a submission.
  *
  * @param  {String}   id          Id of the user
  * @param  {Object}   submission  submission object
  * @param  {Function} callback    Callback with args (err, user)
  */
 UserController.pushSubmissionById = function (id, submission, callback){
   isValidTitle(id, submission.title, function(err, valid){
     if (err || !valid){
       return callback(err);
     }
      User.findOneAndUpdate({
        _id: id,
      },
      {
        $push: {
          'submissions': submission
        }
      },
      {
        new: true
      },
      callback);
   });
 };

 /**
  * Pull a user's submission, given a user id and a submission id.
  *
  * @param  {String}   userId          Id of the user
  * @param  {Object}   submissionId    Id of the submission
  * @param  {Function} callback        Callback with args (err, user)
  */
 UserController.pullSubmissionById = function (userId, submissionId, callback){
  User.findOneAndUpdate({
    _id: userId,
  },
  {
    $pull: {
      'submissions': {
        _id: submissionId
      }
    }
  },
  {
    new: true
  },
  callback);
 };

 /**
  * Update a user's submission, given a user id and a submission title.
  *
  * @param  {String}   userId             Id of the user
  * @param  {String}   submissionId       title of the submission
  * @param  {Object}   submission         submission object
  * @param  {Function} callback           Callback with args (err, user)
  */
 UserController.updateSubmissionById = function (userId, submissionId, submission, callback){
   User.findById(userId).then(user => {
    let old_submission = user.submissions.id(submissionId);
    old_submission.code = submission.code;
    old_submission.likes = submission.likes;
    user.save();
    callback(null, user);
  });
 };

/**
 * Change a user's password, given their old password and a new one.
 * @param  {String}   id          User id
 * @param  {String}   oldPassword old password
 * @param  {String}   newPassword new password
 * @param  {Function} callback    args(err, user)
 */
UserController.changePassword = function(id, oldPassword, newPassword, callback){
  if (!id || !oldPassword || !newPassword){
    return callback({
      message: 'Bad arguments.'
    });
  }

  User
    .findById(id)
    .select('password')
    .exec(function(err, user){
      if (user.checkPassword(oldPassword)) {
        User.findOneAndUpdate({
          _id: id
        },{
          $set: {
            password: User.generateHash(newPassword)
          }
        }, {
          new: true
        },
        callback);
      } else {
        return callback({
          message: 'Incorrect password'
        });
      }
    });
};

/**
 * Reset a user's password to a given password, given a authentication token.
 * NOT DONE OR WORKING YET
 * TODO: Add control flow to rest of backend api
 * @param  {String}   token       Authentication token
 * @param  {String}   password    New Password
 * @param  {Function} callback    args(err, user)
 */
UserController.resetPassword = function(token, password, callback){
  if (!password || !token){
    return callback({
      message: 'Bad arguments'
    });
  }

  if (password.length < 6){
    return callback({
      message: 'Password must be 6 or more characters.'
    });
  }

  User.verifyTempAuthToken(token, function(err, id){

    if(err || !id){
      return callback(err);
    }

    User
      .findOneAndUpdate({
        _id: id
      },{
        $set: {
          password: User.generateHash(password)
        }
      }, function(err, user){
        if (err || !user){
          return callback(err);
        }
      });
  });
};

/**
 * Remove a user by id.
 * @param  {String}   id       User id
 * @param  {Function} callback args(err, user)
 */
UserController.removeById = function (id, callback){
  User.findByIdAndRemove(id, callback);
};

module.exports = UserController;
