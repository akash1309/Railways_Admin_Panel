//controllers
const ceeSignup = require('./../controllers/ceeSignup');
const initialResponse = require('./../controllers/initialResponse');
const dyceeSignup = require('./../controllers/dyceeSignup');
const inspectorAdd = require('./../controllers/inspectorAdd');
const storeOfficerAdd = require('./../controllers/storeOfficerAdd');
const purchaseOrderAdd = require('./../controllers/purchaseOrderAdd');
const icGenerate = require('./../controllers/icGenerate');
const corrigendumGenerate = require('./../controllers/corrigendumGenerate');
const irStatus = require('./../controllers/inspectionReportStatus');
const getAllInspectors = require('./../controllers/getAllInspectors');
const getPurchaseOrder = require('./../controllers/getPurchaseOrder');
const getAllDyCee = require('./../controllers/getAllDyCee');
const setirStatus = require('./../controllers/inspectionReportStatus');
const getAllVendors = require('./../controllers/getAllVendors');


module.exports = function(app, db) {
  app.post('/cee/signup', ceeSignup);
  app.post('/dycee/signup',dyceeSignup);
  app.post('/inspector/add', inspectorAdd);
  app.post('/storeofficer/add', storeOfficerAdd);
  app.post('/purchaseorder/add', purchaseOrderAdd);
  app.post('/ic/generate',icGenerate);
  app.post('/corrigendum/generate',corrigendumGenerate);
  app.get('/start',initialResponse);
  app.post('/irStatus/set',irStatus.setIrStatus);
  app.get('/irStatus/get/:order_number/:ic_id',irStatus.getIrStatus);
  app.get('/inspector/all/:dycee_id',getAllInspectors.findSome);
  app.get('/inspector/all',getAllInspectors.findAll);
  app.get('/order/get/:order_number',getPurchaseOrder.findOne);
  app.get('/dycee/all',getAllDyCee.findAll);
  app.get('/vendor/all',getAllVendors.findAll);
  app.get('/',initialResponse);
}
