const { PurchaseOrder } = require("./../../../models/Schema");

exports.updatePO = (req,res) => {

  PurchaseOrder.find({ order_number : req.body.order_number})
  .then(POInfo => {

    if(POInfo.length != 0) {
          return updatePO(req,res,req.body.order_number);
        }

    else {
        return res.status(204).send({
              "message" : "purchase order to be updated is not present!"
            });

    }

  })
  .catch(err => {
    return res.status(500).send({
      "message": "Error occurred while fetching purchase order.",
      "error" : err
    });

  });

}



function updatePO(req,res,order_number)
{
  var x = {
    order_number :   req.body.order_number,
    order_date :     req.body.order_date,
    itemdetails :    req.body.itemdetails ,
    vendor_info :    req.body.vendor_info,
    tender_info :    req.body.tender_info,
    offer_no :       req.body.offer_no,
    offer_date :     req.body.offer_date,
    storeofficer_id :req.body.storeofficer_id
   };

    PurchaseOrder.update({ order_number : req.body.order_number },
      x,
      function(err,response){

        if(err){
          return res.status(500).send({
           "error" : err,
           "message" : "Error in updation!"
          });
          }
        else {
           console.log(response);
            return res.status(200).send({
              "message" : "Successfully updated..."
            });
          }

        });
  }
