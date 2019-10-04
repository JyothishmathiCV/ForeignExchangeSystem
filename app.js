var http = require('http');
var url = require("url");
var express = require("express");
var app = express();
var fs = require('fs');
var bodyParser = require("body-parser");
var data = require("./data.js");
var cookieParser = require("cookie-parser");


app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.set("view engine","ejs");

var convertedVal = 0
var FromCurr = "Choose Currency";
var ToCurr = "Choose Currency";
var Val = 0 ;
var usrn = "";
var dept = "";
var designation = "";

app.get("/", function(req,res){
    res.render("conversion",{convertedVal : convertedVal, FromCurr : FromCurr, ToCurr : ToCurr, InputVal : Val});
    //res.render("Forexsystem", {friendsInEjs: frindsInApp.js});
    //res.redirect("/"); ///////app.post.....form action = /forex method = "POST"
    convertedVal = 0
    FromCurr = "Choose Currency";
    ToCurr = "Choose Currency";
    Val = 0 ;
});


app.get("/login.ejs", function(req,res){
    res.clearCookie('My details');
    res.render("login");
});

app.get("/bi_officer.ejs", function(req,res){
    data.getNotifications(String(req.cookies['My details'].usrn),function(results){
        // console.log(results[0]['Notification']);
        res.render("bi_officer",{
            usern : String(req.cookies['My details'].usrn),
            desgn : String(req.cookies['My details'].designation),
            dept : String(req.cookies['My details'].dept),
            notifications : results
        }); 
    });   
});

app.get("/exrate_conversion_user.ejs",function(req,res){
    res.render("exrate_conversion_user",{
        convertedVal : convertedVal, 
        FromCurr : FromCurr, 
        ToCurr : ToCurr,
        Username : String(req.cookies['My details'].usrn),
        Designation : String(req.cookies['My details'].designation),
        Department : String(req.cookies['My details'].dept)
    });
    convertedVal = 0
    FromCurr = "Choose Currency";
    ToCurr = "Choose Currency";
});

app.get("/biofficer_print.ejs",function(req,res){
    res.render("biofficer_printnotes",{
        usern : String(req.cookies['My details'].usrn),
        desgn : String(req.cookies['My details'].designation),
        dept : String(req.cookies['My details'].dept)
    });
});

app.get("/fdi_officer.ejs", function(req,res){
    // res.send(String(req.cookies['My details'].dept) +  String(req.cookies['My details'].designation) );           
    data.getNotifications(String(req.cookies['My details'].usrn),function(results){
        // console.log(results[0]['Notification']);
        res.render("fdi_officer",{
            usern : String(req.cookies['My details'].usrn),
            desgn : String(req.cookies['My details'].designation),
            dept : String(req.cookies['My details'].dept),
            notifications : results
        }); 
    }); 
});

app.get("/dtt_officer.ejs", function(req,res){
    // res.send(String(req.cookies['My details'].dept) +  String(req.cookies['My details'].designation) );           
    data.getNotifications(String(req.cookies['My details'].usrn),function(results){
        // console.log(results[0]['Notification']);
        res.render("dtt_officer",{
            usern : String(req.cookies['My details'].usrn),
            desgn : String(req.cookies['My details'].designation),
            dept : String(req.cookies['My details'].dept),
            notifications : results
        }); 
    }); 
});

app.get("/bank_activity.ejs",function(req,res){
    // res.send(String(req.cookies['My details'].dept) +  String(req.cookies['My details'].designation) );
    data.getNotifications(String(req.cookies['My details'].usrn),function(results){
        // console.log(results[0]['Notification']);
        res.render("bank_activity",{
            usern : String(req.cookies['My details'].usrn),
            desgn : String(req.cookies['My details'].designation),
            dept : String(req.cookies['My details'].dept),
            notifications : results
        }); 
    }); 
});

app.get("/biauthority.ejs",function(req,res){
    // res.send(String(req.cookies['My details'].dept) +  String(req.cookies['My details'].designation) );
    data.getNotifications(String(req.cookies['My details'].usrn),function(results){
        // console.log(results[0]['Notification']);
        res.render("biauthority",{
            usern : String(req.cookies['My details'].usrn),
            desgn : String(req.cookies['My details'].designation),
            dept : String(req.cookies['My details'].dept),
            notifications : results
        }); 
    }); 
});

