const { Logins } = require('./../../../models/Schema.js');

exports.findSome = (req,res) => {

	Logins.find({dycee_id : req.params.dycee_id, role: "Inspector"})
	.then(inspectorInfo => {
		if(inspectorInfo.length == 0) {
            return res.status(404).send({
                message: "No inspector under deputy CEE with id " + req.params.dycee_id
            });
        }
		res.status(200).send(inspectorInfo);
	})
	.catch(err => {
		if(err.kind == 'ObjectId') {
            return res.status(404).send({
                message: "No inspector under deputy CEE with id " + req.params.dycee_id
            });
        }

		return res.status(500).send({
			message: "Some error occurred while getting all inspectors of a particular Deputy CEE."
		});

	});
}

exports.findAll = (req,res) => {
	Logins.find({role: "Inspector"})
	.then(inspectorInfo => {
		if(inspectorInfo.length == 0) {
            return res.status(404).send({
                message: "No inspector found"
            });
        }
		res.status(200).send(inspectorInfo);
	})
	.catch(err => {
		if(err.kind == 'ObjectId') {
            return res.status(404).send({
                message: "No inspector found"
            });
        }

		return res.status(500).send({
			message: "Some error occurred while getting all inspectors."
		});

	});
}
