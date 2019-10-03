var mongoose = require("mongoose");
var express = require("express");
var app = express();
var bodyParser = require("body-parser");

mongoose.connect("mongodb://localhost/forex_sys");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

//XML Schema

// Currency_Country : [ Currency_Name ] [ Country ]
var currencyCountrySchema = new mongoose.Schema({
    CurrencyName : String,
    Country : String
});

// Exchange_Rates : [ From_Currency To_Currency Timestamp ] Ex_Rate
var exchangeRatesSchema = new mongoose.Schema({
    FromCurrency : String,
    ToCurrency : String,
    Timestamp : Date,
    ExRate : Number
});

// Login_Details : [ Username ] Password Designation Country Department
var loginDetailsSchema = new mongoose.Schema({
    Username : String,
    Password : String,
    Designation : String,
    Country : String,
    Department : String
});

// BI : [ Timestamp Submitted_By Country ] Value_Eq
var BISchema = new mongoose.Schema({
    Timestamp : Date,
    SubmittedBy : String,
    CurrencyName : String,
    ValueEq : Number
});

// FDI : [ Timestamp Submitted_By Country ] Value_Eq
var FDISchema = new mongoose.Schema({
    Timestamp : Date,
    SubmittedBy : String,
    CurrencyName : String,
    ValueEq : Number
});

// DTT : [ Timestamp Country ] Value_Eq
var DTTSchema = new mongoose.Schema({
    Timestamp : Date,
    CurrencyName : String,
    ValueEq : Number
});

// TxnInventory : [ Timestamp Country ] Total_Value_Eq
var TxnInventorySchema = new mongoose.Schema({
    Timestamp : Date,
    CurrencyName : String,
    TotalValueEq : Number
});

//Notifications : [ username ] Timestamp notification 
var notificationsShema = new mongoose.Schema({
    Username : String,
    Timestamp : Date,
    Notification : String
});

var currencyCountry = mongoose.model("currencyCountry", currencyCountrySchema);
var exchangeRates = mongoose.model("exchangeRates",exchangeRatesSchema);
var loginDetails = mongoose.model("loginDetails", loginDetailsSchema);
var BI = mongoose.model("BI", BISchema);
var FDI = mongoose.model("FDI", FDISchema);
var DTT = mongoose.model("DTT", DTTSchema);
var TxnInventory = mongoose.model("TxnInventory", TxnInventorySchema);
var loginDetails = mongoose.model("loginDetails", loginDetailsSchema);
var notifications = mongoose.model("notifications",notificationsShema);

var convert = function (from,to,value,callback){

     return exchangeRates.find({FromCurrency : String(from), ToCurrency : String(to)}, function(err,exrate){
        if(err){
            console.log(err);
        } else {
            callback(Number(exrate[0].ExRate)*value); 
        }
    });
}

var login = function (usrn,pass,dept,callback){
    loginDetails.find({Username : String(usrn), Password : String(pass), Department : String(dept)}, function(err,details){
        if(err){
            console.log(err);
        } else {
            // console.log(details.length);
            if(details.length == 0){
                callback(false);
            } else {
                callback(details[0].Designation);
            }
        }
    });
}

var getNotifications = function(usrn,callback){
    notifications.find({Username : usrn},function(err,results){
        if(err){
            console.log(err);
        } else {
            // console.log(results);
            callback(results);
        }
    });
}



// convert("Dollar", "Rupees", 10, function (val){
//     console.log(val);
// });


module.exports = {
    convert : convert,
    login : login,
    getNotifications : getNotifications
}