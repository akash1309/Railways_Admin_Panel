const { InspectionCertificate } = require("./../../../models/Schema");

exports.updateIC = (req,res) => {

  InspectionCertificate.find({ _id : req.body.ic_id , order_number : req.body.order_number })
  .then(ICInfo => {

    if(ICInfo.length != 0) {
          return updateIC(req,res);
        }

    else {
        return res.status(204).send({
              "message" : "IC to be updated is not present!"
            });

    }

  })
  .catch(err => {
    return res.status(500).send({
      "message": "Error occurred while fetching IC.",
      "error" : err
    });

  });

}



function updateIC(req,res,order_number)
{
  var x = req.body;

    InspectionCertificate.update({ _id : req.body.ic_id , order_number : req.body.order_number },
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
            return res.status(200).send({
              "message" : "Successfully updated..."
            });
          }

        });
  }
