const express = require("express");
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const img = fs.readFileSync(__dirname + "/img/Untitled-4.png");

const sql=require("./sql.js")


app.get("/", (req, res) => {
  res.send("hello World");
  //res.type("image/png").send(img);
});
app.get("/api/courses", (req, res) => {
  res.send([1, 2, 3, 4, 5]);
});
app.post("/api/courses", (req, res) => {});

app.get("/api/courses/:id", (req, res) => {
  res.status(200).type("json").send(req.params.id);
  //res.send(req.params.id);
});
app.get("/date", (req, res) => {
 var response = {
   text: "Hello World",
 };
  res.status(200).type("json").send(JSON.parse(response));
  //res.send(req.params.id);
});
//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listen ${port}`));

// app.post()
// app.put()
// app.delete()

//#region api get "/api/[chưc nang]"
app.get("/api/today/:name", (req, res) => {
  var date = new Date();
  res
    .status(200)
    .type("json")
    .send(
      `{"messages":[{"text":"Ch\u00e0o B\u1ea1n"},{"text":"H\u00f4n nay l\u00e0 ng\u00e0y:"},{"${date.toString()}"}]}`
    );
});
app.post("/sale", (req, res) => {
  //res.send("hello");
  // res.send(req.params.ID);
  // res.send("end");
  console.log("Got body:", req.body['userID']);
  var userID = req.body["userID"];
  var itemID = req.body["itemID"];
  var amount = req.body["amount"];
  sql.newBuy(userID,itemID,amount);
  res.sendStatus(200).send();
});
app.post("/hoadon", (req, res) => {
  //res.send("hello");
  // res.send(req.params.ID);
  // res.send("end");
  console.log("Got body:", req.body["userID"]);
  var userID = req.body["userID"];
  sql.newBuy(userID, itemID, amount);
  res.sendStatus(200).send();
});
//#endregion
