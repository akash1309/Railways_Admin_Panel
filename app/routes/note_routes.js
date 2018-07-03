//controllers
const ceeSignup = require('./../controllers/cee/post/ceeSignup');

const signUp = require('./../controllers/logins/signUp');
const validation = require('./../controllers/logins/validation');
const login = require('./../controllers/logins/login');

const dyceeAdd = require('./../controllers/dycee/post/dyceeAdd');
const getAllDyCee = require('./../controllers/dycee/get/getAllDyCee');

const getUser = require('./../controllers/getUser');

const inspectorAdd = require('./../controllers/inspector/post/inspectorAdd');
const getAllInspectors = require('./../controllers/inspector/get/getAllInspectors');

const storeOfficerAdd = require('./../controllers/storeOfficer/post/storeOfficerAdd');
const getAllStoreOfficers = require('./../controllers/storeOfficer/get/getAllStoreOfficers');

const vendorAdd = require('./../controllers/vendor/post/vendorAdd');
const getAllVendors = require('./../controllers/vendor/get/getAllVendors');

const purchaseOrderAdd = require('./../controllers/purchaseOrder/post/purchaseOrderAdd');
const getPurchaseOrder = require('./../controllers/purchaseOrder/get/getPurchaseOrder');
const updatePOInfo = require('./../controllers/purchaseOrder/post/updatePO');

const icGenerate = require('./../controllers/inspectionCertificate/post/icGenerate');
const showIC = require('./../controllers/inspectionCertificate/get/showIC');
const updateICInfo = require('./../controllers/inspectionCertificate/post/updateIC');

const showItems = require('./../controllers/items/get/showItems');
const itemAdd = require('./../controllers/items/post/additem');

const corrigendumGenerate = require('./../controllers/corrigendum/post/corrigendumGenerate');
const showCorrigendum = require('./../controllers/corrigendum/get/showCorrigendum');

const irStatus = require('./../controllers/inspectionReport/inspectionReportStatus');

const initialResponse = require('./../controllers/initialResponse');

const updateInfo =  require('./../controllers/logins/updateInfo');
const deleteInfo =  require('./../controllers/logins/deleteInfo');
const deletePO   =  require('./../controllers/logins/deletePO');
const deleteItem   =  require('./../controllers/logins/deleteItem');

const addVisits = require('./../controllers/visit/post/visitadd');
const getVisits = require('./../controllers/visit/get/visitget');
const updateVisits = require('./../controllers/visit/post/visitUpdate');
const removeVisit = require('./../controllers/visit/post/deleteVisit');
// Security Functions Implementation

const secure = require('./../controllers/security');

module.exports = function(app, db) {
  app.post('/cee/signup', ceeSignup);

  app.post('/dycee/add',dyceeAdd);
  app.get('/dycee/all',getAllDyCee.findAll);
  app.get('/dycee/one',getAllDyCee.findOne);
  app.get('/dycee/some',getAllDyCee.findSome);

  app.get('/user/:_id',getUser.findOne);

  app.post('/inspector/add', inspectorAdd);
  app.get('/inspector/some',getAllInspectors.findSome);
  app.get('/inspector/all',getAllInspectors.findAll);
  app.get('/inspector/one',getAllInspectors.findOne);
  app.get('/inspector/:dyceeId',getAllInspectors.findByDyceeId);

  app.post('/storeofficer/add', storeOfficerAdd);
  app.get('/storeofficer/all',getAllStoreOfficers.findAll);
  app.get('/storeofficer/one',getAllStoreOfficers.findOne);
  app.get('/storeofficer/:dyceeId',getAllStoreOfficers.findByDyceeId);

  app.post('/purchaseorder/add', purchaseOrderAdd);
  app.get('/purchaseorder/all',getPurchaseOrder.findAll);
  app.post('/updatePurchaseOrder',updatePOInfo.updatePO);
  app.get('/purchaseorder/:order_number',getPurchaseOrder.findOne);
  app.get('/purchaseorder/vendor/:code',getPurchaseOrder.findforVendor);
  app.get('/purchaseorder/storeofficer/:storeofficer_id', secure.hasStoreOfficerOrDyceeRole, getPurchaseOrder.findbyStoreOfficer);
  app.get('/purchaseorder/inspector/:inspected_by', secure.hasInspectorRole, getPurchaseOrder.findforInspector);
  app.get('/purchaseorder/po_remaining/:vendor_code',getPurchaseOrder.POCount);

  app.post('/vendor/add',vendorAdd);
  app.get('/vendor/all',getAllVendors.findAll);
  app.get('/vendor/one',getAllVendors.findOne);
  app.get('/vendor/some',getAllVendors.findSome);
  app.get('/vendor/:storeofficer_id',getAllVendors.findbyStoreOfficer);

  app.post('/updateIC',updateICInfo.updateIC);
  app.post('/ic/generate',icGenerate);
  app.get('/showIC/all/:order_number',showIC.findAll);
  app.get('/showIC/one',showIC.findOne);

  app.post('/corrigendum/generate',corrigendumGenerate);
  app.get('/corrigendum/showCorrigendum/all',showCorrigendum.findAll);
  app.get('/corrigendum/showCorrigendum/one/:corrigendum_id',showCorrigendum.findOne);

  //app.post('/irStatus/set',irStatus.setIrStatus);
  app.get('/irStatus/get/:order_number',irStatus.getIrStatus);
  app.get('/showIR',irStatus.findAll);
  app.post('/generateIr',irStatus.generate);

  app.get('/showItems/all',showItems.findAll);
  app.post('/items/add',itemAdd);
  app.get('/showItems/one',showItems.findOne);

  app.post('/visit/add',addVisits);
  app.get('/visit/get/:vendor_code',getVisits.findVisitbyVendor);
  app.post('/visit/update',updateVisits.updateVisit);
  app.post('/visit/delete',removeVisit.delVisit);

  app.post('/signUp',signUp.update);
  app.get('/validate/:mobile',validation.validate);
  app.post('/login',login.loginfunc);

  app.post('/updateinfo',updateInfo.updateUser);
  app.post('/deleteInfo',deleteInfo.delUser);
  app.post('/deletePO',deletePO.delPO);
  app.post('/deleteItem',deleteItem.delItems);

  app.get('/start',initialResponse);
  app.get('/',initialResponse);

}
