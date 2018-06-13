const mongoose = require('mongoose');

const LoginsSchema = mongoose.Schema({
  name:         { type: String, required: true  },
	email:        { type: String, required: true  },
  mobile:       { type: String, required: true  },
	password:     String,
	location:     String,
  cee_id :      String,
  dycee_id :    String,
  storeofficer_id : String,
  role :        {type:String, required: true }
},
{ collection: 'Logins' },
{
  timestamps: true
});

const ItemInfoSchema= mongoose.Schema({
  specification:  { type:String , required:true },
  quantity_rate:  { type: String, required:true },
  duties_charges: { type: String, required:true },
  delivery_date:  { type: String, required:true }
},
{
  timestamps: true
});

const VendorInfoSchema= mongoose.Schema({
  code:     { type:String , required:true },
  email :   { type: String, required:true },
  address : { type: String, required:true }
},
{
  timestamps: true
});

const TenderInfoSchema= mongoose.Schema({
  tender_no:     { type:String , required:true },
  tender_type:   { type: String, required:true },
  opened_on :     { type: String, required:true }
},
{
  timestamps: true
});

const PurchaseOrderSchema= mongoose.Schema({
    order_number:       { type: String, required:true },
    order_date:         { type: String, required:true },
    storeofficer_id :   { type: String, required:true },
    itemdetails :       ItemInfoSchema,
    vendor_info:        VendorInfoSchema,
    tender_info:        TenderInfoSchema,
    offer_no:			{ type: String, required:true },
    offer_date:			{ type:String, required:true },
    ic_id:              String
},
{ collection: 'PurchaseOrder' },
{
  timestamps: true
});


const ItemSchema= mongoose.Schema({
  name      :    String,
  quantity  :    { type: String, required:true }

},
{
  timestamps: true
});


const InspectionCertificateSchema= mongoose.Schema({
  order_number :      { type: String, required:true },
//  mobile:             { type: String, required:true },
 // password :          { type: String, required:true },
//  storeofficer_id :   { type: String, required:true },
//  item_details :      ICItemInfoSchema,
  quantity_offered:  { type: String, required:true },
  quantity_approved: { type: String, required:true },
 // vendor_info:        VendorInfoSchema,
//  tender_info:        TenderInfoSchema,
  location :          { type: String, required:true },
  ic_id:              { type: String, required:true },
  inspection_date :   { type: String, required:true },
  ic_signed_on :	  {type: String, required:true},
  inspector_name :   { type: String, required:true },
  inspector_mobile : { type:String, required:true }
},
{ collection: 'InspectionCertificate' },
{
timestamps: true
});

const CorrigendumSchema= mongoose.Schema({
	corrigendum_number : {type: String, required:true },
    order_number :   	 { type: String, required:true },
    order_date : 		 {type:String, required:true },
//  issuing_date:      	 { type: String , required:true},
//  storeofficer_id :  	 { type: String, required:true },
    ic_id:            	 { type: String, required:true },
    ic_date :  			 { type: String, required:true },
    inspector_name :  	 { type: String, required:true },
    inspector_mobile :	 { type:String, required:true },
    dycee_id : 				String
//  ic:              		InspectionCertificateSchema
},
{ collection: 'Corrigendum' },
{
timestamps: true
});

const InspectionReportSchema= mongoose.Schema({
  order_number : { type: String, required:true },
  ic_id:         { type: String, required:true },
  //item_details : ICItemInfoSchema,
  status:        { type: String, required:true }
},
{ collection: 'InspectionReport' },
{
timestamps: true
});

/*var CEE = mongoose.model('CEE', CEESchema);
var DyCEE = mongoose.model('DyCEE', DyCEESchema);
var Inspector = mongoose.model('Inspector', InspectorSchema);
var StoreOfficer = mongoose.model('StoreOfficer', StoreOfficerSchema);
var Vendor = mongoose.model('Vendor', VendorSchema);*/
var Logins = mongoose.model('Logins', LoginsSchema);
var Items = mongoose.model('Items',ItemSchema);
var PurchaseOrder = mongoose.model('PurchaseOrder',PurchaseOrderSchema);
var InspectionCertificate = mongoose.model('InspectionCertificate',InspectionCertificateSchema);
var Corrigendum = mongoose.model('Corrigendum', CorrigendumSchema);
var InspectionReport = mongoose.model('InspectionReport', InspectionReportSchema);
module.exports = {
/*  CEE:CEE,
  DyCEE:DyCEE,
  Inspector:Inspector,
  StoreOfficer:StoreOfficer,
  Vendor:Vendor,*/
  Logins:Logins,
  Items:Items,
  PurchaseOrder:PurchaseOrder,
  InspectionCertificate:InspectionCertificate,
  Corrigendum:Corrigendum,
  InspectionReport:InspectionReport
};