app.get("/biauthority_print.ejs",function(req,res){
    res.render("biauthority_printnotes",{
        usern : String(req.cookies['My details'].usrn),
        desgn : String(req.cookies['My details'].designation),
        dept : String(req.cookies['My details'].dept)
    });
});

app.get("/authority.ejs",function(req,res){
    // res.send(String(req.cookies['My details'].dept) +  String(req.cookies['My details'].designation) );
    data.getNotifications(String(req.cookies['My details'].usrn),function(results){
        // console.log(results[0]['Notification']);
        res.render("authority",{
            usern : String(req.cookies['My details'].usrn),
            desgn : String(req.cookies['My details'].designation),
            dept : String(req.cookies['My details'].dept),
            notifications : results
        }); 
    }); 
});

app.get("/company_activity.ejs",function(req,res){
    // res.send(String(req.cookies['My details'].dept) +  String(req.cookies['My details'].designation) );
    data.getNotifications(String(req.cookies['My details'].usrn),function(results){
        // console.log(results[0]['Notification']);
        res.render("company_activity",{
            usern : String(req.cookies['My details'].usrn),
            desgn : String(req.cookies['My details'].designation),
            dept : String(req.cookies['My details'].dept),
            notifications : results
        }); 
    }); 
});

app.get("/bi_submit.ejs",function(req,res){
    if(String(req.cookies['My details'].designation) == "Officer"){
        data.getCountry(String(req.cookies['My details'].usrn),function(country){
            console.log(country);
            data.getName("Bank","Chairman",country,function(name){
                console.log(name);
                data.gethistory(name,"Bank",function(results){
                    // console.log(results);
                    res.render("bi_submit",{
                        usern : String(req.cookies['My details'].usrn),
                        desgn : String(req.cookies['My details'].designation),
                        dept : String(req.cookies['My details'].dept),
                        history : results
                    });
                });
            });
        });
    } else {
        data.getCountry(String(req.cookies['My details'].usrn),function(country){
            console.log(country);
            data.getName("BI","Officer",country,function(name){
                console.log(name);
                data.gethistory(name,"BI",function(results){
                    // console.log(results);
                    res.render("bi_submit",{
                        usern : String(req.cookies['My details'].usrn),
                        desgn : String(req.cookies['My details'].designation),
                        dept : String(req.cookies['My details'].dept),
                        history : results
                    });
                });
            });
        });
    }
    
    
});

app.get("/fdi_submit.ejs",function(req,res){
    data.getCountry(String(req.cookies['My details'].usrn),function(country){
        console.log(country);
        data.getName("Company","CEO",country,function(name){
            console.log(name);
            data.gethistory(name,"Company",function(results){
                // console.log(results);
                res.render("fdi_submit",{
                    usern : String(req.cookies['My details'].usrn),
                    desgn : String(req.cookies['My details'].designation),
                    dept : String(req.cookies['My details'].dept),
                    history : results
                });
            });
        });
    });
    
});

app.get("/bank_submit.ejs",function(req,res){
    res.render("bank_submit",{
        usern : String(req.cookies['My details'].usrn),
        desgn : String(req.cookies['My details'].designation),
        dept : String(req.cookies['My details'].dept)
        // history : results
    });            
});

app.get("/company_submit.ejs",function(req,res){
    res.render("company_submit",{
        usern : String(req.cookies['My details'].usrn),
        desgn : String(req.cookies['My details'].designation),
        dept : String(req.cookies['My details'].dept)
        // history : results
    });            
});

