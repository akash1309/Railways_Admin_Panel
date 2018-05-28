//controllers
const ceeSignup = require('./../controllers/ceeSignup');
const dyceeSignup = require('./../controllers/dyceeSignup');
const inspectorAdd = require('./../controllers/inspectorAdd');
const storeOfficerAdd = require('./../controllers/storeOfficerAdd');
const purchaseOrderAdd = require('./../controllers/purchaseOrderAdd');
const icGenerate = require('./../controllers/icGenerate');
const corrigendumGenerate = require('./../controllers/corrigendumGenerate');
const setirStatus = require('./../controllers/setInspectionReportStatus');

module.exports = function(app, db) {
  app.post('/cee/signup', ceeSignup);
  app.post('/dycee/signup',dyceeSignup);
  app.post('/inspector/add', inspectorAdd);
  app.post('/storeofficer/add', storeOfficerAdd);
  app.post('/purchaseorder/add', purchaseOrderAdd);
  app.post('/ic/generate',icGenerate);
  app.post('/corrigendum/generate',corrigendumGenerate);
  app.post('/irStatus/set',setirStatus);
}
