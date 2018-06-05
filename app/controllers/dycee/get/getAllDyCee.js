const { Logins } = require('./../../../models/Schema.js');

exports.findAll = (req,res) => {
	Logins.find({ role : "DyCEE"})
	.then(DyCEEInfo => {
		if(DyCEEInfo.length == 0) {
            return res.status(404).send({
                message: "No DyCEE found"
            });
        }
		res.status(200).send(DyCEEInfo);
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
