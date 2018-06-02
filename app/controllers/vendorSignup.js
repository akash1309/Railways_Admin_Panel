// routes/note_routes.js
const { Vendor } = require('./../models/Schema.js');

module.exports = function(req, res){

  var newVendor = Vendor({
    email:             req.body.email,
    name:              req.body.name,
    mobile:            req.body.mobile,
    storeofficer_id:   req.body.storeofficer_id
  });

  Vendor.findOne({
    mobile: req.body.mobile
  },function(err, user) {
    if (err) {
      res.send('Error fetching User!');
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
          res.send(user);
      });
    }
  });
}
