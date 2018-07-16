const { PurchaseOrder } = require("./../../../models/Schema");
const { Logins } = require("./../../../models/Schema");
const sendEmail = require('./../../../service/EmailService.js');


exports.updatePO = (req,res) => {

  console.log("updateinside"+req.body.order_number);
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
           var options = {
             to : req.body.email,
             subject : "CWL Railways System",
             message : ""
           };


           if(req.body.status == "Processed"){
             options.message = "Items have been processed by vendor for order number : "+req.body.order_number+"!!";
             sendEmail(options);
           }
           else if(req.body.status == "Assigned"){
             options.message = "You have been assigned to inspect the order : "+ req.body.order_number +"!!";
             sendEmail(options);
           }
           else if(req.body.status == "Amendment Inspector Nominated"){
             options.message = "Purchase Order : "+ req.body.order_number + " requires amendment. Generate Corrigendum !!";
             sendEmail(options);
           }
           else if(req.body.status == "Intimated"){
             options.message = "Inspector is visiting you for purchase order : " + req.body.order_number +". See details about visit on the website!!";
             sendEmail(options);
           }
           else if(req.body.status == "IR Partial"){
             options.message = "Inspection Report is partial for order number : "+req.body.order_number+" .Prepare the order again!!";
             sendEmail(options);
           }
           else if(req.body.status == "Rejected"){
             options.message = "Your items have failed to satisfy our criteria. Prepare the order : "+req.body.order_number+" again!!";
             sendEmail(options);
           }
           else if(req.body.status == "IC Generated"){
             options.message = "IC has been generated for order number : "+req.body.order_number+" . Dispatch the items!!";
             sendEmail(options);
           }
           else if(req.body.status == "Items Dispatched"){
             options.message = "Items have been dispatched for order number : "+req.body.order_number+"!!";
             sendEmail(options);
           }
           else if(req.body.status == "Items Accepted" || req.body.status == "Items Rejected"){
             options.message = req.body.status+" for order number : "+req.body.order_number+"!!";
             sendEmail(options);
           }
           else if(req.body.status == "Corrigendum Generated"){
             options.message = "Corrigendum has been generated for order number : "+req.body.order_number+"!!";
             sendEmail(options);
           }
           else if(req.body.status == "Amendment Requested"){
             options.message = "Amendment has been requested in IC by Vendor in order number : "+ req.body.order_number +"!!";
             sendEmail(options);
           }
           else if(req.body.status == "Finished"){
             options.message = "Purchase order number : "+req.body.order_number + " is finished!!";
             sendEmail(options);
             updateVendorPOCount(req);
           }
           else if(req.body.status == "Approved"){
             options.message = "Purchase order number : "+req.body.order_number + " is approved!!";
             sendEmail(options);
           }

            return res.status(200).send({
              "message" : "Successfully updated..."
            });
          }

        });
  }

  function updateVendorPOCount(req){

    console.log(req);
    Logins.findOne({ vendor_code : req.body.vendor_info.code})
    .then(VendorInfo => {

      if(VendorInfo.length != 0) {
        Logins.update({ vendor_code : req.body.vendor_info.code },
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
