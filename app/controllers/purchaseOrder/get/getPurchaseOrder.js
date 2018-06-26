const { PurchaseOrder } = require('./../../../models/Schema.js');

exports.findforVendor = (req,res) => {

	PurchaseOrder.find({'vendor_info.code' : req.params.code})
	.populate('inspected_by')
	.populate('ic_id')
	.then( purchaseOrderInfo => {

		res.status(200).send(purchaseOrderInfo);
	})
	.catch(err => {

		return res.status(500).send({
			"message" : "Some error occured while extracting purchase order with code "+req.params.code,
			"error" : err
		});
	});
}

exports.findforInspector = (req,res) => {

console.log(req.params.inspected_by);
	PurchaseOrder.find().or([{inspected_by : req.params.inspected_by} , {amendmentInspector : req.params.inspected_by}])
	.populate('inspected_by')
	.populate('ic_id')
	.then( purchaseOrderInfo => {
		res.status(200).send(purchaseOrderInfo);
	})
	.catch(err => {

		return res.status(500).send({
			"message" : "Some error occured while extracting purchase order with inspector id  "+req.params.inspected_by,
			"error" : err
		});
	});
}

exports.findOne = (req,res) => {

	PurchaseOrder.findOne({order_number : req.params.order_number})
	.then( purchaseOrderInfo => {

		if(purchaseOrderInfo.length == 0) {
			return res.status(404).send({
				"message" : "No purchase order found with order number "+req.params.order_number
			});
		}
		res.status(200).send(purchaseOrderInfo);
	})
	.catch(err => {

		return res.status(500).send({
			"message" : "Some error occured while extracting purchase order with order number "+req.params.order_number,
			"error" : err
		});
	});
}

exports.findAll = (req,res) => {

	PurchaseOrder.find()
	.populate('inspected_by')
	.populate('ic_id')
	.then(purchaseOrderInfo => {
		if(purchaseOrderInfo.length == 0) {
            return res.status(404).send({
                "message": "No purchase order found!"
            });
        }
		res.status(200).send(purchaseOrderInfo);
	})
	.catch(err => {

		return res.status(500).send({
			"message": "Some error occurred while getting all purchase orders!",
			"error" : err
		});

	});
}

exports.findbyStoreOfficer = (req,res) => {

	PurchaseOrder.find({storeofficer_id : req.params.storeofficer_id})
	.populate('inspected_by')
	.populate('ic_id')
	.then( purchaseOrderInfo => {
		res.status(200).send(purchaseOrderInfo);
	})
	.catch(err => {

		return res.status(500).send({
			"message" : "Some error occured while extracting purchase order",
			"error" : err
		});
	});
}
