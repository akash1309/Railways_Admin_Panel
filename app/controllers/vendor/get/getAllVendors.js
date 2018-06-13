const { Logins } = require('./../../../models/Schema.js');

exports.findAll = (req,res) => {
  Logins.find({ role : "Vendor"})
  .then(vendorInfo => {
       if(vendorInfo.length == 0) {
         return res.status(404).send(
           {
             "message" : "No Vendor found!"
           });
       }
         res.status(200).send(vendorInfo);
  })
  .catch(err => {

     return res.status(500).send({
       "message" : "Error occured while fetching vendor info!",
       "error" : err
     })

  });






}
