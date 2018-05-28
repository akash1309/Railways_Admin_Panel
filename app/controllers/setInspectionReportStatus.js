// routes/note_routes.js
const { InspectionReport } = require('./../models/Schema.js');

module.exports = function(req, res){

  var newInspectionReport = InspectionReport({
	  order_number : req.body.order_number,
	  ic_id:         req.body.ic_id,
	  status:        req.body.status
  });

  InspectionReport.findOne({
	  order_number : req.body.order_number,
	  ic_id:         req.body.ic_id
  },function(err, report) {
    if (err) {
      res.send('Error fetching Inspection Report!');
    }
    else if(report != null){
      res.send('Inspection Report with this IC: '+req.body.ic_id+' and Order: '+req.body.order_number+' is already present');
    }
    else{
      newInspectionReport.save(function(err, report) {
        if (err) {
          res.send('Error in generating inspection report!');
          throw err;
        }
        else
          res.send(report);
      });
    }
  });
}
