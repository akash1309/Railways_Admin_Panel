const mongoose = require('mongoose');

const BeneficiarySchema = mongoose.Schema({
    PUID: String,
    BUID: String,
	Name: String,
	eMail: String,
	phoneNumber: String,
	isBlocked: String,
    otherInfo: String,
	extraInfo: String

}, {
    timestamps: true
});

const TransactionSchema = mongoose.Schema({
    PostedUID: String,
    LUID: String,
    BOUID: String,
    PAmount: String,
    Type: String,
    InterestRate: String,
    InterestDuration: String, 
    InterestType: String, 
    TDate: String,
    Medium: String, 
    PromiseDate: String,
    Mortagage: String, 
    TotalAmount: String, 
    ImageUrl: String, 
    Locations: String,
    Remarks: String, 
    SettleUp: String, 
    SettleUpDate: String,
    isTBlocked: String, 
    deleted: String, 
    otherInfo: String,
    extraInfo: String,
}, {
    timestamps: true
});

const UserNotificationSchema = mongoose.Schema({
    ActionUID: String,
	AffectedUID: String,
	ActionMsg: String,
	AffectedMsg: String,
    Icon: String,
    extraInfo: String
}, {
    timestamps: true
});

const PromotionalNotificationSchema = mongoose.Schema({
    SenderID:  String,
    toWhom:  String,
	Heading:  String,
	Content:  String,
	extraInfo: String
}, {
    timestamps: true
});

var Beneficiary = mongoose.model('Beneficiary', BeneficiarySchema);
var Transaction = mongoose.model('Transaction', TransactionSchema);
var UserNotification = mongoose.model('UserNotification', UserNotificationSchema);
var PromotionalNotification = mongoose.model('PromotionalNotification', PromotionalNotificationSchema);
module.exports = {Beneficiary: Beneficiary,Transaction: Transaction,UserNotification: UserNotification,PromotionalNotification: PromotionalNotification};
