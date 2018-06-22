const { PurchaseOrder } = require("./../../models/Schema");

exports.delPO = (req,res) => {

  PurchaseOrder.find({ order_number : req.body.order_number })
  .then(POInfo => {

      if(POInfo.length != 0)
      {
        return delUserFunc(req,res,req.body.order_number);
      }
      else {
        return res.status(404).send({
              "message" : "Purchase Order to be deleted is not present!"
            });
      }


  })
  .catch(err => {
    return res.status(500).send({
      "message": "Error occurred while fetching Purchase Order.",
      "error" : err
    });

  });

}

function delUserFunc(req,res)
{
    PurchaseOrder.remove({ order_number : req.body.order_number},
      function(err,response){

        if(err){
          return res.status(500).send({
           "error" : err,
           "message" : "Error in deletion!"
          });
          }
        else {
           console.log(response);
            return res.status(200).send({
              "message" : "Successfully removed..."
            });
          }

        });
  }
