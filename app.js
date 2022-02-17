const express = require("express");
const bodyParser = require("body-parser");
const res = require("express/lib/response");
const date = require(__dirname + "date.js")
const app = express();

const items = ["Buy food", "Cook", "Have dinner", "Play"];
const workItems = [];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

//----------- Diary list ------------

app.get("/", function(req, res){

    const day = date.getDate();
    res.render("list", {listTitle: day, newListItems: items});

});

app.post("/", function(req, res){

    const item = req.body.newItem;

    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work")
    }else{
        items.push(item);
        res.redirect("/");
    }
   
});

// -----------Work List -------------

app.get("/work", (req, res) => {
        res.render("list", {listTitle: "Work List", newListItems: workItems });
    });

app.post("/work", function(req, res){
    const item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work")
})

app.listen(3000, function(){
    console.log("Server on port 3000");
})