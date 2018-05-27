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
// Create and Save a new Transaction
exports.create = (req, res) => {

  let response = new Response({
    headers: { }
  });

  let request = new Request(req);

  oauth.authenticate(request, response)
    .then((token) => {

    // Validate request
    if(!req.body.PostedUID) {
        return res.status(400).send({
            message: "PostedUID can not be empty"
        });
    }
    else if(!req.body.LUID) {
        return res.status(400).send({
            message: "LUID can not be empty"
        });
    }
    else if(!req.body.BOUID) {
        return res.status(400).send({
            message: "BOUID can not be empty"
        });
    }
    else if(!req.body.PAmount) {
        return res.status(400).send({
            message: "PAmount can not be empty"
        });
    }    else if(!req.body.Type) {
        return res.status(400).send({
            message: "Type can not be empty"
        });
    }    else if(!req.body.TDate) {
        return res.status(400).send({
            message: "TDate can not be empty"
        });
    }    else if(!req.body.TotalAmount) {
        return res.status(400).send({
            message: "TotalAmount can not be empty"
        });
    }
    // Create a Transaction
    const transaction = new Transaction({
        PostedUID: req.body.PostedUID,
        LUID: req.body.LUID,
        BOUID: req.body.BOUID,
        PAmount: req.body.PAmount,
        Type: req.body.Type,
        InterestRate: req.body.InterestRate || "0",
        InterestDuration: req.body.InterestDuration || "Nill",
        InterestType: req.body.InterestType || "Nill",
        TDate: req.body.TDate,
        Medium: req.body.Medium || "Nill",
        PromiseDate: req.body.PromiseDate || "Nill",
        Mortagage: req.body.Mortagage || "Nill",
        TotalAmount: req.body.TotalAmount,
        ImageUrl: req.body.ImageUrl || "Nill",
        Locations: req.body.Locations || "Nill",
        Remarks: req.body.Remarks || "Nill",
        SettleUp: req.body.SettleUp || "0",
        SettleUpDate: req.body.SettleUpDate || "Nill",
        isTBlocked: req.body.isTBlocked || "0",
        deleted: req.body.deleted || "0",
        otherInfo: req.body.otherInfo || "Nill",
        extraInfo: req.body.extraInfo || "Nill"
    });

    // Save Transaction in the database
    transaction.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Transaction."
        });
    });
  })
  .catch((err) => {
    res.send('Invalid Token')
  });
};

// Retrieve and return all Transaction from the database.
exports.findAll = (req, res) => {

  let response = new Response({
    headers: { }
  });

  let request = new Request(req);

  oauth.authenticate(request, response)
    .then((token) => {

    Transaction.find()
    .then(transaction => {
        res.send(transaction);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Transaction."
        });
    });
  })
  .catch((err) => {
    res.send('Invalid Token')
  });
};

// Find a single Transaction with a TransactionId
exports.findOne = (req, res) => {

  let response = new Response({
    headers: { }
  });

  let request = new Request(req);

  oauth.authenticate(request, response)
    .then((token) => {

    Transaction.findById(req.params.transactionId)
    .then(transaction => {
        if(!transaction) {
            return res.status(404).send({
                message: "Transaction not found with TransactionId " + req.params.transactionyId
            });
        }
        res.send(transaction);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Transaction not found with TransactionId " + req.params.transactionyId
            });
        }
        return res.status(500).send({
            message: "Error retrieving Transaction with TransactionId " + req.params.transactionyId
        });
    });
  })
  .catch((err) => {
    res.send('Invalid Token')
  });
};

