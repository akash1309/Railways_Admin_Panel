const mongoose = require('mongoose');

const CEESchema = mongoose.Schema({
  Name:    { type: String, required: true  },
	email:    { type: String, required: true  },
  phoneNumber:    { type: String, required: true  },
	password:    { type: String, required: true  },
	location: String

}, {
    timestamps: true
});

const DyCEESchema = mongoose.Schema({
  Name:    { type: String, required: true  },
  email:    { type: String, required: true  },
  phoneNumber:    { type: String, required: true  },
  password:    { type: String, required: true  },
  CEE_id : {type: String,required: true},
  location: String

}, {
    timestamps: true
});

const InspectorSchema = mongoose.Schema({
  Name:    { type: String, required: true  },
  email:    { type: String, required: true  },
  phoneNumber:    { type: String, required: true  },
  password:    { type: String, required: true  },
  DyCEE_id : {type: String,required: true},
  location: String
}, {
    timestamps: true
});

const VendorSchema = mongoose.Schema({
  Name:    { type: String, required: true  },
  email:    { type: String, required: true  },
  phoneNumber:    { type: String, required: true  },
  password:    { type: String, required: true  },
  StoreOfficer_id : {type: String,required: true},
  location: String
}, {
    timestamps: true
});
const StoreOfficerSchema = mongoose.Schema({
  Name:    { type: String, required: true  },
  email:    { type: String, required: true  },
  phoneNumber:    { type: String, required: true  },
  password:    { type: String, required: true  },
  DyCEE_id : {type: String,required: true},
  location: String
}, {
    timestamps: true
});

var CEE = mongoose.model('CEE', CEESchema);
var DyCEE = mongoose.model('DyCEE', DyCEESchema);
var Inspector = mongoose.model('Inspector', InspectorSchema);
var StoreOfficer = mongoose.model('StoreOfficer', StoreOfficerSchema);
var Vendor = mongoose.model('Vendor', VendorSchema);
module.exports = {CEE:CEE, DyCEE:DyCEE ,Inspector:Inspector,StoreOfficer:StoreOfficer,Vendor:Vendor};
