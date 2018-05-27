//controllers
const ceeSignup = require('./../controllers/ceeSignup');

module.exports = function(app, db) {
  app.post('/cee/signup', ceeSignup);
}
