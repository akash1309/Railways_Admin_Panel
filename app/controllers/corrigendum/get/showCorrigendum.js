const { Corrigendum } = require('./../../../models/Schema.js');

exports.findOne = (req,res) => {

	Corrigendum.find({corrigendum_number : req.params.corrigendum_number})
	.then(CorrigendumInfo => {
		if(CorrigendumInfo.length == 0) {
            return res.status(404).send({
                "message": "No Corrigendum with corrigendum_number " + req.params.corrigendum_number
            });
        }
		res.status(200).send(CorrigendumInfo);
	})
	.catch(err => {

		return res.status(500).send({
			"message": "Some error occurred while getting Corrigendum!",
			"error" : err
		});

	});
}


exports.findAll = (req,res) => {
	Corrigendum.find()
	.then(CorrigendumInfo => {
		if(CorrigendumInfo.length == 0) {
            return res.status(404).send({
                "message" : "No Corrigendum found!"
            });
        }
		res.status(200).send(CorrigendumInfo);
	})
	.catch(err => {

		return res.status(500).send({
			"message": "Error in fetching Corrigendum!",
			"error" : err
		});

	});
}
