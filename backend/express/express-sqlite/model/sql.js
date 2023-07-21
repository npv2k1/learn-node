var path = require("path");
const sqlite3 = require("sqlite3").verbose();
var db;
var params = [];

db = new sqlite3.Database(
  path.resolve(__dirname, "name.db"),
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      console.log("message");
    }
    console.log("Connected to the in-memory SQlite database.");
  }
);

try {
  db.run(
    "CREATE TABLE IF NOT EXISTS name (name_id INTEGER PRIMARY KEY, name TEXT NOT NULL)",
    params,
    (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log("Create Table");
    }
  );
} catch (err) {
  console.log("err");
}
function insertName(name) {
  let sql = `INSERT INTO name (name_id,name) values (NULL, '${name}') `;
  console.log(sql);
  db.run(sql, params, (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log(`${name} insert`);
  });
}
function editName(name_id, newName) {
  let sql = `UPDATE name SET name = '${newName}' WHERE name.name_id = ${name_id}`;
  console.log(sql);
  db.run(sql, params, (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log(`${name_id} edit ${newName}`);
  });
}
function deleteName(name_id ) {
  let sql = `DELETE FROM name WHERE name_id='${name_id}'`;
  console.log(sql);
  db.run(sql, params, (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log(`${name_id} delete`);
  });
}
function getAll() {
  return new Promise(function (resolve, reject) {
    if (params == undefined) params = [];

    db.all("SELECT * FROM name", params, function (err, rows) {
      if (err) reject("Read error: " + err.message);
      else {
        resolve(rows);
      }
    });
  });
}
function getAllre() {
  return new Promise(function (resolve, reject) {
    if (params == undefined) params = [];

    db.all(
      "SELECT * FROM name ORDER BY name_id DESC",
      params,
      function (err, rows) {
        if (err) reject("Read error: " + err.message);
        else {
          resolve(rows);
        }
      }
    );
  });
}
module.exports = { getAll ,insertName,editName,deleteName,getAllre};
