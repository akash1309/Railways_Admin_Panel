const { Logins } = require('./../../models/Schema.js');

exports.validate = (req,res) => {

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
    return res.status(404).send({
      "message": "No one is registered with this mobile number."
    });
	});

}
