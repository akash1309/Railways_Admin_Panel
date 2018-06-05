// routes/note_routes.js
const { Logins } = require('./../../../models/Schema.js');

module.exports = function(req, res){

  var newCEE = Logins({
    email:    req.body.email,
    name:     req.body.name,
    password: req.body.password,
    mobile:   req.body.mobile,
    role:     req.body.role
  });

  Logins.findOne({
    mobile: req.body.mobile
  },function(err, user) {
    if (err) {
      res.status(500).send('Error fetching User!');
    }
    else if(user != null){
      res.send('CEE already present');
    }
    else{
      newCEE.save(function(err, user) {
        if (err) {
          res.send('Error in registration!');
        }
        else
          res.status(200).send(user);
      });
    }
  });
}
