//controllers
const ceeSignup = require('./../controllers/ceeSignup');
const dyceeSignup = require('./../controllers/dyceeSignup');
const inspectorAdd = require('./../controllers/inspectorAdd');

module.exports = function(app, db) {
  app.post('/cee/signup', ceeSignup);
  app.post('/dycee/signup',dyceeSignup);
  app.post('/inspector/add', inspectorAdd);
}
