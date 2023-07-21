//var buffer = new Buffer("Hello","UTF-8")
var fs=require("fs");
var noidung=fs.readFileSync(__dirname+"/ds.txt");
console.log(noidung);
console.log(noidung.toString());
// var buffer = new Buffer("Hello","UTF-8")
// console.log(buffer)
// // buffer >>string
// console.log(buffer.toString());
// console.log(buffer.toJSON());