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
      res.status(500).send('Error fetching User!');
    }
    else if(user != null){
      res.send('Vendor already present');
    }
    else{
      newVendor.save(function(err, user) {
        if (err) {
          res.send('Error in registration!');
        }
        else
          res.status(200).send(user);
      });
    }
  });
}
