//controllers
const ceeSignup = require('./../controllers/ceeSignup');
const dyceeSignup = require('./../controllers/dyceeSignup');
<<<<<<< Updated upstream
const inspectorAdd = require('./../controllers/inspectorAdd');
=======
const vendorSignup = require('./../controllers/vendorSignup');

>>>>>>> Stashed changes

module.exports = function(app, db) {
  app.post('/cee/signup', ceeSignup);
  app.post('/dycee/signup',dyceeSignup);
<<<<<<< Updated upstream
  app.post('/inspector/add', inspectorAdd);
=======
  app.post('/vendor/signup',vendorSignup);

>>>>>>> Stashed changes
}
