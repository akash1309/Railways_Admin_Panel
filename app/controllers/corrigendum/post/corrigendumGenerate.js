// routes/note_routes.js
const { Corrigendum } = require('./../../../models/Schema.js');

module.exports = function(req, res){

  var newCorrigendum = Corrigendum({
	  	corrigendum_number : req.body.corrigendum_number,
	    order_number :   	 req.body.order_number,
	    order_date : 		 req.body.order_date,
	    ic_id:            	 req.body.ic_id,
	    ic_date :  			 req.body.ic_date,
	    inspector_name :  	 req.body.inspector_name,
	    inspector_mobile :	 req.body.inspector_mobile
  });

  Corrigendum.findOne({
	  corrigendum_number: req.body.corrigendum_number
  },function(err, corrigendum) {
    if (err) {
      res.send('Error fetching Corrigendum!');
    }
    else if(corrigendum != null){
      res.send('Corrigendum with this id is already present');
    }
    else{
      newCorrigendum.save(function(err, corrigendum) {
        if (err) {
          res.send('Error in generating corrigendum!');
          throw err;
        }
        else
          res.send(corrigendum);
      });
    }
  });
}
