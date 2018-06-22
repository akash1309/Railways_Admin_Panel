const { Items } = require("./../../models/Schema");

exports.delItems = (req,res) => {

  Items.find({ model_number : req.body.model_number })
  .then(ItemInfo => {

      if(ItemInfo.length != 0)
      {
        return delUserFunc(req,res,req.body.model_number);
      }
      else {
        return res.status(404).send({
              "message" : "Items to be deleted is not present!"
            });
      }


  })
  .catch(err => {
    return res.status(500).send({
      "message": "Error occurred while fetching item.",
      "error" : err
    });

  });

}

function delUserFunc(req,res)
{
    Items.remove({ model_number : req.body.model_number},
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
