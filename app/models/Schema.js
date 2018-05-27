const mongoose = require('mongoose');

const CEESchema = mongoose.Schema({
  Name:         { type: String, required: true  },
	email:        { type: String, required: true  },
  phoneNumber:  { type: String, required: true  },
	password:     { type: String, required: true  },
	location:     String
},
{
  timestamps: true
});

const DyCEESchema = mongoose.Schema({
  Name:        { type: String, required: true  },
  email:       { type: String, required: true  },
  phoneNumber: { type: String, required: true  },
  password:    { type: String, required: true  },
  CEE_id :     { type: String, required: true  },
  location:    String

},
{
  timestamps: true
});

const InspectorSchema = mongoose.Schema({
  Name:        { type: String, required: true  },
  email:       { type: String, required: true  },
  phoneNumber: { type: String, required: true  },
  password:    { type: String, required: true  },
  DyCEE_id :   { type: String, required: true  },
  location:    String
},
{
  timestamps: true
});

const VendorSchema = mongoose.Schema({
  Name:             { type: String, required: true  },
  email:            { type: String, required: true  },
  phoneNumber:      { type: String, required: true  },
  password:         { type: String, required: true  },
  StoreOfficer_id : { type: String, required: true  },
  location:         String
},
{
  timestamps: true
});

const StoreOfficerSchema = mongoose.Schema({
  Name:        { type: String, required: true  },
  email:       { type: String, required: true  },
  phoneNumber: { type: String, required: true  },
  password:    { type: String, required: true  },
  DyCEE_id :   { type: String, required: true  },
  location:    String
},
{
    timestamps: true
});

const ItemInfoSchema= mongoose.Schema({
  Specification: { type:String , required:true },
  QuantityRate:  { type: String, required:true },
  DutiesCharges: { type: String, required:true },
  DeliveryDate:  { type: String, required:true },
},
{
  timestamps: true
});

const VendorInfoSchema= mongoose.Schema({
  Code:     { type:String , required:true },
  email :   { type: String, required:true },
  address : { type: String, required:true },
},
{
  timestamps: true
});

const TenderInfoSchema= mongoose.Schema({
  TenderNo:     { type:String , required:true },
  TenderType :  { type: String, required:true },
  OpenedOn :    { type: String, required:true },
},
{
  timestamps: true
});

const PurchaseOrderSchema= mongoose.Schema({
    OrderNumber :       { type: String, required:true },
    OrderDate :         { type: String, required:true },
    phoneNumber:        { type:String,  required:true },
    password :          { type: String, required:true },
    StoreOfficer_id :   { type: String, required:true },
    Itemdetails :       ItemInfoSchema;
    VendorInfo:         VendorInfoSchema;
    TenderInfo:         TenderInfoSchema;
    location :          { type: String, required:true },
    Ic_id:              { type: String, required:true },
},
{
  timestamps: true
});

const ICItemInfoSchema= mongoose.Schema({
  Specification:    { type:String , required:true },
  QuantityRate :    { type: String, required:true },
  DutiesCharges :   { type: String, required:true },
  DeliveryDate :    { type: String, required:true },
  QuantityOffered:  { type: String, required:true },
  QuantityApproved: { type: String, required:true },
},
{
  timestamps: true
});

const InspectionCertificateSchema= mongoose.Schema({
  OrderNumber :      { type: String, required:true },
  phoneNumber:       { type: String, required:true },
  password :         { type: String, required:true },
  StoreOfficer_id :  { type: String, required:true },
  Itemdetails :      ICItemInfoSchema;
  VendorInfo:        VendorInfoSchema;
  TenderInfo:        TenderInfoSchema;
  location :         { type: String, required:true },
  Ic_id:             { type: String, required:true },
  Inspection_Date :  { type: String, required:true },
  InspectionName :   { type: String, required:true },
},
{
timestamps: true
});

const CorrigendumSchema= mongoose.Schema({
  OrderNumber :     { type: String, required:true },
  Issuing_Date:     { type:String , required:true },
  StoreOfficer_id : { type: String, required:true },
  Ic_id:            { type: String, required:true },
  IcIssuingDate :   { type: String, required:true },
  Ic:               InspectionCertificateSchema;
},
{
timestamps: true
});

const CertificateSchema= mongoose.Schema({
  OrderNumber : { type: String, required:true },
  Itemdetails : ICItemInfoSchema;
  Status:       { type; String, required:true },
},
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
module.exports = {CEE:CEE, DyCEE:DyCEE ,Inspector:Inspector,StoreOfficer:StoreOfficer,Vendor:Vendor,PurchaseOrder:PurchaseOrder,InspectionCertificate:InspectionCertificate,Corrigendum:Corrigendum,Certificate:Certificate};
