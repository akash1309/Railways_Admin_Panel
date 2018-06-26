// routes/note_routes.js
const { InspectionCertificate } = require('./../../../models/Schema.js');

module.exports = function(req, res){

  var newInspectionCertificate = InspectionCertificate({
	  order_number :      req.body.order_number,
	  quantity_offered:   req.body.quantity_offered,
	  quantity_approved:  req.body.quantity_approved,
	  location_of_seal :  req.body.location_of_seal,
	  inspection_date :   req.body.inspection_date,
	  ic_signed_on :	    req.body.ic_signed_on,
	  inspector_name :    req.body.inspector_name,
	  inspector_mobile:	  req.body.inspector_mobile
  });

  InspectionCertificate.findOne({
    order_number: req.body.order_number
  },function(err, certificate) {
    if (err) {
      return res.status(500).send({
        "message" : "Error fetching Inspection Certificate!",
        "error" : err
      });
    }
    else if(certificate != null){
      return res.status(204).send({
        "message" : "Inspection certificate with this order id is already present"
      });
    }
    else{
      newInspectionCertificate.save(function(err, certificate) {
        if (err) {
          return res.status(500).send({
            "message" : "Error in generating inspection certificate!",
            "error" : err
          });
        }
        else
          res.status(200).send(certificate);
      });
    }
  });
}
