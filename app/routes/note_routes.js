//controllers
const ceeSignup = require('./../controllers/ceeSignup');
const dyceeSignup = require('./../controllers/dyceeSignup');

module.exports = function(app, db) {
  app.post('/cee/signup', ceeSignup);
  app.post('/dycee/signup',dyceeSignup);
}
