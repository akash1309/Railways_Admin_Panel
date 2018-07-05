// routes/note_routes.js
const { Corrigendum } = require('./../../../models/Schema.js');

module.exports = function(req, res){

  var newCorrigendum = Corrigendum({
	  	corrigendum_number : req.body.corrigendum_number,
	    order_number :   	   req.body.order_number,
	    order_date : 		     req.body.order_date,
	    ic_id:            	 req.body.ic_id,
	    generated_by :       req.body.generated_by,
      remarks :            req.body.remarks,
      update_values   :    req.body.update_values
  });

  Corrigendum.findOne({
	  corrigendum_number: req.body.corrigendum_number
  },function(err, corrigendum) {
    if (err) {
      return res.status(500).send({
        "message" : "Error fetching Corrigendum!",
        "error" : err
      });
    }
    else if(corrigendum != null){
      return res.status(204).send({
        "message" : "Corrigendum with this id is already present!"
      });
    }
    else{
      newCorrigendum.save(function(err, corrigendum) {
        if (err) {
          return res.status(500).send({
            "message" : "Error in generating Corrigendum!",
            "error" : err
          });
        }
        else
          res.status(200).send(corrigendum);
      });
    }
  });
}
