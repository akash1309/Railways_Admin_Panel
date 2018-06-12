const { Logins } = require('./../../../models/Schema.js');

exports.findAll = (req,res) => {
  Logins.find({ role : "StoreOfficer"})
  .then(StoreOfficerInfo => {
       if(StoreOfficerInfo.length == 0) {
         return res.status(404).send(
           {
             message : "No StoreOfficer found."
           }
         );
       }
         res.status(200).send(StoreOfficerInfo);


  })
  .catch(err => {
      if (err.kind =='ObjectId'){
          return res.status(404).send(
            {
              message : "No StoreOfficer found."
            }
          );
      }
     return res.status(500).send({
       message : "Error occured while fetching storeofficer info"
     });

  });

}
