const { Logins } = require("./../../models/Schema");

exports.delUser = (req,res) => {

  Logins.find({ mobile : req.body.mobile , role : req.body.role})
  .then(UserInfo => {

      if(UserInfo.length != 0)
      {
        return delUserFunc(req,res,req.body.mobile,req.body.role);
      }
      else {
        return res.status(404).send({
              "message" : "Person to be deleted is not present!"
            });
      }


  })
  .catch(err => {
    return res.status(500).send({
      "message": "Error occurred while fetching User.",
      "error" : err
    });

  });

}

function delUserFunc(req,res)
{
    Logins.remove({ mobile : req.body.mobile , role : req.body.role},
      function(err,response){

        if(err){
          return res.status(500).send({
           "error" : err,
           "message" : "Error in deletion!"
          });
          }
        else {
           console.log(response);
            return res.status(200).send({
              "message" : "Successfully removed..."
            });
          }

        });
  }