app.get("/authority_activity.ejs",function(req,res){ 
    if(String(req.cookies['My details'].dept) == "FDI"){
        data.getCountry(String(req.cookies['My details'].usrn),function(country){
            console.log(country);
            data.getName("FDI","Officer",country,function(name){
                console.log(name);
                data.gethistory(name,"FDI",function(results){
                    // console.log(results);
                    res.render("authority_activity",{
                        usern : String(req.cookies['My details'].usrn),
                        desgn : String(req.cookies['My details'].designation),
                        dept : String(req.cookies['My details'].dept),
                        history : results
                    });
                });
            });
        });
    } else if (String(req.cookies['My details'].dept) == "DTT"){
        data.getCountry(String(req.cookies['My details'].usrn),function(country){
            console.log(country);
            data.getName("DTT","Officer",country,function(name){
                console.log(name);
                data.gethistory(name,"DTT",function(results){
                    // console.log(results);
                    res.render("authority_activity",{
                        usern : String(req.cookies['My details'].usrn),
                        desgn : String(req.cookies['My details'].designation),
                        dept : String(req.cookies['My details'].dept),
                        history : results
                    });
                });
            });
        });
    } else if (String(req.cookies['My details'].dept) == "CentralFinanceDepartment"){
        var all_results = []
        data.getCountry(String(req.cookies['My details'].usrn),function(country){
            console.log(country);
            data.getName("DTT","Chairman",country,function(name){
                console.log(name);
                data.gethistory(name,"DTT",function(dtt_results){
                    all_results=all_results.concat(dtt_results);
                    data.getName("FDI","Officer",country,function(name){
                        console.log(name);
                        data.gethistory(name,"FDI",function(fdi_results){
                            all_results=all_results.concat(fdi_results);
                            data.getName("BI","Officer",country,function(name){
                                console.log(name);
                                data.gethistory(name,"BI",function(bi_results){
                                    all_results=all_results.concat(bi_results);
                                        console.log(all_results);
                                        res.render("authority_activity",{
                                        usern : String(req.cookies['My details'].usrn),
                                        desgn : String(req.cookies['My details'].designation),
                                        dept : String(req.cookies['My details'].dept),
                                        history : all_results
                                    });
                                    
                                });
                            });
                        });
                    });
                    
                });
            });
        });
    }
    
});

app.post("/convert", function(req,res){
    var fromcurr = req.body.from;
    var tocurr = req.body.to;
    var val = req.body.val;
    data.convert(fromcurr,tocurr,val,function(results){
        convertedVal = results;
        FromCurr = fromcurr;
        ToCurr = tocurr;
        Val = val ;
        res.redirect("/");
    });
});

app.post("/logindet",function(req,res){
    usrn = req.body.username;
    var pass = req.body.password;
    dept = req.body.dept;
    data.login(usrn,pass,dept,function(results){
        // console.log(results);
        if(results == false){
            //handle cases
            res.redirect("/login.ejs");
        } else {
            designation = results;
            res.cookie('My details',{ usrn : String(usrn) , dept : String(dept) , designation : String(designation)});
            if (String(designation) == "Officer"){
                switch(String(dept)){
                    case "BI" : res.redirect("/bi_officer.ejs");break;
                    case "DTT" :  res.redirect("/dtt_officer.ejs");break;
                    case "FDI" :  res.redirect("/fdi_officer.ejs");break;
                }
            } else if(String(designation) == "Chairman") {
                switch(String(dept)){
                    case "Bank" : res.redirect("/bank_activity.ejs");break;//-------------------- activity - submit
                    // case "Company" : res.redirect("/company_activity.ejs");break;
                    case "FDI" : res.redirect("/authority.ejs");break;
                    case "DTT" : res.redirect("/authority.ejs");break;
                }

            } else if(String(designation) == "CEO") {
                res.redirect("/company_activity.ejs");//--------------- activity submit
            } else if(String(designation) == "Governor") {
                res.redirect("/biauthority.ejs"); 

            } else if(String(designation) == "FinancialHead") {
                res.redirect("/authority.ejs"); //------------------ submit activity
            }else {
                res.send("Failure");
            }
        }
    });
});

app.post("/officer_home",function(req,res){
    if(String(req.cookies['My details'].designation) != "Officer"){
        if(String(req.cookies['My details'].dept) == "BI"){
            res.redirect("/biauthority.ejs");
        } else if (String(req.cookies['My details'].dept) == "DTT"){
            res.redirect("/authority.ejs");            
        } else if (String(req.cookies['My details'].dept) == "FDI"){
            res.redirect("/authority.ejs");
        } else if (String(req.cookies['My details'].dept) == "Bank"){
            res.redirect("/bank_activity.ejs");
        } else if (String(req.cookies['My details'].dept) == "Company"){
            res.redirect("/company_activity.ejs");
        } else if (String(req.cookies['My details'].dept) == "CentralFinanceDepartment"){
            res.redirect("/authority.ejs");
        }
    } else {
        if(String(req.cookies['My details'].dept) == "BI"){
            res.redirect("/bi_officer.ejs");
        } else if (String(req.cookies['My details'].dept) == "DTT"){
            res.redirect("/dtt_officer.ejs");
        } else if (String(req.cookies['My details'].dept) == "FDI"){
            res.redirect("/fdi_officer.ejs");
        } 
    }
});

