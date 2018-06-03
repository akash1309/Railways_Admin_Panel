const { StoreOfficer } = require('./../../../models/Schema.js');

exports.findAll = (req,res) => {
  StoreOfficer.find({})
  .then(StoreOfficerInfo => {
       if(StoreOfficerInfo.length == 0) {
         return res.status(404).send(
           {
             message : "No StoreOfficer found."
           }
         );
       }
         res.send(StoreOfficerInfo);


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
