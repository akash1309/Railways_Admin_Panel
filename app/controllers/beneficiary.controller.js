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
// Create and Save a new Beneficiary
exports.create = (req, res) => {

  let response = new Response({
    headers: { }
  });

  let request = new Request(req);

  oauth.authenticate(request, response)
    .then((token) => {


      // Validate request
      if(!req.body.PUID) {
          return res.status(400).send({
              message: "PUID can not be empty"
          });
      }
      else if(!req.body.Name) {
          return res.status(400).send({
              message: "Name can not be empty"
          });
      }
      else if(!req.body.eMail) {
          return res.status(400).send({
              message: "EMail can not be empty"
          });
      }

      // Create a Beneficiary
      const beneficiary = new Beneficiary({
          PUID: req.body.PUID,
          BUID: req.body.BUID || "Nill",
          Name: req.body.Name,
          eMail: req.body.eMail,
          phoneNumber: req.body.phoneNumber || "Nill",
          isBlocked: req.body.isBlocked || "0",
          otherInfo: req.body.otherInfo || "Nill",
          extraInfo: req.body.extraInfo || "Nill"
      });

      // Save Beneficiary in the database
      beneficiary.save()
      .then(data => {
          res.send(data);
      }).catch(err => {
          res.status(500).send({
              message: err.message || "Some error occurred while creating the Beneficiary."
          });
      });

    })
    .catch((err) => {
      res.send('Invalid Token')
    });
};

// Retrieve and return all Beneficiary from the database.
exports.findAll = (req, res) => {

  let response = new Response({
    headers: { }
  });

  let request = new Request(req);

  oauth.authenticate(request, response)
    .then((token) => {

    Beneficiary.find()
    .then(beneficiary => {
        res.send(beneficiary);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Beneficiary."
        });
    });

  })
  .catch((err) => {
    res.send('Invalid Token')
  });
};

// Find a single Beneficiary with a BeneficiaryId
exports.findOne = (req, res) => {

  let response = new Response({
    headers: { }
  });

  let request = new Request(req);

  oauth.authenticate(request, response)
    .then((token) => {

    Beneficiary.findById(req.params.beneficiaryId)
    .then(beneficiary => {
        if(!beneficiary) {
            return res.status(404).send({
                message: "Beneficiary not found with id " + req.params.beneficiaryId
            });
        }
        res.send(beneficiary);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Beneficiary not found with Beneficiaryid " + req.params.beneficiaryId
            });
        }
        return res.status(500).send({
            message: "Error retrieving Beneficiary with Beneficiaryid " + req.params.beneficiaryId
        });
    });

  })
  .catch((err) => {
    res.send('Invalid Token')
  });
};

// Find a single Beneficiary with an UID
exports.findSome = (req, res) => {

  let response = new Response({
    headers: { }
  });

  let request = new Request(req);

  oauth.authenticate(request, response)
    .then((token) => {

    Beneficiary.find({PUID: req.params.UID})
    .then(beneficiary => {
        if(!beneficiary) {
            return res.status(404).send({
                message: "Beneficiary not found with id " + req.params.UID
            });
        }
        res.send(beneficiary);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Beneficiary not found with Beneficiaryid " + req.params.UID
            });
        }
        return res.status(500).send({
            message: "Error retrieving Beneficiary with Beneficiaryid " + req.params.UID
        });
    });

  })
  .catch((err) => {
    res.send('Invalid Token')
  });
};

// Update a Beneficiary identified by the BeneficiaryId in the request
exports.update = (req, res) => {

  let response = new Response({
    headers: { }
  });

  let request = new Request(req);

  oauth.authenticate(request, response)
    .then((token) => {

    // Validate Request
    if(!req.body.PUID) {
        return res.status(400).send({
            message: "PUID can not be empty"
        });
    }
    else if(!req.body.Name) {
        return res.status(400).send({
            message: "Name can not be empty"
        });
    }
    else if(!req.body.eMail) {
        return res.status(400).send({
            message: "EMail can not be empty"
        });
    }

    // Find Beneficiary and update it with the request body
    Beneficiary.findByIdAndUpdate(req.params.beneficiaryId, {
        PUID: req.body.PUID,
        BUID: req.body.BUID || "Nill",
        Name: req.body.Name,
        eMail: req.body.eMail,
        phoneNumber: req.body.phoneNumber || "Nill",
        isBlocked: req.body.isBlocked || "0",
        otherInfo: req.body.otherInfo || "Nill",
        extraInfo: req.body.extraInfo || "Nill"
    }, {new: true})
    .then(beneficiary => {
        if(!beneficiary) {
            return res.status(404).send({
                message: "Beneficiary not found with Beneficiaryid " + req.params.beneficiaryId
            });
        }
        res.send(beneficiary);
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Beneficiary not found with Beneficiaryid " + req.params.beneficiaryId
            });
        }
        return res.status(500).send({
            message: "Error updating Beneficiary with Beneficiaryid " + req.params.beneficiaryId
        });
    });

  })
  .catch((err) => {
    res.send('Invalid Token')
  });
};

// Delete a Beneficiary with the specified BeneficiaryId in the request
exports.delete = (req, res) => {
  
  let response = new Response({
    headers: { }
  });

  let request = new Request(req);

  oauth.authenticate(request, response)
    .then((token) => {

    Beneficiary.findByIdAndRemove(req.params.beneficiaryId)
    .then(beneficiary => {
        if(!beneficiary) {
            return res.status(404).send({
                message: "Beneficiary not found with id " + req.params.beneficiaryId
            });
        }
        res.send({message: "Beneficiary deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Beneficiary not found with Beneficiaryid " + req.params.beneficiaryId
            });
        }
        return res.status(500).send({
            message: "Could not delete Beneficiary with Beneficiaryid " + req.params.beneficiaryId
        });
    });

  })
  .catch((err) => {
    res.send('Invalid Token')
  });
};
