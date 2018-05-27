// routes/note_routes.js
const { CEE } = require('./../models/Schema.js');

module.exports = function(req, res){

  var newCEE = CEE({
    email:    req.body.email,
    name:     req.body.name,
    password: req.body.password,
    mobile:   req.body.mobile
  });

  CEE.findOne({
    mobile: req.body.mobile
  },function(err, user) {
    if (err) {
      res.send('Error fetching User!');
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
          res.send(user);
      });
    }
  });
}
