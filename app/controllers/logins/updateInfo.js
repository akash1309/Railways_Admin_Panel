const { Logins } = require("./../../models/Schema");

exports.updateUser = (req,res) => {

  Logins.find({ mobile : req.body.mobile})
  .then(UserInfo => {

    if(UserInfo.length == 0) {
          return updateUser(req,res,req.body.role);
        }

    else {
      if(UserInfo[0]._id == req.body._id)
      {
        return updateUser(req,res,req.body.role);
      }
      else {
        return res.status(204).send({
              "message" : "Mobile number to be updated is already present!"
            });
      }
    }

  })
  .catch(err => {
    return res.status(500).send({
      "message": "Error occurred while fetching User.",
      "error" : err
    });

  });

}

function getJSON(role,req) {

  if(role == "CEE")
  {
    var x = '{ "name" : "'+req.body.name+'" , "password" : "'+req.body.password+'" , "email" : "'+req.body.email+'" , "mobile" : "'+req.body.mobile+'" }';
    return JSON.parse(x);
  }
  else if(role == "Vendor")
  {
    var x = '{ "name" : "'+req.body.name+'" , "password" : "'+req.body.password+'" , "email" : "'+req.body.email+'" , "mobile" : "'+req.body.mobile+'" , "address" : "' + req.body.address + '" }';
    return JSON.parse(x);
  }
  else
  {
    var x = '{ "name" : "'+req.body.name+'" , "password" : "'+req.body.password+'" , "email" : "'+req.body.email+'" , "mobile" : "'+req.body.mobile+'" , "location" : "' + req.body.location + '" }';
    return JSON.parse(x);
  }

}
function updateUser(req,res,role)
{
   var user = getJSON(role,req);

    Logins.update({ _id : req.body._id },
      user,
      function(err,response){

        if(err){
          return res.status(500).send({
           "error" : err,
           "message" : "Error in updation!"
          });
          }
        else {
           console.log(response);
            return res.status(200).send({
              "message" : "Successfully updated..."
            });
          }

        });
  }
