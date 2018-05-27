const mongoose = require('mongoose');

const CEESchema = mongoose.Schema({
  name:         { type: String, required: true  },
	email:        { type: String, required: true  },
  mobile:       { type: String, required: true  },
	password:     { type: String, required: true  },
	location:     String
},
{ collection: 'CEE' },
{
  timestamps: true
});

const DyCEESchema = mongoose.Schema({
  name:        { type: String, required: true  },
  email:       { type: String, required: true  },
  mobile:      { type: String, required: true  },
  password:    String,
  cee_id :     { type: String, required: true  },
  location:    String
},
{ collection: 'DyCEE' },
{
  timestamps: true
});

const InspectorSchema = mongoose.Schema({
  name:        { type: String, required: true  },
  email:       { type: String, required: true  },
  mobile:      { type: String, required: true  },
  password:    String,
  dycee_id :   { type: String, required: true  },
  location:    String
},
{ collection: 'Inspector' },
{
  timestamps: true
});

const VendorSchema = mongoose.Schema({
  name:             { type: String, required: true  },
  email:            { type: String, required: true  },
  mobile:           { type: String, required: true  },
  password:         String,
  storeofficer_id : { type: String, required: true  },
  location:         String
},
{ collection: 'Vendor' },
{
  timestamps: true
});

const StoreOfficerSchema = mongoose.Schema({
  name:        { type: String, required: true  },
  email:       { type: String, required: true  },
  mobile:      { type: String, required: true  },
  password:    { type: String, required: true  },
  dycee_id :   { type: String, required: true  },
  location:    String
},
{ collection: 'StoreOfficer' },
{
    timestamps: true
});

const ItemInfoSchema= mongoose.Schema({
  specification:  { type:String , required:true },
  duantity_rate:  { type: String, required:true },
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
    mobile:             { type:String,  required:true },
    password :          { type: String, required:true },
    storeofficer_id :   { type: String, required:true },
    itemdetails :       ItemInfoSchema,
    vendor_info:        VendorInfoSchema,
    tender_info:        TenderInfoSchema,
    location :          { type: String, required:true },
    ic_id:              { type: String, required:true }
},
{ collection: 'PurchaseOrder' },
{
  timestamps: true
});

const ICItemInfoSchema= mongoose.Schema({
  specification:     { type:String , required:true },
  quantity_rate :    { type: String, required:true },
  duties_charges :   { type: String, required:true },
  delivery_date :    { type: String, required:true },
  quantity_offered:  { type: String, required:true },
  quantity_approved: { type: String, required:true }
},
{
  timestamps: true
});

const InspectionCertificateSchema= mongoose.Schema({
  order_number :      { type: String, required:true },
  mobile:             { type: String, required:true },
  password :          { type: String, required:true },
  storeofficer_id :   { type: String, required:true },
  item_details :      ICItemInfoSchema,
  vendor_info:        VendorInfoSchema,
  tender_info:        TenderInfoSchema,
  location :          { type: String, required:true },
  ic_id:              { type: String, required:true },
  inspection_date :   { type: String, required:true },
  inspection_name :   { type: String, required:true }
},
{ collection: 'InspectionCertificate' },
{
timestamps: true
});

const CorrigendumSchema= mongoose.Schema({
  order_number :     { type: String, required:true },
  issuing_date:      { type: String , required:true},
  storeofficer_id :  { type: String, required:true },
  ic_id:             { type: String, required:true },
  ic_issuing_date :  { type: String, required:true },
  ic:                InspectionCertificateSchema
},
{ collection: 'Corrigendum' },
{
timestamps: true
});

const CertificateSchema= mongoose.Schema({
  order_number : { type: String, required:true },
  item_details : ICItemInfoSchema,
  status:        { type: String, required:true }
},
{ collection: 'Certificate' },
{
timestamps: true
});

var CEE = mongoose.model('CEE', CEESchema);
var DyCEE = mongoose.model('DyCEE', DyCEESchema);
var Inspector = mongoose.model('Inspector', InspectorSchema);
var StoreOfficer = mongoose.model('StoreOfficer', StoreOfficerSchema);
var Vendor = mongoose.model('Vendor', VendorSchema);
var PurchaseOrder = mongoose.model('PurchaseOrder',PurchaseOrderSchema);
var InspectionCertificate = mongoose.model('InspectionCertificate',InspectionCertificateSchema);
var Corrigendum = mongoose.model('Corrigendum', CorrigendumSchema);
var Certificate = mongoose.model('Certificate', CertificateSchema);
module.exports = {
  CEE:CEE,
  DyCEE:DyCEE,
  Inspector:Inspector,
  StoreOfficer:StoreOfficer,
  Vendor:Vendor,
  PurchaseOrder:PurchaseOrder,
  InspectionCertificate:InspectionCertificate,
  Corrigendum:Corrigendum,
  Certificate:Certificate
};
