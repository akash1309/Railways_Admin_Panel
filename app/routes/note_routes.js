//controllers
const ceeSignup = require('./../controllers/ceeSignup');
const dyceeSignup = require('./../controllers/dyceeSignup');
const inspectorAdd = require('./../controllers/inspectorAdd');
const storeOfficerAdd = require('./../controllers/storeOfficerAdd');
const purchaseOrderAdd = require('./../controllers/purchaseOrderAdd');

module.exports = function(app, db) {
  app.post('/cee/signup', ceeSignup);
  app.post('/dycee/signup',dyceeSignup);
  app.post('/inspector/add', inspectorAdd);
  app.post('/storeofficer/add', storeOfficerAdd);
  app.post('/purchaseorder/add', purchaseOrderAdd);
}
