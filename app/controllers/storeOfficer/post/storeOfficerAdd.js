// routes/note_routes.js
const { Logins } = require('./../../../models/Schema.js');

module.exports = function(req, res){

  var newStoreOfficer = Logins({
    email:      req.body.email,
    name:       req.body.name,
    mobile:     req.body.mobile,
    dycee_id:   req.body.dycee_id,
    role:       req.body.role,
    location:   req.body.location
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
        "message" : "StoreOfficer is already present!"
      });
    }
    else{
    	newStoreOfficer.save(function(err, user) {
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
