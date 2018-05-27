// routes/note_routes.js
const { StoreOfficer } = require('./../models/Schema.js');

module.exports = function(req, res){

  var newStoreOfficer = StoreOfficer({
    email:    req.body.email,
    name:     req.body.name,
    mobile: req.body.mobile,
    dycee_id:   req.body.dycee_id
  });

  StoreOfficer.findOne({
    mobile: req.body.mobile
  },function(err, user) {
    if (err) {
      res.send('Error fetching User!');
    }
    else if(user != null){
      res.send('StoreOfficer already present');
    }
    else{
    	newStoreOfficer.save(function(err, user) {
        if (err) {
          res.send('Error in registration!');
        }
        else
          res.send(user);
      });
    }
  });
}
