const { Logins } = require('./../models/Schema.js');

exports.hasDyceeRole = (req,res,next) => {
	Logins.findOne({ _id : req.headers.security_token})
	.then(DyCEEInfo => {
    if(DyCEEInfo && DyCEEInfo.role == 'DyCEE')
			next();
    else{
      return res.status(500).send({
  			"message": "Invalid Token"
  		});
    }
	})
	.catch(err => {
		console.log(req.headers.security_token);
		return res.status(500).send({
			"message": "Invalid Token"
		});
	});
}

exports.hasCEERole = (req,res,next) => {
	Logins.findOne({ _id : req.headers.security_token})
	.then(CEEInfo => {
    if(CEEInfo && CEEInfo.role == 'CEE')
		next();
    else{
      return res.status(500).send({
  			"message": "Invalid Token"
  		});
    }
	})
	.catch(err => {
		return res.status(500).send({
			"message": "Invalid Token"
		});
	});
}


exports.hasInspectorRole = (req,res,next) => {

	Logins.findOne({ _id : req.headers.security_token})
	.then(inspectorInfo => {
    if(inspectorInfo && inspectorInfo.role == 'Inspector')
		next();
    else{
      return res.status(500).send({
  			"message": "Invalid Token"
  		});
    }
	})
	.catch(err => {
		return res.status(500).send({
			"message": "Invalid Token"
		});
	});
}


exports.hasVendorRole = (req,res,next) => {
	Logins.findOne({ _id : req.headers.security_token})
	.then(vendorInfo => {
    if(vendorInfo && vendorInfo.role == 'Vendor')
		next();
    else{
      return res.status(500).send({
  			"message": "Invalid Token"
  		});
    }
	})
	.catch(err => {
		return res.status(500).send({
			"message": "Invalid Token"
		});
	});
}


exports.hasStoreOfficerRole = (req,res,next) => {
	Logins.findOne({ _id : req.headers.security_token})
	.then(storeOfficerInfo => {
    if(storeOfficerInfo && storeOfficerInfo.role == 'StoreOfficer')
		next();
    else{
      return res.status(500).send({
  			"message": "Invalid Token"
  		});
    }
	})
	.catch(err => {
		return res.status(500).send({
			"message": "Invalid Token"
		});
	});
}


exports.hasStoreOfficerOrDyceeRole = (req,res,next) => {
	Logins.findOne({ _id : req.headers.security_token})
	.then(storeOfficerInfo => {
    if(storeOfficerInfo && (storeOfficerInfo.role == 'StoreOfficer' || storeOfficerInfo.role == 'DyCEE'))
		next();
    else{
      return res.status(500).send({
  			"message": "Invalid Token"
  		});
    }
	})
	.catch(err => {
		return res.status(500).send({
			"message": "Invalid Token"
		});
	});
}

exports.hasStoreOfficerorInspectorRole = (req,res,next) => {
	Logins.findOne({ _id : req.headers.security_token})
	.then(UserInfo => {
    if(UserInfo && (UserInfo.role == 'StoreOfficer' || UserInfo.role == 'Inspector'))
		next();
    else{
      return res.status(500).send({
  			"message": "Invalid Token"
  		});
    }
	})
	.catch(err => {
		return res.status(500).send({
			"message": "Invalid Token"
		});
	});
}

exports.hasCeeorInspectorRole = (req,res,next) => {
	Logins.findOne({ _id : req.headers.security_token})
	.then(UserInfo => {
    if(UserInfo && (UserInfo.role == 'CEE' || UserInfo.role == 'Inspector'))
		next();
    else{
      return res.status(500).send({
  			"message": "Invalid Token"
  		});
    }
	})
	.catch(err => {
		return res.status(500).send({
			"message": "Invalid Token"
		});
	});
}

exports.hasexceptCeeRole = (req,res,next) => {
	Logins.findOne({ _id : req.headers.security_token})
	.then(UserInfo => {
    if(UserInfo && (UserInfo.role == 'DyCEE' || UserInfo.role == 'Inspector' || UserInfo.role == 'StoreOfficer' || UserInfo.role == 'Vendor'))
		next();
    else{
      return res.status(500).send({
  			"message": "Invalid Token"
  		});
    }
	})
	.catch(err => {
		return res.status(500).send({
			"message": "Invalid Token"
		});
	});
}
