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

const { Beneficiary, Transaction, UserNotification, PromotionalNotification } = require('../models/loan.model.js');
// Create and Save a new UserNotification
exports.create = (req, res) => {

  let response = new Response({
    headers: { }
  });

  let request = new Request(req);

  oauth.authenticate(request, response)
    .then((token) => {

    // Validate request
    if(!req.body.ActionUID) {
        return res.status(400).send({
            message: "ActionUID can not be empty"
        });
    }
    else if(!req.body.AffectedUID) {
        return res.status(400).send({
            message: "AffectedUID can not be empty"
        });
    }
    else if(!req.body.ActionMsg) {
        return res.status(400).send({
            message: "ActionMsg can not be empty"
        });
    }
    else if(!req.body.AffectedMsg) {
        return res.status(400).send({
            message: "AffectedMsg can not be empty"
        });
    }
    else if(!req.body.Icon) {
        return res.status(400).send({
            message: "Icon can not be empty"
        });
    }
    // Create a UserNotification
    const userNotification = new UserNotification({
        ActionUID: req.body.ActionUID,
        AffectedUID: req.body.AffectedUID,
        ActionMsg: req.body.ActionMsg,
        AffectedMsg: req.body.AffectedMsg,
        Icon: req.body.Icon,
        extraInfo: req.body.extraInfo || "Nill"
    });

    // Save UserNotification in the database
    userNotification.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the UserNotification."
        });
    });
  })
  .catch((err) => {
    res.send('Invalid Token')
  });
};

// Retrieve and return all UserNotification from the database.
exports.findAll = (req, res) => {

  let response = new Response({
    headers: { }
  });

  let request = new Request(req);

  oauth.authenticate(request, response)
    .then((token) => {

    UserNotification.find()
    .then(userNotification => {
        res.send(userNotification);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving UserNotification."
        });
    });
  })
  .catch((err) => {
    res.send('Invalid Token')
  });
};

// Find a single UserNotification with a UserNotificationId
exports.findOne = (req, res) => {

  let response = new Response({
    headers: { }
  });

  let request = new Request(req);

  oauth.authenticate(request, response)
    .then((token) => {

    UserNotification.findById(req.params.userNotificationId)
    .then(userNotification => {
        if(!userNotification) {
            return res.status(404).send({
                message: "UserNotification not found with id " + req.params.userNotificationId
            });
        }
        res.send(userNotification);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "UserNotification not found with userNotificationId " + req.params.userNotificationId
            });
        }
        return res.status(500).send({
            message: "Error retrieving UserNotification with userNotificationId " + req.params.userNotificationId
        });
    });
  })
  .catch((err) => {
    res.send('Invalid Token')
  });
};

// Find a single UserNotification with an UID
exports.findSome = (req, res) => {

  let response = new Response({
    headers: { }
  });

  let request = new Request(req);

  oauth.authenticate(request, response)
    .then((token) => {

    UserNotification.find({ActionUID: req.params.UID})
    .then(userNotification => {
        if(!userNotification) {
            return res.status(404).send({
                message: "UserNotification not found with id " + req.params.UID
            });
        }
        res.send(userNotification);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "UserNotification not found with UserNotificationid " + req.params.UID
            });
        }
        return res.status(500).send({
            message: "Error retrieving UserNotification with UserNotificationid " + req.params.UID
        });
    });
  })
  .catch((err) => {
    res.send('Invalid Token')
  });
};

// Update a UserNotification identified by the UserNotificationId in the request
exports.update = (req, res) => {

  let response = new Response({
    headers: { }
  });

  let request = new Request(req);

  oauth.authenticate(request, response)
    .then((token) => {

    // Validate Request
    if(!req.body.ActionUID) {
        return res.status(400).send({
            message: "ActionUID can not be empty"
        });
    }
    else if(!req.body.AffectedUID) {
        return res.status(400).send({
            message: "AffectedUID can not be empty"
        });
    }
    else if(!req.body.ActionMsg) {
        return res.status(400).send({
            message: "ActionMsg can not be empty"
        });
    }
    else if(!req.body.AffectedMsg) {
        return res.status(400).send({
            message: "AffectedMsg can not be empty"
        });
    }
    else if(!req.body.Icon) {
        return res.status(400).send({
            message: "Icon can not be empty"
        });
    }

    // Find UserNotification and update it with the request body
    UserNotification.findByIdAndUpdate(req.params.userNotificationId, {
        ActionUID: req.body.ActionUID,
        AffectedUID: req.body.AffectedUID,
        ActionMsg: req.body.ActionMsg,
        AffectedMsg: req.body.AffectedMsg,
        Icon: req.body.Icon,
        extraInfo: req.body.extraInfo || "Nill"
    }, {new: true})
    .then(userNotification => {
        if(!userNotification) {
            return res.status(404).send({
                message: "UserNotification not found with UserNotificationIdid " + req.params.userNotificationId
            });
        }
        res.send(userNotification);
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "UserNotification not found with UserNotificationIdid " + req.params.userNotificationId
            });
        }
        return res.status(500).send({
            message: "Error updating UserNotification with UserNotificationIdid " + req.params.userNotificationId
        });
    });
  })
  .catch((err) => {
    res.send('Invalid Token')
  });
};

// Delete a UserNotification with the specified UserNotificationId in the request
exports.delete = (req, res) => {

  let response = new Response({
    headers: { }
  });

  let request = new Request(req);

  oauth.authenticate(request, response)
    .then((token) => {
      
    UserNotification.findByIdAndRemove(req.params.userNotificationId)
    .then(userNotification => {
        if(!userNotification) {
            return res.status(404).send({
                message: "UserNotification not found with id " + req.params.userNotificationId
            });
        }
        res.send({message: "UserNotification deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "UserNotification not found with UserNotificationid " + req.params.userNotificationId
            });
        }
        return res.status(500).send({
            message: "Could not delete UserNotification with UserNotificationid " + req.params.userNotificationId
        });
    });
  })
  .catch((err) => {
    res.send('Invalid Token')
  });
};
