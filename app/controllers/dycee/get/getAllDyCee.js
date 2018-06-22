const { Logins } = require('./../../../models/Schema.js');

exports.findOne = (req,res) => {

	Logins.find({mobile : req.params.mobile, role: "DyCEE"})
	.then(DyCEEInfo => {
		if(DyCEEInfo.length == 0) {
            return res.status(404).send({
                "message": "No DyCEE under deputy CEE with mobile " + req.params.mobile
            });
        }
		res.status(200).send(DyCEEInfo);
	})
	.catch(err => {

		return res.status(500).send({
			"message": "Some error occurred while getting all DyCEE of a particular Deputy CEE!",
			"error" : err
		});

	});
}

exports.findSome = (req,res) => {

	Logins.find({location : req.params.location, role : "DyCEE"})
	.then(DyCEEInfo => {
		if(DyCEEInfo.length == 0) {
            return res.status(404).send({
                "message": "No DyCee under deputy CEE with location " + req.params.location
            });
        }
		res.status(200).send(DyCEEInfo);
	})
	.catch(err => {

		return res.status(500).send({
			"message": "Some error occurred while getting all DyCee of a particular Deputy CEE!",
			"error" : err
		});

	});
}




exports.findAll = (req,res) => {

	Logins.find({ role : "DyCEE"})
	.then(DyCEEInfo => {
		if(DyCEEInfo.length == 0) {
            return res.status(404).send({
                "message": "No DyCEE found"
            });
        }
		res.status(200).send(DyCEEInfo);
	})
	.catch(err => {

		return res.status(500).send({
			"message": "Error occurred while fetching all DyCEE.",
			"error" : err
		});

	});
}
