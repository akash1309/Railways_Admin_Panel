const { Inspector } = require('./../models/Schema.js');

exports.findSome = (req,res) => {	

	Inspector.find({dycee_id : req.params.dycee_id})
	.then(inspectorInfo => {
		if(inspectorInfo.length == 0) {
            return res.status(404).send({
                message: "No inspector under deputy CEE with id " + req.params.dycee_id
            });
        }
		res.send(inspectorInfo);
	})
	.catch(err => {
		if(err.kind == 'ObjectId') {
            return res.status(404).send({
                message: "No inspector under deputy CEE with id " + req.params.dycee_id
            });
        }
		
		return res.status(500).send({
			message: "Some error occurred while getting all inspectors of a particular Deputy CEE."
		});
		
	});	
}

exports.findAll = (req,res) => {
	Inspector.find()
	.then(inspectorInfo => {
		if(inspectorInfo.length == 0) {
            return res.status(404).send({
                message: "No inspector found"
            });
        }
		res.send(inspectorInfo);
	})
	.catch(err => {
		if(err.kind == 'ObjectId') {
            return res.status(404).send({
                message: "No inspector found"
            });
        }
		
		return res.status(500).send({
			message: "Some error occurred while getting all inspectors."
		});
		
	});	
}