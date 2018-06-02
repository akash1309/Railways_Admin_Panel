const { DyCEE } = require('./../models/Schema.js');

exports.findAll = (req,res) => {
	DyCEE.find()
	.then(DyCEEInfo => {
		if(DyCEEInfo.length == 0) {
            return res.status(404).send({
                message: "No DyCEE found"
            });
        }
		res.send(DyCEEInfo);
	})
	.catch(err => {
		if(err.kind == 'ObjectId') {
            return res.status(404).send({
                message: "No DyCEE found"
            });
        }
		
		return res.status(500).send({
			message: "Some error occurred while getting all DyCEE."
		});
		
	});	
}