const sqlite3 = require("sqlite3").verbose();
var db;

function con(){

    db = new sqlite3.Database(
      "./name.db",
      sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
      (err) => {
        if (err) {
          return("message");
        }
        return("Connected to the in-memory SQlite database.");
      }
    );
  
}






var params = [];
// try {
//     db.run("CREATE TABLE IF NOT EXISTS name (name_id INTEGER PRIMARY KEY, name TEXT NOT NULL)", params, (err) => {
//         if (err) {
//             return console.error(err.message)
//         }
//         console.log("Create Table")
//     })
// }
// catch(err) {
//     console.log("err");
// }
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

function getAll() {
  return new Promise(function (resolve, reject) {
      con()
      if (params == undefined) params = [];

      db.all("SELECT * FROM name", params, function (err, rows) {
        if (err) reject("Read error: " + err.message);
        else {
          resolve(rows);
        }
      });
   
    
  });
}
// let getALL = new Promise((resole, reject) => {
//    let sql = "SELECT * from name";
//    console.log(sql);
//    db.serialize(()=>{
//         db.all(sql, params, (err, res) => {
//        if (err) {
//          reject("err");
//        }
//        console.log(res);
//        resole("1")
//      });
//    })
// });
//insertName("Linh", "");
//editName(1,"minh")
//var x = getAll().then((x) => console.log(x));
//getALL.then(x=>console.log(x))
function test() {
  return "Hello";
}
// db.close((err) => {
//     if (err) {
//         return console.error(err.message);
//     }
//     console.log('Close the database connection.');
// });
module.exports = { getAll, test };
