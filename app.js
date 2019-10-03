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
        console.log(results[0]['Notification']);
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

// -------------------------------------------------------------------------------------------------------
app.get("/fdi_officer.ejs", function(req,res){
    res.send(String(req.cookies['My details'].dept) +  String(req.cookies['My details'].designation) );           
});

app.get("/dtt_officer.ejs", function(req,res){
    res.send(String(req.cookies['My details'].dept) +  String(req.cookies['My details'].designation) );           
});

app.get("/bank_activity.ejs",function(req,res){
    res.send(String(req.cookies['My details'].dept) +  String(req.cookies['My details'].designation) );
});

app.get("/company_activity.ejs",function(req,res){
    res.send(String(req.cookies['My details'].dept) +  String(req.cookies['My details'].designation) );   
});

app.get("/authority.ejs",function(req,res){
    res.send(String(req.cookies['My details'].dept) +  String(req.cookies['My details'].designation) );
});
app.get("/company_activity.ejs",function(req,res){
    res.send(String(req.cookies['My details'].dept) +  String(req.cookies['My details'].designation) );
});
app.get("/biauthority.ejs",function(req,res){
    res.send(String(req.cookies['My details'].dept) +  String(req.cookies['My details'].designation) );
});
app.get("/financialhead_activity.ejs",function(req,res){
    res.send(String(req.cookies['My details'].dept) +  String(req.cookies['My details'].designation) );
});
// -----------------------------------------------------------------------------------------------------------


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
                    case "Bank" : res.redirect("/bank_activity.ejs");break;
                    // case "Company" : res.redirect("/company_activity.ejs");break;
                    case "FDI" : res.redirect("/authority.ejs");break;
                    case "DTT" : res.redirect("/authority.ejs");break;
                }

            } else if(String(designation) == "CEO") {
                res.redirect("/company_activity.ejs");
            } else if(String(designation) == "Governor") {
                res.redirect("/biauthority.ejs");
            } else if(String(designation) == "FinancialHead") {
                res.redirect("/financialhead_activity.ejs");
            }else {
                res.send("Failure");
            }
        }
    });
});

app.post("/officer_home",function(req,res){
    if(String(req.cookies['My details'].dept) == "BI"){
        res.redirect("/bi_officer.ejs");
    } else if (String(req.cookies['My details'].dept) == "DTT"){
        res.redirect("/dtt_officer.ejs");
    } else if (String(req.cookies['My details'].dept) == "FDI"){
        res.redirect("/fdi_officer.ejs");
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
        res.send("BI OFFICER SUBMIT");
    } else if(String(req.cookies['My details'].dept) == "DTT"){
        res.send("DTT OFFICER SUBMIT");
    } else if(String(req.cookies['My details'].dept) == "FDI"){
        res.send("FDI OFFICER SUBMIT");
    }
    
});

app.post("/bi_officer_printnotes",function(req,res){
    res.send("BI OFFICER PRINT NOTES");
});

// ----------------------------------------------------------

app.listen(3000, function(){
    console.log("Listening on port 3000!");
});