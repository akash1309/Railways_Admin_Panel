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

exports.getUser = function(req, res){

  let response = new Response({
    headers: { }
  });

  let request = new Request(req);

  oauth.authenticate(request, response)
    .then((token) => {

      OAuthUsersModel.find({
        _id: req.params.userId
      },function(err, user) {
        if (err) {
            res.send('No user found!');
        }
        else
            res.send(user);
      });

    })
    .catch((err) => {
      res.send('Invalid Token')
    });

}
