// routes/note_routes.js
const { Inspector } = require('./../../../models/Schema.js');

module.exports = function(req, res){

  var newInspector = Inspector({
    email:    req.body.email,
    name:     req.body.name,
    mobile:   req.body.mobile,
    dycee_id: req.body.dycee_id,
    cee_id:   req.body.cee_id
  });

  Inspector.findOne({
    mobile: req.body.mobile
  },function(err, user) {
    if (err) {
      res.send('Error fetching User!');
    }
    else if(user != null){
      res.send('Inspector already present');
    }
    else{
      newInspector.save(function(err, user) {
        if (err) {
          res.send('Error in registration!');
        }
        else
          res.send(user);
      });
    }
  });
}
