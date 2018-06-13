const { InspectionCertificate } = require('./../../../models/Schema.js');

exports.findAll = (req,res) => {
	InspectionCertificate.find()
	.then(icInfo => {
		if(icInfo.length == 0) {
            return res.status(404).send({
                "message": "No InspectionCertificate found!"
            });
        }
		res.status(200).send(icInfo);
	})
	.catch(err => {

		return res.status(500).send({
			"message": "Some error occurred while getting all InspectionCertificate!",
			"error" : err
		});

	});
}
