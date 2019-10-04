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
    CurrencyType :String,
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

// currencyCountry.create({
//     CurrencyName : "Dollar",
//     Country : "USA"
// }, function(err, curr){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(curr);
//     }
// });

// currencyCountry.create({
//     CurrencyName : "Rupees",
//     Country : "India"
// }, function(err, curr){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(curr);
//     }
// });
// exchangeRates.create({
//     FromCurrency : "Rupees",
//     ToCurrency : "Dollar",
//     Timestamp : new Date(),
//     ExRate : 0.014
// }, function(err, curr){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(curr);
//     }
// });

// exchangeRates.create({
//     FromCurrency : "Dollar",
//     ToCurrency : "Rupees",
//     Timestamp : new Date(),
//     ExRate : 71.22
// }, function(err, curr){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(curr);
//     }
// });

// loginDetails.create({
//     Username : "Ram",
//     Password : "123",
//     Designation : "Officer",
//     Country : "India",
//     Department : "BI"
// }, function(err, curr){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(curr);
//     }
// });

// loginDetails.create({
//     Username : "Sam",
//     Password : "1234",
//     Designation : "Officer",
//     Country : "USA",
//     Department : "BI"
// }, function(err, curr){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(curr);
//     }
// });

// loginDetails.create({
//     Username : "Shyam",
//     Password : "123",
//     Designation : "Officer",
//     Country : "India",
//     Department : "DTT"
// }, function(err, curr){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(curr);
//     }
// });

// loginDetails.create({
//     Username : "Samuel",
//     Password : "1234",
//     Designation : "Officer",
//     Country : "USA",
//     Department : "DTT"
// }, function(err, curr){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(curr);
//     }
// });

// loginDetails.create({
//     Username : "Priya",
//     Password : "123",
//     Designation : "Officer",
//     Country : "India",
//     Department : "FDI"
// }, function(err, curr){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(curr);
//     }
// });

// loginDetails.create({
//     Username : "Perk",
//     Password : "1234",
//     Designation : "Officer",
//     Country : "USA",
//     Department : "FDI"
// }, function(err, curr){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(curr);
//     }
// });

// loginDetails.create({
//     Username : "Krishna",
//     Password : "123",
//     Designation : "Chairman",
//     Country : "India",
//     Department : "Bank"
// }, function(err, curr){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(curr);
//     }
// });

// loginDetails.create({
//     Username : "George",
//     Password : "1234",
//     Designation : "Chairman",
//     Country : "USA",
//     Department : "Bank"
// }, function(err, curr){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(curr);
//     }
// });

// loginDetails.create({
//     Username : "Janani",
//     Password : "123",
//     Designation : "CEO",
//     Country : "India",
//     Department : "Company"
// }, function(err, curr){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(curr);
//     }
// });

// loginDetails.create({
//     Username : "Janet",
//     Password : "1234",
//     Designation : "CEO",
//     Country : "USA",
//     Department : "Company"
// }, function(err, curr){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(curr);
//     }
// });

// loginDetails.create({
//     Username : "Rakhi",
//     Password : "123",
//     Designation : "Governor",
//     Country : "India",
//     Department : "BI"
// }, function(err, curr){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(curr);
//     }
// });

// loginDetails.create({
//     Username : "Riya",
//     Password : "1234",
//     Designation : "Governor",
//     Country : "USA",
//     Department : "BI"
// }, function(err, curr){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(curr);
//     }
// });

// loginDetails.create({
//     Username : "Rohan",
//     Password : "123",
//     Designation : "Chairman",
//     Country : "India",
//     Department : "FDI"
// }, function(err, curr){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(curr);
//     }
// });

// loginDetails.create({
//     Username : "Ron",
//     Password : "1234",
//     Designation : "Chairman",
//     Country : "USA",
//     Department : "FDI"
// }, function(err, curr){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(curr);
//     }
// });

// loginDetails.create({
//     Username : "Mani",
//     Password : "123",
//     Designation : "Chairman",
//     Country : "India",
//     Department : "DTT"
// }, function(err, curr){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(curr);
//     }
// });

// loginDetails.create({
//     Username : "Mandy",
//     Password : "1234",
//     Designation : "Chairman",
//     Country : "USA",
//     Department : "DTT"
// }, function(err, curr){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(curr);
//     }
// });

// loginDetails.create({
//     Username : "Ramesh",
//     Password : "123",
//     Designation : "FinancialHead",
//     Country : "India",
//     Department : "CentralFinanceDepartment"
// }, function(err, curr){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(curr);
//     }
// });

// loginDetails.create({
//     Username : "Robin",
//     Password : "1234",
//     Designation : "FinancialHead",
//     Country : "USA",
//     Department : "CentralFinanceDepartment"
// }, function(err, curr){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(curr);
//     }
// });

// BI.create({
//     Timestamp : new Date(),
//     SubmittedBy : "Ram",
//     CurrencyName : "Rupees",
//     ValueEq : 100*71.22
// }, function(err, curr){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(curr);
//     }
// });

// BI.create({
//     Timestamp : new Date(),
//     SubmittedBy : "Sam",
//     CurrencyName : "Dollar",
//     ValueEq : 100
// }, function(err, curr){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(curr);
//     }
// });

// FDI.create({
//     Timestamp : new Date(),
//     SubmittedBy : "Priya",
//     CurrencyName : "Rupees",
//     ValueEq : 0
// }, function(err, curr){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(curr);
//     }
// });

// FDI.create({
//     Timestamp : new Date(),
//     SubmittedBy : "Perk",
//     CurrencyName : "Dollar",
//     ValueEq : 0
// }, function(err, curr){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(curr);
//     }
// });

// DTT.create({
//     Timestamp : new Date(),
//     CurrencyName : "Rupees",
//     ValueEq : 0
// }, function(err, curr){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(curr);
//     }
// });

// DTT.create({
//     Timestamp : new Date(),
//     CurrencyName : "Dollar",
//     ValueEq : 0
// }, function(err, curr){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(curr);
//     }
// });

// TxnInventory.create({
//     Timestamp : new Date(),
//     CurrencyName : "Rupees",
//     TotalValueEq : 7122
// }, function(err, curr){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(curr);
//     }
// });

// TxnInventory.create({
//     Timestamp : new Date(),
//     CurrencyName : "Dollar",
//     TotalValueEq : 100
// }, function(err, curr){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(curr);
//     }
// });

// notifications.create({
//     Username : "Ram",
//     Timestamp : new Date(),
//     Notification : "Bank CEO submitted data"
// });

BI.create({
    Timestamp : new Date(),
    SubmittedBy : "Krishna",
    CurrencyName : "Rupees",
    CurrencyType : "Liquid Cash",
    ValueEq : 10
}, function(err, curr){
    if(err){
        console.log(err);
    } else {
        console.log(curr);
    }
});