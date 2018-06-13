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
      return res.status(500).send({
        "message" : "Error fetching User!",
        "error" : err
      });
    }
    else if(user != null){
      return res.status(204).send({
        "message" : "CEE already present!"
      });
    }
    else{
      newCEE.save(function(err, user) {
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
