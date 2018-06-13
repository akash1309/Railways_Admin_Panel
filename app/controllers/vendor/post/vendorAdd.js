// routes/note_routes.js
const { Logins } = require('./../../../models/Schema.js');

module.exports = function(req, res){

  var newVendor = Logins({
    email:             req.body.email,
    name:              req.body.name,
    mobile:            req.body.mobile,
    storeofficer_id:   req.body.storeofficer_id,
    role:              req.body.role,
    location:          req.body.location
  });

  Logins.findOne({
    mobile: req.body.mobile
  },function(err, user) {
    if (err) {
      return res.status(500).send({
        "message" : "Error fetching User!",
        "error" : err
      });
    }
    else if(user != null){
      return res.status(204).send({
        "message" : "Vendor is already present!"
      });
    }
    else{
      newVendor.save(function(err, user) {
        if (err) {
          return res.status(500).send({
            "message" : "Error in registration!",
            "error" : err
          });
        }
        else
          res.status(200).send(user);
      });
    }
  });
}
