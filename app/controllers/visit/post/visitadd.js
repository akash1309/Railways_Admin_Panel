// routes/note_routes.js
const { Visit } = require('./../../../models/Schema.js');

module.exports = function(req, res){

  var newVisit = Visit({
    inspector_id:   req.body.inspector_id,
    date:           req.body.date,
    time :          req.body.time,
    order_number :  req.body.order_number,
    visit_status :  req.body.visit_status,
    vendor_code :   req.body.vendor_code
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