app.post("/authority_home",function(req,res){
    if(String(req.cookies['My details'].dept) == "BI"){
        res.redirect("/biauthority.ejs");
    } else if (String(req.cookies['My details'].dept) == "DTT"){
        res.redirect("/authority.ejs");
    } else if (String(req.cookies['My details'].dept) == "FDI"){
        res.redirect("/authority.ejs");
    } else if (String(req.cookies['My details'].dept) == "CentralFinanceDepartment"){
        res.redirect("/authority.ejs");
    }
});

app.post("/gen_conversion",function(req,res){
    res.redirect("/exrate_conversion_user.ejs");
});

app.post("/convertUser", function(req,res){
    var fromcurr = req.body.from;
    var tocurr = req.body.to;
    // var val = req.body.val;
    data.convertUser(fromcurr,tocurr,function(results){
        convertedVal = results;
        FromCurr = fromcurr;
        ToCurr = tocurr;
        // Val = val ;
        res.redirect("/exrate_conversion_user.ejs");
    });
});

// ---------------------------------------------------------
app.post("/officer_submit",function(req,res){ 
    if(String(req.cookies['My details'].dept) == "BI"){
        res.redirect("/bi_submit.ejs");
    } else if(String(req.cookies['My details'].dept) == "FDI"){
        res.redirect("/fdi_submit.ejs");
    } else if(String(req.cookies['My details'].dept) == "DTT"){
        res.send("DTT OFFICER SUBMIT");
    }
    
});

app.post("/authority_submit",function(req,res){ 
    if(String(req.cookies['My details'].dept) == "BI"){
        res.redirect("/bi_submit.ejs");
    } else if(String(req.cookies['My details'].dept) == "DTT"){
        res.redirect("/authority_activity.ejs");
    } else if(String(req.cookies['My details'].dept) == "FDI"){
        res.redirect("/authority_activity.ejs");
    } else if(String(req.cookies['My details'].dept) == "Bank"){
        res.redirect("/bank_submit.ejs");
    } else if(String(req.cookies['My details'].dept) == "Company"){
        res.redirect("/company_submit.ejs");
    } else if(String(req.cookies['My details'].dept) == "CentralFinanceDepartment"){
        res.redirect("/authority_activity.ejs");
    }
    
});

// ----------------------------------------------------------

app.post("/bi_officer_printnotes",function(req,res){
    res.redirect("/biofficer_print.ejs");
});

app.post("/bi_authority_printnotes",function(req,res){
    res.redirect("/biauthority_print.ejs");
});

app.post("/print_notes_authority",function(req,res){
    var value = req.body.from_value;
    var SubmittedBy = String(req.cookies['My details'].usrn);
    data.getCountry(SubmittedBy,function(results){
        console.log("Country " + String(results));
        var submittedTo = "";
        if(String(results) == "India"){
            submittedTo = "Ram";
        } else {
            submittedTo = "Sam";
        }
        data.notify("Print notes value " + String(value),submittedTo, function(resp){
        console.log("Submitted!!!!");
        console.log(resp);
        res.redirect("/biauthority_printnotes.ejs");
        });
    });
});

app.post("/print_notes",function(req,res){
    var ValueEq = Number(req.body.from_value);
    var SubmittedBy = String(req.cookies['My details'].usrn);
    data.getCountry(SubmittedBy,function(results){
        console.log("Country " + String(results));
        data.getCurrencyName(results,function(rest){
            console.log("CurrencyName " + String(rest));
            data.submit(SubmittedBy, rest, ValueEq,"Liquid Cash", "BI", function(reslts){
                if(reslts == true){
                    var submittedTo = "";
                    if(String(results) == "India"){
                        submittedTo = "Rakhi";
                    } else {
                        submittedTo = "Riya";
                    }
                    data.notify("Notes Printed Submitted",submittedTo, function(resp){
                        console.log("Submitted!!!!");
                        console.log(resp);
                        res.redirect("/biofficer_print.ejs");
                    });
                } else {
                    res.send("Invalid");
                }
            });
        });
    });
});

