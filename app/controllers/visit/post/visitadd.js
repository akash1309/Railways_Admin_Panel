// routes/note_routes.js
const { Visit } = require('./../../../models/Schema.js');

module.exports = function(req, res){

  var newVisit = Visit({
    email:      req.body.email,
    name:       req.body.name,
    mobile:     req.body.mobile,
    date:       req.body.date,
    time :      req.body.time,
    location:   req.body.location,
    order_number : req.body.order_number
  });

  Visit.findOne({
    order_number: req.body.order_number
  },function(err, user) {
    if (err) {
      return res.status(500).send({
        "message" : "Error fetching Visit Information!",
        "error" : err
      });
    }
    else if(user != null){
      return res.status(204).send({
        "message" : "Visit is already present!"
      });
    }
    else{
    	newVisit.save(function(err, user) {
        if (err) {
          return res.status(500).send({
            "message" : "Error in setting visit!",
            "error" : err
          });
        }
        else
          res.status(200).send(user);
      });
    }
  });
}
