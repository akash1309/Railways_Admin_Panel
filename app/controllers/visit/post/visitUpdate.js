const { Visit } = require("./../../../models/Schema");

exports.updateVisit = (req,res) => {

  Visit.find({ vendor_code : req.body.vendor_code, order_number : req.body.order_number})
  .then(VisitInfo => {

    if(VisitInfo.length != 0) {
          return updateVisit(req,res);
        }

    else {
        return res.status(204).send({
              "message" : "Visit to be updated is not present!"
            });

    }

  })
  .catch(err => {
    console.log("inside1 "+err);
    return res.status(500).send({
      "message": "Error occurred while fetching visits.",
      "error" : err
    });

  });

}



function updateVisit(req,res)
{
  var x = req.body;

    Visit.update({ order_number : req.body.order_number , vendor_code : req.body.vendor_code},
      x,
      function(err,response){

        if(err){
          console.log("inside2 "+err);
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
