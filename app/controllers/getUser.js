const { Logins } = require('./../models/Schema.js');

exports.findOne = (req,res) => {

	Logins.find({ _id : req.params._id})
	.then(UserInfo => {
		if(UserInfo.length == 0) {
            return res.status(404).send({
                "message": "No User found"
            });
        }
		res.status(200).send(UserInfo[0]);
	})
	.catch(err => {

		return res.status(500).send({
			"message": "Error occurred while fetching User.",
			"error" : err
		});

	});
}
