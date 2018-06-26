const { Visit } = require("./../../../models/Schema");

exports.delVisit = (req,res) => {

  Visit.find({ order_number : req.body.order_number , vendor_code : req.body.vendor_code})
  .then(VisitInfo => {

      if(VisitInfo.length != 0)
      {
        return delVisitFunc(req,res);
      }
      else {
        return res.status(404).send({
              "message" : "Visit to be deleted is not present!"
            });
      }


  })
  .catch(err => {
    return res.status(500).send({
      "message": "Error occurred while fetching Visits.",
      "error" : err
    });

  });

}

function delVisitFunc(req,res)
{
    Visit.remove({ order_number : req.body.order_number, vendor_code : req.body.vendor_code},
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
