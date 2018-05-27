// OauthServer
const OAuth2Server       = require('oauth2-server');
const AccessDeniedError  = require('oauth2-server/lib/errors/access-denied-error');
const Request            = OAuth2Server.Request;
const Response           = OAuth2Server.Response;

// routes/note_routes.js
var OAuthUsersModel = require('./../models/oauthusers');

const oauth = new OAuth2Server({
  model: require('./../models/model.js'),
  grants: ['password'],
  debug: true
});

module.exports = function(req, res){

  var newUser = OAuthUsersModel({
    email:  req.body.email,
    name: req.body.firstname,
    password: req.body.password,
    mobile: req.body.username
  });

  OAuthUsersModel.findOne({
    email: req.body.email
  },function(err, user) {
    if (err) {
      res.send('Error fetching User!');
    }
    else if(user != null){
      res.send('User already present');
    }
    else{
      newUser.save(function(err, user) {
        if (err) {
          res.send('Error in registration!');
        }
        else
          res.send(user);
      });
    }
  });
}
