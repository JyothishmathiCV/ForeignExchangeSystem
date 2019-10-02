var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/cat_app");

var catSchema = new mongoose.Schema({
    name : String,
    age : Number,
    temperament : String
});

var Cat = mongoose.model("Cat", catSchema);

// var kitty = new Cat({
//     name : "kitty",
//     age : 5,
//     temperament : "good"
// });

// Cat.create({
//     name : "kit",
//     age : 1,
//     temperament : "mild"
// },function(err,cat){
//     if(err){
//         console.log(err);
//     } else {
//         console.log("added");
//     }
// });

Cat.find({},function(err,cats){
    if(err){
        console.log(err);
    } else {
        console.log("Found");
        console.log(cats);
    }
});