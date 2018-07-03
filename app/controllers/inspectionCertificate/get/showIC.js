const { InspectionCertificate } = require('./../../../models/Schema.js');

exports.findOne = (req,res) => {

	InspectionCertificate.find({order_number : req.params.order_number, ic_id : req.params.ic_id})
	.then(InspectionCertificateInfo => {
		if(InspectionCertificateInfo.length == 0) {
            return res.status(404).send({
                "message": "No IC with order_number " + req.params.order_number
            });
        }
		res.status(200).send(InspectionCertificateInfo);
	})
	.catch(err => {

		return res.status(500).send({
			"message": "Some error occurred while getting InspectionCertificate!",
			"error" : err
		});

	});
}


exports.findAll = (req,res) => {
	InspectionCertificate.find({order_number : req.params.order_number})
	.populate('corrigendum_number')
	.sort({ic_signed_on : -1})
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
