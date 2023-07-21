var path = require("path");
var sql = require("./aadb.js");
async function all() {
  await sql.open(path.resolve(__dirname, 'name.db'));
  let x = await sql.all("SELECT * FROM name");
  console.log(x);
  return x;
}
module.exports=  {all}