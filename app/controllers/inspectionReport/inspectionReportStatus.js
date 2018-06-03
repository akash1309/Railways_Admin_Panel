// routes/note_routes.js
const { InspectionReport } = require('./../../models/Schema.js');

exports.setIrStatus = (req, res) => {

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

exports.getIrStatus = (req,res) => {

	InspectionReport.find({
		order_number : req.params.order_number,
		ic_id : req.params.ic_id
	})
	.then(irInfo => {
		if(irInfo.length == 0){
			return res.status(404).send({
				message : "1 No Inspection Report found for order_no "+req.params.order_number+" and ic_id "+req.params.ic_id
			});
		}
		res.send(irInfo);
	})
	.catch(err => {
		if(err.kind == 'ObjectId') {
            return res.status(404).send({
                message: "2 No inspection report found for order_no "+req.params.order_number+" and ic_id "+req.params.ic_id
            });
        }
		return res.status(500).send({
			message : "Some error occured while extracting Inspection Report"
		});

	});
}
