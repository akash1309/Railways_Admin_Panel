const { Logins } = require('./../../../models/Schema.js');


exports.findByDyceeId = (req,res) => {

	Logins.find({dycee_id: req.params.dyceeId, role: "StoreOfficer"})
	.then(StoreOfficerInfo => {
		res.status(200).send(StoreOfficerInfo);
	})
	.catch(err => {
		return res.status(500).send({
			"message": "Some error occurred while getting all StoreOfficer!",
			"error" : err
		});
	});

}

exports.findSome = (req,res) => {

	Logins.find({location : req.params.location, role: "StoreOfficer"})
	.then(StoreOfficerInfo => {
		if(StoreOfficerInfo.length == 0) {
            return res.status(404).send({
                "message": "No StoreOfficer with location " + req.params.location
            });
        }
		res.status(200).send(StoreOfficerInfo);
	})
	.catch(err => {

		return res.status(500).send({
			"message": "Some error occurred while getting all StoreOfficer!",
			"error" : err
		});

	});
}

exports.findOne = (req,res) => {

	Logins.find({mobile : req.params.mobile, role: "StoreOfficer"})
	.then(StoreOfficerInfo => {
		if(StoreOfficerInfo.length == 0) {
            return res.status(404).send({
                "message": "No StoreOfficer with mobile " + req.params.mobile
            });
        }
		res.status(200).send(StoreOfficerInfo);
	})
	.catch(err => {

		return res.status(500).send({
			"message": "Some error occurred while getting all StoreOfficer!",
			"error" : err
		});

	});
}

exports.findAll = (req,res) => {

  Logins.find({ role : "StoreOfficer"})
  .then(StoreOfficerInfo => {
       if(StoreOfficerInfo.length == 0) {
         return res.status(404).send(
           {
             "message" : "No StoreOfficer found."
           }
         );
       }
         res.status(200).send(StoreOfficerInfo);


  })
  .catch(err => {

     return res.status(500).send({
       "message" : "Error occured while fetching storeofficer info",
       "error" :  err
     });

  });

}

exports.findbyVendor = (req,res) => {

	Logins.findOne({_id: req.params.vendor_id})
	.then(VendorInfo => {

		if(VendorInfo.length == 0) {
            return res.status(404).send({
                "message": "No Vendor found"
            });
        }
		var storeOfficerId = VendorInfo.storeofficer_id;

			Logins.findOne({ _id : storeOfficerId})
			.then(StoreOfficerInfo => {
				if(StoreOfficerInfo.length == 0) {
								return res.status(404).send({
										"message": "No StoreOfficer found"
								});
						}
				res.status(200).send(StoreOfficerInfo);
			})
			.catch(err => {

				return res.status(500).send({
					"message": "Error occurred while fetching all DyCEE.",
					"error" : err
				});

			});
	})
	.catch(err => {
		return res.status(500).send({
			"message": "Some error occurred while getting StoreOfficer by vendor!",
			"error" : err
		});
	});

}
