const { DyCEE } = require('./../../../models/Schema.js');

exports.signUp = (req,res) => {

	DyCEE.findOne({mobile_number : req.params.mobile_number})
	.then(DyCEEInfo => {
		if(DyCEEInfo.length == 0) {
      return res.send(0);   //"No data found in database. Ask Cee to add your data."
        }

    if(DyCEEInfo.password == null || DyCEEInfo.password.length == 0){
      return res.send(1);   // "Entry present but not password"
    }
		return res.send(2);   // "Entry present with password"
	})
	.catch(err => {
		if(err.kind == 'ObjectId') {
            return res.status(404).send({
                message: "No DyCEE found"
            });
        }

		return res.status(500).send({
			message: "Some error occurred while getting DyCEE."
		});

	});
}
