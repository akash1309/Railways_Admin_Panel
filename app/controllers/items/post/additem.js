const { Items } = require('./../../../models/Schema.js');

module.exports = function(req, res){

  var newItem = Items({
    model_number : req.body.model_number,
    name:          req.body.name,
    quantity:      req.body.quantity
  });

  Items.findOne({
     model_number : req.body.model_number
  },function(err, item) {
    if (err) {
      return res.status(500).send({
        "message" : "Error fetching Items!",
        "error" : err
      });
    }
    else if(item != null){
      return res.status(204).send({
        "message" : "Item already present!"
      });
    }
    else{
      newItem.save(function(err, item) {
        if (err) {
          return res.status(500).send({
            "message" : "Error in registration!",
            "error" : err
          });
        }
        else {
          res.status(200).send(item);
        }
      });
    }
  });
}