app.post("/valeq_submit",function(req,res){
    if(String(req.cookies['My details'].designation) == "Officer" && String(req.cookies['My details'].dept) == "BI"){
        var ValueEq = Number(req.body.new_valeq);
        var CurrencyType = String(req.body.from);
        var SubmittedBy = String(req.cookies['My details'].usrn);
        data.getCountry(SubmittedBy,function(results){
            console.log("Country " + String(results));
            data.getCurrencyName(results,function(rest){
                console.log("CurrencyName " + String(rest));
                data.submit(SubmittedBy, rest, ValueEq,CurrencyType, "BI", function(reslts){
                    if(reslts == true){
                        var submittedTo = "";
                        if(String(results) == "India"){
                            submittedTo = "Rakhi";
                        } else {
                            submittedTo = "Riya";
                        }
                        data.notify("New Value Eq Submitted",submittedTo, function(resp){
                            console.log("Submitted!!!!");
                            console.log(resp);
                            res.redirect("/bi_submit.ejs");
                        });
                    } else {
                        res.send("Invalid");
                    }
                });
            });
        });
    } else if (String(req.cookies['My details'].designation) == "Officer" && String(req.cookies['My details'].dept) == "FDI"){
        var ValueEq = Number(req.body.new_valeq);
        console.log("Yippeee");
        var CurrencyType = String(req.body.from);
        var SubmittedBy = String(req.cookies['My details'].usrn);
        data.getCountry(SubmittedBy,function(results){
            console.log("Country " + String(results));
            data.getCurrencyName(results,function(rest){
                console.log("CurrencyName " + String(rest));
                data.submit(SubmittedBy, rest, ValueEq,CurrencyType, "FDI", function(reslts){
                    if(reslts == true){
                        var submittedTo = "";
                        if(String(results) == "India"){
                            submittedTo = "Rohan";
                        } else {
                            submittedTo = "Ron";
                        }
                        data.notify("New Value Eq Submitted",submittedTo, function(resp){
                            console.log("Submitted!!!!");
                            console.log(resp);
                            res.redirect("/fdi_submit.ejs");
                        });
                    } else {
                        res.send("Invalid");
                    }
                });
            });
        });
    } else if(String(req.cookies['My details'].designation) == "Governor" && String(req.cookies['My details'].dept) == "BI"){
        var ValueEq = Number(req.body.new_valeq);
        var CurrencyType = String(req.body.from);
        var SubmittedBy = String(req.cookies['My details'].usrn);
        data.getCountry(SubmittedBy,function(results){
            console.log("Country " + String(results));
            data.getCurrencyName(results,function(rest){
                console.log("CurrencyName " + String(rest));
                var submittedTo = "";
                        if(String(results) == "India"){
                            submittedTo = "Ramesh";
                        } else {
                            submittedTo = "Robin";
                        }
                        data.notify("New Value Eq Submitted BI",submittedTo, function(resp){
                            console.log("Submitted!!!!");
                            console.log(resp);
                            res.redirect("/bi_submit.ejs");
                        });
            });
        });
    } else if(String(req.cookies['My details'].designation) == "Chairman" && String(req.cookies['My details'].dept) == "FDI"){
        var ValueEq = Number(req.body.new_valeq);
        var CurrencyType = String(req.body.from);
        var SubmittedBy = String(req.cookies['My details'].usrn);
        data.getCountry(SubmittedBy,function(results){
            console.log("Country " + String(results));
            data.getCurrencyName(results,function(rest){
                console.log("CurrencyName " + String(rest));
                var submittedTo = "";
                        if(String(results) == "India"){
                            submittedTo = "Ramesh";
                        } else {
                            submittedTo = "Robin";
                        }
                        data.notify("New Value Eq Submitted FDI",submittedTo, function(resp){
                            console.log("Submitted!!!!");
                            console.log(resp);
                            res.redirect("/authority_activity.ejs");
                        });
            });
        });
    } else if(String(req.cookies['My details'].designation) == "Chairman" && String(req.cookies['My details'].dept) == "DTT"){
        // console.log("Heyy");
        var ValueEq = Number(req.body.from_value);
        var CurrencyType = "Tax";
        var SubmittedBy = String(req.cookies['My details'].usrn);
        data.getCountry(SubmittedBy,function(results){
            console.log("Country " + String(results));
            data.getCurrencyName(results,function(rest){
                console.log("CurrencyName " + String(rest));
                data.submit(SubmittedBy, rest, ValueEq,CurrencyType, "DTT", function(reslts){
                    if(reslts == true){
                        var submittedTo = "";
                        if(String(results) == "India"){
                            submittedTo = "Ramesh";
                        } else {
                            submittedTo = "Robin";
                        }
                        data.notify("New Value Eq Submitted DTT",submittedTo, function(resp){
                            console.log("Submitted!!!!");
                            console.log(resp);
                            res.redirect("/authority_activity.ejs");
                        });
                    } else {
                        res.send("Invalid");
                    }
                });
            });
        });
    } else if(String(req.cookies['My details'].designation) == "Chairman" && String(req.cookies['My details'].dept) == "Bank"){
        //
        var ValueEq = Number(req.body.from_value);
        var CurrencyType = String(req.body.type);
        var SubmittedBy = String(req.cookies['My details'].usrn);
        data.getCountry(SubmittedBy,function(results){
            console.log("Country " + String(results));
            data.getCurrencyName(results,function(rest){
                console.log("CurrencyName " + String(rest));
                data.submit(SubmittedBy, rest, ValueEq,CurrencyType, "Bank", function(reslts){
                    if(reslts == true){
                        var submittedTo = "";
                        if(String(results) == "India"){
                            submittedTo = "Ram";
                        } else {
                            submittedTo = "Sam";
                        }
                        data.notify("New Value Eq Submitted Bank",submittedTo, function(resp){
                            console.log("Submitted!!!!");
                            console.log(resp);
                            res.redirect("/bank_submit.ejs");
                        });
                    } else {
                        res.send("Invalid");
                    }
                });
            });
        });
    } else if(String(req.cookies['My details'].designation) == "CEO" && String(req.cookies['My details'].dept) == "Company"){
        //
        var ValueEq = Number(req.body.from_value);
        var CurrencyType = String(req.body.type);
        var SubmittedBy = String(req.cookies['My details'].usrn);
        data.getCountry(SubmittedBy,function(results){
            console.log("Country " + String(results));
            data.getCurrencyName(results,function(rest){
                console.log("CurrencyName " + String(rest));
                data.submit(SubmittedBy, rest, ValueEq,CurrencyType, "Company", function(reslts){
                    if(reslts == true){
                        var submittedTo = "";
                        if(String(results) == "India"){
                            submittedTo = "Priya";
                        } else {
                            submittedTo = "Perk";
                        }
                        data.notify("New Value Eq Submitted Company",submittedTo, function(resp){
                            console.log("Submitted!!!!");
                            console.log(resp);
                            res.redirect("/company_submit.ejs");
                        });
                    } else {
                        res.send("Invalid");
                    }
                });
            });
        });
    }
    
});

