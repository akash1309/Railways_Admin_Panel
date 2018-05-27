// routes/note_routes.js
const { PurchaseOrder } = require('./../models/Schema.js');

module.exports = function(req, res){

  var newPurchaseOrder = PurchaseOrder({
    order_number:    req.body.order_number,
    order_date:     req.body.order_date,
    storeofficer_id : req.body.storeofficer_id,
    itemdetails: req.body.itemdetails,
    vendor_info: req.body.vendor_info,
    tender_info: req.body.tender_info
  });

  PurchaseOrder.findOne({
    order_number: req.body.order_number
  },function(err, order) {
    if (err) {
      res.send('Error fetching PurchaseOrder!');
    }
    else if(order != null){
      res.send('PurchaseOrder already present');
    }
    else{
      newPurchaseOrder.save(function(err, order) {
        if (err) {
          res.send('Error in ordering item!');
        }
        else
          res.send(order);
      });
    }
  });
}
