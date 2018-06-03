const { InspectionCertificate } = require('./../../../models/Schema.js');

exports.findAll = (req,res) => {
	InspectionCertificate.find()
	.then(icInfo => {
		if(icInfo.length == 0) {
            return res.status(404).send({
                message: "No InspectionCertificate found"
            });
        }
		res.send(icInfo);
	})
	.catch(err => {
		if(err.kind == 'ObjectId') {
            return res.status(404).send({
                message: "No InspectionCertificate found"
            });
        }

		return res.status(500).send({
			message: "Some error occurred while getting all InspectionCertificate."
		});

	});
}
