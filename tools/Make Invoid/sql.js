var mysql = require("mysql");
var con;
function connect() {
    con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "mydb",
    });
}
const inv=require('./invoice.js');

function btnclick(nam, nten, nsoluong, ndongia, ntong) {
    var tb = $(".rwd-table");
    var node = document.createElement("tr");

    var ma = document.createElement("td");
    ma.id = "ma";
    ma.textContent = "01";
    node.appendChild(ma);

    var ten = document.createElement("td");
    ten.id = "ten";
    ten.textContent = "01";
    node.appendChild(ten);

    var soluong = document.createElement("td");
    soluong.id = "soluong";
    soluong.textContent = "01";
    node.appendChild(soluong);

    var dongia = document.createElement("td");
    dongia.id = "ma";
    dongia.textContent = "01";
    node.appendChild(dongia);

    var tong = document.createElement("td");
    tong.id = "ma";
    tong.textContent = "01";
    node.appendChild(tong);
    tb.append(node);
}
// con.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected!");
//   con.query("CREATE DATABASE mydb", function (err, result) {
//     if (err) throw err;
//     console.log("Database created");
//   });
// });
function newUser(id, fullname, phone, address) {
    connect();
    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        var sql =
            "INSERT INTO `user` (`ID`, `Full name`, `Phone`, `Address`) VALUES ('" +
            id +
            "', '" +
            fullname +
            "', '" +
            phone +
            "', '" +
            address +
            "')";
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });
    });
}
function newBuy(userid, itemid, amount) {
    connect();
    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        var sql =
            "INSERT INTO `log` (`ID`, `user id`, `item id`, `amount`) VALUES (''," +
            "'" +
            userid +
            "', '" +
            itemid +
            "', '" +
            amount +
            "')";
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });
    });
}
function getUserInfo(userid) {
    connect();
    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = "SELECT * FROM `user` WHERE id=" + userid;
        con.query(sql, function (err, result) {
            if (err) throw err;

            //console.log(result[0]);
            var string = JSON.stringify(result);
            //console.log(string);
            var json = JSON.parse(string);
            console.log(json);
            console.log(json[0]["ID"]);
            console.log(json[0]["Full name"]);
        });
    });
}
function getItemInfo(itemid, amount) {
    var item = {
        item: "TC 100",
        description: "Toner Cartridge",
        quantity: `${amount}`,
        amount: 0,
    };
    connect();
    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = "SELECT * FROM `item` WHERE ID=" + itemid;
        console.log(sql);
        con.query(sql, function (err, result) {
            if (err) throw err;
            var string = JSON.stringify(result);
            var json = JSON.parse(string);
            //console.log(json)
            item.item = json[0]["Name"];
            item.amount = parseInt(json[0]["don gia"]) * parseInt(amount);
            item.description = json[0]["des"];
            console.log(item);            
        });
        return item;
    });
}
function getLog(userid) {
    let invoice = {
      shipping: {
        name: "",
        address: "",
        city: "",
        state: "",
        country: "",
        postal_code: 94111,
      },
      items: [
        {
          item: "",
          description: "",
          quantity: 0,
          amount: 6000,
        },
      ],
      subtotal: 0,
      paid: 0,
      invoice_nr: 1234,
    };
    connect();
    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = "SELECT * FROM `log` WHERE `user id`=" + userid;
        console.log(sql);
        var json; 
        con.query(sql, function (err, result) {
            if (err) throw err;

            var string = JSON.stringify(result);
            var json = JSON.parse(string);
            for(var i=0;i<json.length;i++){
                var item=getItemInfo(json[i]['item id'],json[i]['amount']).
                //console.log(item)
                invoice.items.push(item);
            }
            
            // inv.createInvoice(invoice, "invoice.pdf");
            //console.log(invoice);
        
        });
    });
}

//getItemInfo(1, 2);

//getLog(101)

//getUserInfo(101);
//newUser("101",'nguyen',"0985035331",'ha noi');
module.exports = { newUser, newBuy, getUserInfo };
