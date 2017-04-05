var User = require('./models/User');

module.exports = function(app) {

  // Application ------------------------------------------
  app.get('*', function(req, res){
    // Server side rendering will come later (?)
    res.sendFile("index.html", {root : __dirname});
  });

};
