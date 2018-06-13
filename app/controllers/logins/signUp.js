const { Logins } = require("./../../models/Schema");

exports.update = (req,res) => {

  Logins.update({ mobile : req.body.mobile }, { password : req.body.password }, function(err,response){
      if(err){
        return res.status(500).send({
         "error" : err,
         "message" : "error in signup with mobile number " + req.body.mobile

        });

        }
        else {
          return res.status(200).send({
            "message" : "Successfully signed up...",
            "_id": LoginsInfo._id
          });

        }

      });
}
