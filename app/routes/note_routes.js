//controllers
const ceeSignup = require('./../controllers/cee/post/ceeSignup');

const signUp = require('./../controllers/logins/signUp')

const dyceeAdd = require('./../controllers/dycee/post/dyceeAdd');
const getAllDyCee = require('./../controllers/dycee/get/getAllDyCee');

const inspectorAdd = require('./../controllers/inspector/post/inspectorAdd');
const getAllInspectors = require('./../controllers/inspector/get/getAllInspectors');

const storeOfficerAdd = require('./../controllers/storeOfficer/post/storeOfficerAdd');
const getAllStoreOfficers = require('./../controllers/storeOfficer/get/getAllStoreOfficers');

const vendorAdd = require('./../controllers/vendor/post/vendorAdd');
const getAllVendors = require('./../controllers/vendor/get/getAllVendors');

const purchaseOrderAdd = require('./../controllers/purchaseOrder/post/purchaseOrderAdd');
const getPurchaseOrder = require('./../controllers/purchaseOrder/get/getPurchaseOrder');

const icGenerate = require('./../controllers/inspectionCertificate/post/icGenerate');
const showIC = require('./../controllers/inspectionCertificate/get/showIC');

const showItems = require('./../controllers/showItems');

const corrigendumGenerate = require('./../controllers/corrigendum/post/corrigendumGenerate');
const showCorrigendum = require('./../controllers/corrigendum/get/showCorrigendum');

const irStatus = require('./../controllers/inspectionReport/inspectionReportStatus');

const initialResponse = require('./../controllers/initialResponse');

module.exports = function(app, db) {
  app.post('/cee/signup', ceeSignup);

  app.post('/dycee/add',dyceeAdd);
  app.get('/dycee/all',getAllDyCee.findAll);

  app.post('/inspector/add', inspectorAdd);
  app.get('/inspector/all/:dycee_id',getAllInspectors.findSome);
  app.get('/inspector/all',getAllInspectors.findAll);

  app.post('/storeofficer/add', storeOfficerAdd);
  app.get('/storeofficer/all',getAllStoreOfficers.findAll);

  app.post('/purchaseorder/add', purchaseOrderAdd);
  app.get('/order/get/:order_number',getPurchaseOrder.findOne);

  app.post('/vendor/add',vendorAdd);
  app.get('/vendor/all',getAllVendors.findAll);

  app.post('/ic/generate',icGenerate);
  app.get('/showIC',showIC.findAll);

  app.post('/corrigendum/generate',corrigendumGenerate);
  app.get('/corrigendum/showCorrigendum',showCorrigendum.findAll);

  app.post('/irStatus/set',irStatus.setIrStatus);
  app.get('/irStatus/get/:order_number/:ic_id',irStatus.getIrStatus);

  app.get('/start',initialResponse);
  app.get('/',initialResponse);

  app.get('/showItems',showItems.findAll);

  app.get('/signup/:mobile',signUp.findOne);
}
