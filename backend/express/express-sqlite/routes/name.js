var express = require("express");
var router = express.Router();
var namemd = require("../model/namemd.js");

var sql = require("../model/sql.js");
/* GET home page. */
router.get("/", function (req, res, next) {
  //let x=[];
  // xa().then((msg) => res.send(msg));
  // res.render("name.ejs", { nameData: x });
  //namemd.all().then((x) => res.render("name.ejs", { nameData: x }));

  sql.getAllre().then((x) => res.render("name.ejs", { nameData: x }));
});
router.post("/add", (req, res) => {
  console.log(req.body);
  sql.insertName(req.body["name"]);
  sql.getAll().then((x) => res.status(200).send(x));
  //res.send("ok").render("index.ejs")
  //res.send("Name: " + req.body['name'])
});
router.put("/edit/:id", (req,res)=>{
  sql.editName(req.params.id,req.body["name"])
  sql.getAll().then((x) => res.status(200).send(x));
})
router.delete("/delete/:id",(req,res)=>{
  sql.deleteName(req.params.id);
  sql.getAll().then((x) => res.status(200).send(x));
})
module.exports = router;

// async function xa(){
//     let x = await sql.getAll()
//     console.log(x)
// }
// xa()
