var UserController = require('../controllers/UserController');

var request = require('request');

module.exports = function(router) {

  function getToken(req){
    return req.headers['x-access-token'];
  }

  /**
   * Using the access token provided, check to make sure that
   * you are, indeed, an admin.
   */
  function isAdmin(req, res, next){

    var token = getToken(req);

    UserController.getByToken(token, function(err, user){

      if (err) {
        return res.status(500).send(err);
      }

      if (user && user.admin){
        req.user = user;
        return next();
      }

      return res.status(401).send({
        message: 'Get outta here, punk!'
      });

    });
  }

  /**
   * [Users API Only]
   *
   * Check that the id param matches the id encoded in the
   * access token provided.
   *
   * That, or you're the admin, so you can do whatever you
   * want I suppose!
   */
  function isOwnerOrAdmin(req, res, next){
    var token = getToken(req);
    var userId = req.params.id;

    UserController.getByToken(token, function(err, user){

      if (err || !user) {
        return res.status(500).send(err);
      }

      if (user._id == userId || user.admin){
        return next();
      }
      return res.status(400).send({
        message: 'Token does not match user id.'
      });
    });
  }

  /**
   * Default response to send an error and the data.
   * @param  {[type]} res [description]
   * @return {[type]}     [description]
   */
  function defaultResponse(req, res){
    return function(err, data){
      if (err){
          return res.status(500).send(err);
      } else {
        return res.json(data);
      }
    };
  }

  /**
   *  API!
   */

  // ---------------------------------------------
  // Users
  // ---------------------------------------------

  /**
   * [PUBLIC]
   *
   * GET - Get all users
   */
  router.get('/users', function(req, res){
    UserController.getAll(defaultResponse(req, res));
  });

  /**
   * [PUBLIC]
   *
   * GET - Get a specific user.
   */
  router.get('/users/:id', function(req, res){
    UserController.getById(req.params.id, defaultResponse(req, res));
  });

  /**
   * [OWNER/ADMIN]
   *
   * PUT - Update a specific user's name.
   */
  router.put('/users/:id/name', isOwnerOrAdmin, function(req, res){
    var name = req.body.name;
    var id = req.params.id;

    UserController.updateNameById(id, name , defaultResponse(req, res));
  });

  /**
   * [OWNER/ADMIN]
   *
   * PUT - push a new user's submission.
   */
  router.post('/users/:id/submissions', isOwnerOrAdmin, function(req, res){
    var submission = req.body.submission;
    var id = req.params.id;

    UserController.pushSubmissionById(id, submission , defaultResponse(req, res));
  });

  /**
   * [OWNER/ADMIN]
   *
   * Update a user's password.
   * {
   *   oldPassword: STRING,
   *   newPassword: STRING
   * }
   */
  router.put('/users/:id/password', isOwnerOrAdmin, function(req, res){
    return res.status(304).send();
    var id = req.params.id;
    var old = req.body.oldPassword;
    var pass = req.body.newPassword;

    UserController.changePassword(id, old, pass, function(err, user){
      if (err || !user){
        return res.status(400).send(err);
      }
      return res.json(user);
    });
  });
};
