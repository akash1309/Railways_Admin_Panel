// routes/note_routes.js
const { PurchaseOrder } = require('./../../../models/Schema.js');

module.exports = function(req, res){

  var newPurchaseOrder = PurchaseOrder({
    order_number:   	 req.body.order_number,
    order_date:     	 req.body.order_date,
    storeofficer_id :  req.body.storeofficer_id,
    itemdetails: 		   req.body.itemdetails,
    vendor_info: 		   req.body.vendor_info,
    tender_info: 		   req.body.tender_info,
    offer_no:			     req.body.offer_no,
    offer_date:		     req.body.offer_date,
    status:            req.body.status
  });

  PurchaseOrder.findOne({
    order_number: req.body.order_number
  },function(err, order) {
    if (err) {
      return res.status(500).send({
        "message" : "Error fetching PurchaseOrder!",
        "error" : err
      });
    }
    else if(order != null){
      return res.status(204).send({
        "message" : "PurchaseOrder is already present!"
      });
    }
    else{
      newPurchaseOrder.save(function(err, order) {
        if (err) {
          return res.status(500).send({
            "message" : "Error in ordering item!",
            "error" :  err
          });
        }
        else
          res.status(200).send(order);
      });
    }
  });
}
