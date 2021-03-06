const { Items} = require('./../../../models/Schema.js');

exports.findOne = (req,res) => {

	Items.find({model_number : req.params.model_number})
	.then(itemsInfo => {
		if(itemsInfo.length == 0) {
            return res.status(404).send({
                "message": "No items with model_number " + req.params.model_number
            });
        }
		res.status(200).send(itemsInfo);
	})
	.catch(err => {

		return res.status(500).send({
			"message": "Some error occurred while getting items!",
			"error" : err
		});

	});
}



exports.findAll = (req,res) => {
	Items.find()
	.then(itemInfo => {
		if(itemInfo.length == 0) {
            return res.status(404).send({
                "message": "No Items found!"
            });
        }
		res.status(200).send(itemInfo);
	})
	.catch(err => {

		return res.status(500).send({
			"message": "Some error occurred while getting all Items!",
			"error" : err
		});

	});
}