// Find a single Transaction with an UID
exports.findSome = (req, res) => {

  let response = new Response({
    headers: { }
  });

  let request = new Request(req);

  oauth.authenticate(request, response)
    .then((token) => {

    Transaction.find({PostedUID: req.params.UID})
    .then(transaction => {
        if(!transaction) {
            return res.status(404).send({
                message: "Transaction not found with UID" + req.params.UID
            });
        }
        res.send(transaction);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Transaction not found with UID" + req.params.UID
            });
        }
        return res.status(500).send({
            message: "Error retrieving Transaction with UID" + req.params.UID
        });
    });
  })
  .catch((err) => {
    res.send('Invalid Token')
  });
};

// Update a Transaction identified by the transactionyId in the request
exports.update = (req, res) => {

  let response = new Response({
    headers: { }
  });

  let request = new Request(req);

  oauth.authenticate(request, response)
    .then((token) => {

    // Validate Request
    if(!req.body.PostedUID) {
        return res.status(400).send({
            message: "PostedUID can not be empty"
        });
    }
    else if(!req.body.LUID) {
        return res.status(400).send({
            message: "LUID can not be empty"
        });
    }
    else if(!req.body.BOUID) {
        return res.status(400).send({
            message: "BOUID can not be empty"
        });
    }
    else if(!req.body.PAmount) {
        return res.status(400).send({
            message: "PAmount can not be empty"
        });
    }    else if(!req.body.Type) {
        return res.status(400).send({
            message: "Type can not be empty"
        });
    }    else if(!req.body.TDate) {
        return res.status(400).send({
            message: "TDate can not be empty"
        });
    }    else if(!req.body.TotalAmount) {
        return res.status(400).send({
            message: "TotalAmount can not be empty"
        });
    }

    // Find Transaction and update it with the request body
    Transaction.findByIdAndUpdate(req.params.transactionId, {
        PostedUID: req.body.PostedUID,
        LUID: req.body.LUID,
        BOUID: req.body.BOUID,
        PAmount: req.body.PAmount,
        Type: req.body.Type,
        InterestRate: req.body.InterestRate || "0",
        InterestDuration: req.body.InterestDuration || "Nill",
        InterestType: req.body.InterestType || "Nill",
        TDate: req.body.TDate,
        Medium: req.body.Medium || "Nill",
        PromiseDate: req.body.PromiseDate || "Nill",
        Mortagage: req.body.Mortagage || "Nill",
        TotalAmount: req.body.TotalAmount,
        ImageUrl: req.body.ImageUrl || "Nill",
        Locations: req.body.Locations || "Nill",
        Remarks: req.body.Remarks || "Nill",
        SettleUp: req.body.SettleUp || "0",
        SettleUpDate: req.body.SettleUpDate || "Nill",
        isTBlocked: req.body.isTBlocked || "0",
        deleted: req.body.deleted || "0",
        otherInfo: req.body.otherInfo || "Nill",
        extraInfo: req.body.extraInfo || "Nill",
    }, {new: true})
    .then(transaction => {
        if(!transaction) {
            return res.status(404).send({
                message: "Transaction not found with transactionId " + req.params.transactionId
            });
        }
        res.send(transaction);
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Transaction not found with transactionId " + req.params.transactionId
            });
        }
        return res.status(500).send({
            message: "Error updating Transaction with transactionId " + req.params.transactionId
        });
    });
  })
  .catch((err) => {
    res.send('Invalid Token')
  });
};

// Delete a Transaction with the specified transactionyId in the request
exports.delete = (req, res) => {

  let response = new Response({
    headers: { }
  });

  let request = new Request(req);

  oauth.authenticate(request, response)
    .then((token) => {

    Transaction.findByIdAndRemove(req.params.transactionId)
    .then(transaction => {
        if(!transaction) {
            return res.status(404).send({
                message: "Transaction not found with id " + req.params.transactionId
            });
        }
        res.send({message: "Transaction deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Transaction not found with transactionId " + req.params.transactionId
            });
        }
        return res.status(500).send({
            message: "Could not delete Transaction with transactionyId " + req.params.transactionyId
        });
    });
  })
  .catch((err) => {
    res.send('Invalid Token')
  });
};
