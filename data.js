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
    CurrencyType : String,
    ValueEq : Number
});

// FDI : [ Timestamp Submitted_By Country ] Value_Eq
var FDISchema = new mongoose.Schema({
    Timestamp : Date,
    SubmittedBy : String,
    CurrencyName : String,
    CurrencyType : String,
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

var convertUser = function (from,to,callback){

    return exchangeRates.find({FromCurrency : String(from), ToCurrency : String(to)}, function(err,exrate){
       if(err){
           console.log(err);
       } else {
        //    console.log(exrate[0].ExRate);
           callback(Number(exrate[0].ExRate)); 
       }
   });
}

var submit = function (SubmittedBy,CurrencyName,ValueEq,CurrencyType,Department,callback){
    if (Department == "BI"){
        BI.create({
            Timestamp : new Date(),
            SubmittedBy : SubmittedBy,
            CurrencyName : CurrencyName,
            CurrencyType : CurrencyType,
            ValueEq : ValueEq
        }, function(err, curr){
            if(err){
                console.log(err);
            } else {
                console.log("IN BI");
                console.log(curr);
                callback(true);
            }
        });
    } else if (Department == "FDI"){
        console.log("Yeah");
        FDI.create({
            Timestamp : new Date(),
            SubmittedBy : SubmittedBy,
            CurrencyName : CurrencyName,
            CurrencyType : CurrencyType,
            ValueEq : ValueEq
        }, function(err, curr){
            if(err){
                console.log(err);
            } else {
                console.log(curr);
                callback(true);
            }
        });
    } else if (Department == "DTT"){
        //
        DTT.create({
            Timestamp : new Date(),
            CurrencyName : CurrencyName,
            CurrencyType : "Tax",
            ValueEq : ValueEq
        }, function(err, curr){
            if(err){
                console.log(err);
            } else {
                console.log(curr);
                callback(true);
            }
        });
    } else if (Department == "CentralFinanceDepartment"){
        //
        TxnInventory.update({
            // Timestamp : new Date(),
            CurrencyName : CurrencyName,
            // TotalValueEq : ValueEq
        },{
            $set : {
                Timestamp : new Date(),
                TotalValueEq : ValueEq
            }
        } ,function(err, curr){
            if(err){
                console.log(err);
            } else {
                console.log(curr);
                callback(true);
            }
        });
    } else if (Department == "Bank"){
        //
        BI.create({
            Timestamp : new Date(),
            SubmittedBy : SubmittedBy,
            CurrencyName : CurrencyName,
            CurrencyType : CurrencyType,
            TotalValueEq : ValueEq
        }, function(err, curr){
            if(err){
                console.log(err);
            } else {
                console.log(curr);
                callback(true);
            }
        });
    } else if (Department == "Company"){
        //
        FDI.create({
            Timestamp : new Date(),
            SubmittedBy : SubmittedBy,
            CurrencyName : CurrencyName,
            CurrencyType : CurrencyType,
            TotalValueEq : ValueEq
        }, function(err, curr){
            if(err){
                console.log(err);
            } else {
                console.log(curr);
                callback(true);
            }
        });
    }
}

var getCountry = function(name, callback){
    loginDetails.find({Username : String(name)},function(err,res){
        if(err){
            console.log(err);
        } else {
            callback(res[0]["Country"]);
        }
    });
}

var getCurrencyName = function(Country, callback){
    currencyCountry.find({Country : String(Country)},function(err,res){
        if(err){
            console.log(err);
        } else {
            callback(res[0]["CurrencyName"]);
        }
    });
}

var notify = function (message,submittedTo,callback){
    notifications.create({
        Username : submittedTo,
        Timestamp : new Date(),
        Notification : message
    },function(err,res){
        if(err){
            console.log(err);
        } else {
            console.log(res);
            callback(true);
        }
    });
}

var gethistory = function(usrn,dept,callback){
    if(String(dept) == "BI"){
        BI.find({SubmittedBy : String(usrn)},function(err,results){
            if(err){
                console.log(err);
            } else {
                console.log(results);
                callback(results);
            }
        });
    } else if(String(dept) == "FDI"){
        FDI.find({SubmittedBy : String(usrn)},function(err,results){
            if(err){
                console.log(err);
            } else {
                // console.log(results);
                callback(results);
            }
        });
    } else if(String(dept) == "DTT"){
        DTT.find({SubmittedBy : String(usrn)},function(err,results){
            if(err){
                console.log(err);
            } else {
                // console.log(results);
                callback(results);
            }
        });
    } else if(String(dept) == "Bank"){
        BI.find({SubmittedBy : String(usrn)},function(err,results){
            if(err){
                console.log(err);
            } else {
                // console.log(results);
                callback(results);
            }
        });
    } else if(String(dept) == "Company"){
        FDI.find({SubmittedBy : String(usrn)},function(err,results){
            if(err){
                console.log(err);
            } else {
                // console.log(results);
                callback(results);
            }
        });
    }
    
}

var getName = function(dept,Designation,Country,callback){
    loginDetails.find({
        Designation : String(Designation), 
        Country : String(Country), 
        Department : String(dept)
    }, function(err,details){
        if(err){
            console.log(err);
        } else {
            // console.log(details.length);
            if(details.length == 0){
                callback(false);
            } else {
                callback(details[0].Username);
            }
        }
    });
} 
// FromCurrency : String,
//     ToCurrency : String,
//     Timestamp : Date,
// //     ExRate : Number
// Timestamp : new Date(),
//             CurrencyName : CurrencyName,
//             TotalValueEq : ValueEq

var calculateExRate = function (callback){
    exchangeRates.find({},function(err,resp){
        if(err){
            console.log(err);
        } else {
            for(var i=0; i<resp.length; i++){
                var fromCurrency = resp[i].FromCurrency;
                var toCurrency = resp[i].ToCurrency;
                TxnInventory.find({CurrencyName : String(fromCurrency)},function(err,resp2){
                    if(err){
                        console.log(err);
                    } else {
                        var fromTot = resp2[0]["TotalValueEq"];
                        TxnInventory.find({CurrencyName : String(toCurrency)},function(err,resp3){
                            if(err){
                                console.log(err);
                            } else {
                                var toTot = resp3[0]["TotalValueEq"];
                                var newExRate = toTot/fromTot;
                                exchangeRates.update({
                                    FromCurrency : String(fromCurrency), 
                                    ToCurrency : String(toCurrency)},
                                    {$set: {ExRate : Number(newExRate)
                                    }}, function(err,resp4){
                                        if(err){
                                            console.log(err);
                                        } else {
                                            callback(true);
                                        }

                                });
                            }
                        });
                    }
                });
            }
        }
    });
}

var notifyAll = function(message, callback){
    loginDetails.find({},function(err,resp){
        if(err){
            console.log(err);
        } else {
            for(var i =0; i<resp.length; i++){
                var submittedTo = resp[i].Username;
                notifications.create({
                    Username : submittedTo,
                    Timestamp : new Date(),
                    Notification : message
                },function(err,res){
                    if(err){
                        console.log(err);
                    } else {
                        console.log(res);
                    }
                });
            }
            callback(true);
        }
    });
    
}

// convert("Dollar", "Rupees", 10, function (val){
//     console.log(val);
// });


module.exports = {
    convert : convert,
    login : login,
    getNotifications : getNotifications,
    convertUser : convertUser,
    submit : submit,
    getCountry : getCountry,
    getCurrencyName : getCurrencyName,
    notify : notify,
    gethistory : gethistory,
    getName : getName,
    calculateExRate : calculateExRate,
    notifyAll : notifyAll
}