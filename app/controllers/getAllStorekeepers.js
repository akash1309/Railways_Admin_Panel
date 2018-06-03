const { storekeeper } = require('./../models/Schema.js');

exports.findAll = (req,res) => {
  Storekeeper.find({})
  .then(storekeeperInfo => {
       if(storekeeperInfo.length == 0) {
         return res.status(404).send(
           {
             message : "NO STOREKEEPER FOUND"
           }
         );
       }
         res.send(storekeeperInfo);


  })
  .catch(err => {
      if (err.kind =='ObjectId'){
          return res.status(404).send(
            {
              message : "NO STOREKEEPER FOUND"
            }
          );
      }
     return res.status(500).send({
       message : "error occured while fetching storekeeper info"
     })

  });
