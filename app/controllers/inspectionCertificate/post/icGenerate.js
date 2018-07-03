// routes/note_routes.js
const { InspectionCertificate } = require('./../../../models/Schema.js');

module.exports = function(req, res){

  var newInspectionCertificate = InspectionCertificate({
	  order_number :      req.body.order_number,
    remarks :           req.body.remarks,
	  quantity_offered:   req.body.quantity_offered,
	  quantity_approved:  req.body.quantity_approved,
	  location_of_seal :  req.body.location_of_seal,
	  inspection_date :   req.body.inspection_date,
	  ic_signed_on :	    req.body.ic_signed_on,
	  inspector_name :    req.body.inspector_name,
	  inspector_mobile:	  req.body.inspector_mobile,
    quantity_on_order : req.body.quantity_on_order,
    quantity_supplied_so_far : req.body.quantity_supplied_so_far,
    balance_quantity : req.body.balance_quantity,
    unit_price :       req.body.unit_price,
    materials_offered_date : req.body.materials_offered_date
  });

  newInspectionCertificate.save(function(err, certificate) {
    if (err) {
      return res.status(500).send({
        "message" : "Error in generating inspection certificate!",
        "error" : err
      });
    }
    else
    {
      console.log(certificate);
      res.status(200).send(certificate);
    }
  });

}
