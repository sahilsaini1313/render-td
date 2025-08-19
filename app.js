// const express= require('express');
// const bodyParser = require('body-parser');


// var app = express();
// app.set("view engine", "ejs");

// app.use(express.static("public"));

// app.use(express.urlencoded({ extended: true }));

// var items = [];

// app.get("/", function(req, res){
//     res.render("list", {ejes : items});
// });

// app.post("/", function(req, res){
//     var item = req.body.ele1;
//     items.push(item);
//     res.redirect("/");
// });



// app.listen(8000, function(){
//   console.log("Server started");
// });


const express = require('express');
const bodyParser = require('body-parser');
var app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/todo");
const trySchema = new mongoose.Schema({
    name: String
});

const item = mongoose.model("task", trySchema);

// todo1.save();
// todo2.save();
// todo3.save();
app.get("/", function(req, res) {
    item.find({})
        .then(foundItems => {
            res.render("list", { dayej: foundItems });
        })
        .catch(err => {
            console.log(err);
        });
});

app.post("/", function(req, res) {
    const itemName = req.body.ele1;
    const todo4 = new item({
        name: itemName
    });
    todo4.save()
        .then(() => {
            res.redirect("/");
        })
        .catch(err => {
            console.log(err);
        });
});
app.post("/delete", function(req, res) {
    const checked = req.body.checkbox1;
    item.findByIdAndDelete(checked)
        .then(() => {
            console.log("Deleted successfully");
            res.redirect("/");
        })
        .catch(err => {
            console.log(err);
        });
});



    app.listen(3000, function() {
    console.log("Server Started");
});