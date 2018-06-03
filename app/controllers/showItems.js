const { Items} = require('./../models/Schema.js');

exports.findAll = (req,res) => {
	Items.find()
	.then(itemInfo => {
		if(itemInfo.length == 0) {
            return res.status(404).send({
                message: "No Items found"
            });
        }
		res.send(itemInfo);
	})
	.catch(err => {
		if(err.kind == 'ObjectId') {
            return res.status(404).send({
                message: "No Items found"
            });
        }

		return res.status(500).send({
			message: "Some error occurred while getting all Items."
		});

	});
}
