const express = require("express");
const bodyParser = require("body-parser");
const res = require("express/lib/response");

const app = express();

let items = ["Buy food", "Cook", "Have dinner", "Play"];
let workItems = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", function(req, res){

    let today = new Date();
    
    let options = {
        weekday : "long",
        day : "numeric",
        month : "long"
    };

    let day = today.toLocaleDateString("en-US", options);

    res.render("list", {ListTitle: day, newListItems: items});

});

app.post("/", function(req, res){
    let item = req.body.newItem;
    items.push(item);

    res.redirect("/");
});

app.get("/work", function(){
    res.render("list", {ListTitle: "Work List", newListItems: workItems})
})

app.post("/work", function(req, res){
    let item = req.body.newItem;
    res.redirect("/work")
})

app.listen(3000, function(){
    console.log("Server on port 3000");
})