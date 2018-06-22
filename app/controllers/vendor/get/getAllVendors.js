const { Logins } = require('./../../../models/Schema.js');

exports.findSome = (req,res) => {

	Logins.find({ location : req.params.location, role: "Vendor"})
	.then(VendorInfo => {
		if(VendorInfo.length == 0) {
            return res.status(404).send({
                "message": "No vendor with location " + req.params.location
            });
        }
		res.status(200).send(VendorInfo);
	})
	.catch(err => {

		return res.status(500).send({
			"message": "Some error occurred while getting all vendors!",
			"error" : err
		});

	});
}

exports.findOne = (req,res) => {

	Logins.find({ mobile : req.params.mobile, role: "Vendor"})
	.then(VendorInfo => {
		if(VendorInfo.length == 0) {
            return res.status(404).send({
                "message": "No vendor with mobile " + req.params.mobile
            });
        }
		res.status(200).send(VendorInfo);
	})
	.catch(err => {

		return res.status(500).send({
			"message": "Some error occurred while getting all vendors!",
			"error" : err
		});

	});
}


exports.findAll = (req,res) => {
  Logins.find({ role : "Vendor"})
  .then(vendorInfo => {
       if(vendorInfo.length == 0) {
         return res.status(404).send(
           {
             "message" : "No Vendor found!"
           });
       }
         res.status(200).send(vendorInfo);
  })
  .catch(err => {

     return res.status(500).send({
       "message" : "Error occured while fetching vendor info!",
       "error" : err
     })

  });






}
