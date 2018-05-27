// routes/note_routes.js
const { DyCEE } = require('./../models/Schema.js');

module.exports = function(req, res){

  var newDyCEE = DyCEE({
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
      res.send('Dy. CEE already present');
    }
    else{
      newDyCEE.save(function(err, user) {
        if (err) {
          res.send('Error in registration!');
        }
        else
          res.send(user);
      });
    }
  });
}
