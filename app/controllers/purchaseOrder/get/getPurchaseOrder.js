const { PurchaseOrder } = require('./../../../models/Schema.js');

exports.findOne = (req,res) => {

	PurchaseOrder.find({order_number : req.params.order_number})
	.then( purchaseOrderInfo => {

		if(!purchaseOrderInfo) {
			return res.status(400).send({
				message : "No purchase order found with order number "+req.params.order_number
			});
		}
		res.send(purchaseOrderInfo);
	})
	.catch(err => {

		if(err.kind == 'ObjectId'){
			return res.status(400).send({
				message : "No purchase order found with order number "+req.params.order_number
			});
		}
		return res.status(500).send({
			message : "Some error occured while extracting purchase order with order number "+req.params.order_number
		});
	});
}
