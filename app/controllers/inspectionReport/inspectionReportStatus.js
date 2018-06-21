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
      return res.status(500).send({
        "message" : "Error fetching Inspection Report!",
        "error" : err
      });
    }
    else if(report != null){
      return res.status(204).send({
        "message" : "Inspection Report with this IC: "+req.body.ic_id+" and Order: "+req.body.order_number+" is already present"
      });
    }
    else{
      newInspectionReport.save(function(err, report) {
        if (err) {
          return res.status(500).send({
            "message" : "Error in generating inspection report!",
            "error" : err
          });
        }
        else
          res.status(200).send(report);
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
				"message" : "No Inspection Report found for order_no "+req.params.order_number+" and ic_id "+req.params.ic_id
			});
		}
		res.status(200).send(irInfo);
	})
	.catch(err => {

		return res.status(500).send({
			"message" : "Some error occured while extracting Inspection Report",
      "error" : err
		});

	});
}

exports.findAll = (req,res) => {

	InspectionReport.find()
	.then(irInfo => {
		if(irInfo.length == 0){
			return res.status(404).send({
				"message" : "No Inspection Report found"
			});
		}
		res.status(200).send(irInfo);
	})
	.catch(err => {

		return res.status(500).send({
			"message" : "Some error occured while extracting Inspection Report",
      "error" : err
		});

	});
}
