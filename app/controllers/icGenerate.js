// routes/note_routes.js
const { InspectionCertificate } = require('./../models/Schema.js');

module.exports = function(req, res){

  var newInspectionCertificate = InspectionCertificate({
	  order_number :      req.body.order_number,
	  quantity_offered:   req.body.quantity_offered,
	  quantity_approved:  req.body.quantity_approved,
	  location :          req.body.location,
	  ic_id:              req.body.ic_id,
	  inspection_date :   req.body.inspection_date,
	  ic_signed_on :	  req.body.ic_signed_on,
	  inspector_name :    req.body.inspector_name,
	  inspector_mobile:	  req.body.inspector_mobile
  });

  InspectionCertificate.findOne({
    ic_id: req.body.ic_id
  },function(err, certificate) {
    if (err) {
      res.send('Error fetching Inspection Certificate!');
    }
    else if(certificate != null){
      res.send('Inspection certificate with this id is already present');
    }
    else{
      newInspectionCertificate.save(function(err, certificate) {
        if (err) {
          res.send('Error in generating inspection certificate!');
          throw err;
        }
        else
          res.send(certificate);
      });
    }
  });
}
