const { Logins } = require('./../../models/Schema.js');

exports.loginfunc = (req,res) => {

	Logins.findOne({mobile : req.body.mobile, password : req.body.password})
	.then(LoginsInfo => {

      return res.status(200).send({
        "message": "account exist",
        "role": LoginsInfo.role,
        "flag": "1"
      });
	})
	.catch(err => {
    return res.status(404).send({
      "message": "Incorrect Password.",
      "flag": "0"
    });
	});

}
