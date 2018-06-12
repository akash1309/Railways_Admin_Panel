// routes/note_routes.js
const { Logins } = require('./../../../models/Schema.js');

module.exports = function(req, res){

  var newInspector = Logins({
    email:    req.body.email,
    name:     req.body.name,
    mobile:   req.body.mobile,
    dycee_id: req.body.dycee_id,
    role:     req.body.role,
    location:   req.body.location
  });

  Logins.findOne({
    mobile: req.body.mobile
  },function(err, user) {
    if (err) {
      res.status(500).send('Error fetching User!');
    }
    else if(user != null){
      res.status(500).send('Inspector already present');
    }
    else{
      newInspector.save(function(err, user) {
        if (err) {
          res.status(500).send('Error in registration!');
        }
        else
          res.status(200).send(user);
      });
    }
  });
}
