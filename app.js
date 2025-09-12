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
const mongoose = require('mongoose');
const app = express();

// Middleware
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// MongoDB setup
mongoose.connect("mongodb+srv://sainisahilpreet2005_db_user:axsmPhedVKzuQvg2@sahil-db.3tfxixf.mongodb.net/?retryWrites=true&w=majority&appName=sahil-db");

const trySchema = new mongoose.Schema({
    name: String,
    priority: { type: String, default: "Low" }
});

const Item = mongoose.model("task", trySchema);

// Show all tasks
app.get("/", function(req, res) {
    const alert = req.query.alert;
    Item.find({})
        .then(foundItems => {
            res.render("list", { dayej: foundItems, alert });
        })
        .catch(err => {
            res.render("list", { dayej: [], alert: "Error loading tasks" });
        });
});

// Add task
app.post("/", function(req, res) {
    const itemName = req.body.ele1;
    const priority = req.body.priority || "Low";
    if (!itemName || itemName.trim() === "") {
        return res.redirect("/?alert=" + encodeURIComponent("Please enter a task"));
    }
    const todo4 = new Item({ name: itemName, priority });
    todo4.save()
        .then(() => {
            res.redirect("/?alert=" + encodeURIComponent("Task added successfully!"));
        })
        .catch(err => {
            res.redirect("/?alert=" + encodeURIComponent("Error adding task"));
        });
});

// Delete task
app.post("/delete/:id", function(req, res) {
    const id = req.params.id;
    Item.findByIdAndDelete(id)
        .then(() => {
            res.redirect("/?alert=" + encodeURIComponent("Task deleted successfully!"));
        })
        .catch(err => {
            res.redirect("/?alert=" + encodeURIComponent("Error deleting task"));
        });
});

// Edit task page
app.get("/edit/:id", function(req, res) {
    Item.findById(req.params.id)
        .then(task => {
            if (!task) return res.redirect("/?alert=Task not found");
            res.render("edit", { task });
        })
        .catch(err => {
            res.redirect("/?alert=Error loading edit form");
        });
});

// Edit task submission
app.post("/edit/:id", function(req, res) {
    const { ele1, priority } = req.body;
    if (!ele1 || ele1.trim() === "") {
        return res.redirect("/?alert=" + encodeURIComponent("Task title cannot be empty!"));
    }
    Item.findByIdAndUpdate(req.params.id, { name: ele1, priority })
        .then(() => {
            res.redirect("/?alert=" + encodeURIComponent("Task updated successfully!"));
        })
        .catch(err => {
            res.redirect("/?alert=" + encodeURIComponent("Error updating task"));
        });
});

// Start server
app.listen(3000, function() {
    console.log("Server Started on port 3000");
});