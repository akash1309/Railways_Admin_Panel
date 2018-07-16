const { PurchaseOrder } = require("./../../models/Schema");
const { Logins } = require("./../../models/Schema");
const sendEmail = require('./../../service/EmailService.js');

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
           var options = {
             to : req.body.email,
             subject : "CWL Railways System",
             message : "Purchase order : "+req.body.order_number+" has been cancelled by StoreOfficer!!"
           };
           sendEmail(options);
           updateVendorPOCount(req);
            return res.status(200).send({
              "message" : "Successfully removed..."
            });
          }

        });
  }

  function updateVendorPOCount(req){

    Logins.findOne({ vendor_code : req.body.vendor_code})
    .then(VendorInfo => {

      if(VendorInfo.length != 0) {
        Logins.update({ vendor_code : req.body.vendor_code },
          { po_remaining : VendorInfo.po_remaining - 1},
          function(err,response){
            if(err){
              console.log(err);
              }
            else {
               console.log("po ",response);
              }
          }
        );
      }
      else {
          console.log("Vendor is not present");
      }
    })
    .catch(err => {
      console.log(err);
    });
  }
