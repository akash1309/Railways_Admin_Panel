const { Corrigendum } = require('./../../../models/Schema.js');

exports.findAll = (req,res) => {
	Corrigendum.find()
	.then(CorrigendumInfo => {
		if(CorrigendumInfo.length == 0) {
            return res.status(404).send({
                message: "No Corrigendum found"
            });
        }
		res.send(CorrigendumInfo);
	})
	.catch(err => {
		if(err.kind == 'ObjectId') {
            return res.status(404).send({
                message: "No Corrigendum found"
            });
        }

		return res.status(500).send({
			message: "Some error occurred while getting Corrigendum."
		});

	});
}
