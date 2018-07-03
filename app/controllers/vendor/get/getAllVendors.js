const { Logins } = require('./../../../models/Schema.js');
const { PurchaseOrder } = require('./../../../models/Schema.js');

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

exports.findbyStoreOfficer = (req,res) => {
  Logins.find({ storeofficer_id : req.params.storeofficer_id})
  .then(vendorInfo => {

			vendorInfo.map(x => {

			return PurchaseOrder.find({'vendor_info.code' : x.vendor_code})
					.populate('ic_id')
					.then( purchaseOrderInfo => {
						console.log(purchaseOrderInfo);
						var	user = Logins({
			 					name: x.name,
			 					email: x.email,
			 					mobile: x.mobile,
			 					password: x.password,
			 					location: x.location,
			 				  address: x.address,
			 				  cee_id :   x.cee_id,
			 				  dycee_id :  x.dycee_id,
			 				  storeofficer_id : x.storeofficer_id,
			 				  vendor_code: x.vendor_code,
			 				  role :  x.role,
			 				  po_remaining : purchaseOrderInfo.length
			 				});
							return res.status(200).send(user);
					});


				})

  })
  .catch(err => {

     return res.status(500).send({
       "message" : "Error occured while fetching vendor info!",
       "error" : err
     })

  });
}
