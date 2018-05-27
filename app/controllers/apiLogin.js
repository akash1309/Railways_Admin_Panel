// OauthServer
const OAuth2Server       = require('oauth2-server');
const AccessDeniedError  = require('oauth2-server/lib/errors/access-denied-error');
const Request            = OAuth2Server.Request;
const Response           = OAuth2Server.Response;

// routes/note_routes.js
var OAuthTokensModel = require('./../models/oauthtokens');

const oauth = new OAuth2Server({
  model: require('./../models/model.js'),
  grants: ['password'],
  debug: true
});

module.exports = function(req, res){
  let response = new Response({
      headers: { }
  });

  let request = new Request({
      method: 'POST',
      query: {},
      headers: {},
      body: {
          client_id: 'LoanTrack',
          client_secret: '123',
          grant_type: 'password',
          email: req.body.email,
          password: req.body.password,
      }
  });

  let options = {
    requireClientAuthentication: { password: false },
    accessTokenLifetime: 3600
  };

  OAuthTokensModel.findOne({
    "user.email": req.body.email,
    "user.password": req.body.password
  },
  function(err, user) {
    if (err) {
      res.send('Error in fetching User!');
    }
    else if(user != null){
      res.send({ accessToken: user.accessToken});
    }
    else{

      oauth.token(request, response, options)
        .then((token) => {
          // The resource owner granted the access request.
          res.send({ accessToken: token.accessToken})
        })
        .catch((err) => {
          // The request was invalid or not authorized.
          console.log(err);
          res.send('Token not generated!');
      });
    }

  });
}
