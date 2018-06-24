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
  var x = req.body;

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
