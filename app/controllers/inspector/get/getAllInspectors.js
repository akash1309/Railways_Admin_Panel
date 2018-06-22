const { Logins } = require('./../../../models/Schema.js');

exports.findOne = (req,res) => {

	Logins.find({mobile : req.params.mobile, role: "Inspector"})
	.then(inspectorInfo => {
		if(inspectorInfo.length == 0) {
            return res.status(404).send({
                "message": "No inspector with mobile " + req.params.mobile
            });
        }
		res.status(200).send(inspectorInfo);
	})
	.catch(err => {

		return res.status(500).send({
			"message": "Some error occurred while getting the inspector!",
			"error" : err
		});

	});
}

exports.findSome = (req,res) => {

	Logins.find({location : req.params.location, role: "Inspector"})
	.then(inspectorInfo => {
		if(inspectorInfo.length == 0) {
            return res.status(404).send({
                "message": "No inspector with location " + req.params.location
            });
        }
		res.status(200).send(inspectorInfo);
	})
	.catch(err => {

		return res.status(500).send({
			"message": "Some error occurred while getting all inspectors!",
			"error" : err
		});

	});
}

exports.findAll = (req,res) => {
	Logins.find({role: "Inspector"})
	.then(inspectorInfo => {
		if(inspectorInfo.length == 0) {
            return res.status(404).send({
                "message": "No inspector found!"
            });
        }
		res.status(200).send(inspectorInfo);
	})
	.catch(err => {

		return res.status(500).send({
			"message": "Some error occurred while getting all inspectors!",
			"error" : err
		});

	});
}
