const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const _ = require("lodash");
const fs = require("fs");

const port = 4000;

let db = require("./db.json");
let users = require("./user.json");

// xử lý json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// xử lý cors
app.use(cors());

app.get("/", (req, res) => {
  // console.log(req)
  res.send(db);
});

app.get("/:email", (req, res) => {
  let email = req.params.email;

  let user = _.find(users, { email: email });
  console.log("user", user, email);
  // console.log(req)
  res.send(user);
});


app.post('/login', (req, res) => {
  const { email, password } = req.body;
  // 
  let user = _.find(users, { email: email });
  // 
  if (user && user.password === password) {
    res.send({
      status: "success",
      user: user
    });
  }
  else {
    res.send({
      status: "fail",
      message: "Email hoặc mật khẩu không đúng"
    });
  }

})


app.post("/", (req, res) => {
  const dt = req.body;
  console.log(dt);

  db.push(dt);
  // return res.send(db);
  fs.writeFileSync("./db.json", JSON.stringify(db), (err) => {
    if (err) {
      console.log(err);
    }
  });

  return res.send({ message: "ok" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
