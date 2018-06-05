const { Logins } = require('./../../models/Schema.js');

exports.findOne = (req,res) => {

	Logins.findOne({mobile : req.params.mobile})
	.then(LoginsInfo => {
    if(LoginsInfo.password == undefined) {
      return res.status(200).send({
        "message": "Password field empty. Requires SignUp",
        "role": LoginsInfo.role,
        "flag": "0"
      });
    }
    return res.status(200).send({
      "message": "Entry present.",
      "role": LoginsInfo.role,
      "flag": "1"
		});
	})
	.catch(err => {
		if(err.kind == 'ObjectId') {
      return res.status(404).send({
        "message": "No one is registered with this mobile number."
      });
    }
		return res.status(500).send({
			"message": "Some error occurred while getting login information.",
      "error": err
		});
	});
	
}
