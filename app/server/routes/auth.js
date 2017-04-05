var _         = require('underscore');
var jwt       = require('jsonwebtoken');
var validator = require('validator');

var UserController = require('../controllers/UserController');

module.exports = function(router){

  // ---------------------------------------------
  // AUTHENTICATION
  // ---------------------------------------------

  /**
   * Login a user with a username (email) and password.
   * Find em', check em'.
   * Pass them an authentication token on success.
   * Otherwise, 401. You fucked up.
   *
   * body {
   *  email: email,
   *  password: password
   *  token: ?
   * }
   *
   */
  router.post('/login',
    function(req, res, next){
      var email = req.body.email;
      var password = req.body.password;
      var token = req.body.token;

      if (token) {
        UserController.loginWithToken(token,
          function(err, token, user){
            if (err || !user) {
              return res.status(400).send(err);
            }
            return res.json({
              token: token,
              user: user
            });
          });
      } else {
        UserController.loginWithPassword(email, password,
          function(err, token, user){
            if (err || !user) {
              return res.status(400).send(err);
            }
            return res.json({
              token: token,
              user: user
            });
          });
      }
  });

  /**
   * Register a user with a username (email) and password.
   * If it already exists, then don't register, duh.
   *
   * body {
   *  email: email,
   *  password: password
   * }
   *
   */
  router.post('/register',
    function(req, res, next){
      // Register with an email and password
      var email = req.body.email;
      var password = req.body.password;
      UserController.createUser(email, password,
        function(err, user){
          if (err){
            return res.status(400).send(err);
          }
          return res.json(user);
      });
  });

  /**
   * Verify a user with a given token.
   */
   router.get('/verify/:token',
    function(req, res, next){
      var token = req.params.token;
      UserController.verifyByToken(token, function(err, user){

        if (err || !user){
          return res.status(400).send(err);
        }

        return res.json(user);

      });
    });

};
