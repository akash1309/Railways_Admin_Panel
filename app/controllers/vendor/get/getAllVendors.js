const { Logins } = require('./../../../models/Schema.js');

exports.findAll = (req,res) => {
  Logins.find({ role : "Vendor"})
  .then(vendorInfo => {
       if(vendorInfo.length == 0) {
         return res.status(404).send(
           {
             message : "NO VENDOR FOUND"
           }
         );
       }
         res.status(200).send(vendorInfo);


  })
  .catch(err => {
      if (err.kind =='ObjectId'){
          return res.status(404).send(
            {
              message : "NO VENDOR FOUND"
            }
          );
      }
     return res.status(500).send({
       message : "error occured while fetching vendor info"
     })

  });






}
