var http = require('http');
var url = require("url");
var express = require("express");
var app = express();
var fs = require('fs');
var bodyParser = require("body-parser");
var data = require("./data.js");

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

var convertedVal = 0
var FromCurr = "Choose Currency";
var ToCurr = "Choose Currency";
var Val = 0 ;

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
    res.render("login");
    //res.render("Forexsystem", {friendsInEjs: frindsInApp.js});
    //res.redirect("/"); ///////app.post.....form action = /forex method = "POST"
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
})

app.listen(3000, function(){
    console.log("Listening on port 3000!");
});