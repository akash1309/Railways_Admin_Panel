const { Visit } = require('./../../../models/Schema.js');

exports.findVisitbyVendor = (req,res) => {
  Visit.find({ vendor_code : req.params.vendor_code , visit_status : 'Intimated'})
  .populate('inspector_id')
  .then(visitInfo => {
         res.status(200).send(visitInfo);
  })
  .catch(err => {

     return res.status(500).send({
       "message" : "Error occured while fetching visits!",
       "error" : err
     })

  });
}