app.post("/calc_ex_rate",function(req,res){
    var TotalValueEq = Number(req.body.TotalValueEq);
    var CurrencyType = "";
    var SubmittedBy = String(req.cookies['My details'].usrn);
    data.getCountry(SubmittedBy,function(results){
        console.log("Country " + String(results));
        data.getCurrencyName(results,function(rest){
            console.log("CurrencyName " + String(rest));
            data.submit(SubmittedBy, rest, TotalValueEq,CurrencyType, "CentralFinanceDepartment", function(reslts){
                
                    data.calculateExRate(function(exrates){
                        if(exrates == true){
                            
                            var submittedTo = "";
                            if(String(results) == "India"){
                                submittedTo = "Ramesh";
                            } else {
                                submittedTo = "Robin";
                            }
                            data.notify("New Value Eq Submitted TXNInventory",submittedTo, function(resp){
                                console.log("Submitted!!!!");
                                console.log(resp);
                                res.redirect("/authority_activity.ejs");
                            });
                        } 
                    });
                    
                
                });
            });
        });
});

app.post("/broadcast",function(req,res){
    data.notifyAll("New exchange rate calculated!", function(resp){
        console.log("Yipee!!!!");
        console.log(resp);
        res.redirect("/authority_activity.ejs");
    });
});

app.post("/bank_home",function(req,res){
    res.redirect("/bank_activity.ejs");
});

app.post("/bank_activity_p",function(req,res){
    //-----------------------------------------------------------
    res.send("Bank Activity");
});

app.listen(3000, function(){
    console.log("Listening on port 3000!");
});