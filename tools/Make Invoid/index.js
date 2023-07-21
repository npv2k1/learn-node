var express = require("express");
var app = express();
app.use(express.static("./public")); // show for user Ex: html,css,js
app.set("view engine", "ejs");
app.set("views", "./views"); // views dictionary
var server = require("http").Server(app);
var io = require("socket.io")(server);

// listen
server.listen(7777);







// listen socket io
io.on("connection", function (socket) {
  console.log("Connecting to socket: " + socket.id);

  socket.on("disconnect", function () {
    console.log("disConnecting to socket: " + socket.id);
  });
  
});



app.get("/", function (req, res) {
  res.render("trangchu");
});
app.get('/time',(req,res)=>{

      var date = new Date();

      // Lấy số thứ tự của ngày hiện tại
      var current_day = date.getDay();
    res.send(current_day.toString());


});