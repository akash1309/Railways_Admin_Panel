const { PurchaseOrder } = require('./../../../models/Schema.js');

exports.findOne = (req,res) => {

	PurchaseOrder.find({order_number : req.params.order_number})
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
