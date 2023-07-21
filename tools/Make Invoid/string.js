var x;
try{
    x = event["conversation"]["variables"]["VD"].split("\n");
}
catch{
    x=[""];
}
let data = ["Học phí", "Thời khoá biểu", "Chương trình đào tạo", "Cơ sở vật chất", "Khác"];

function createVanDe(title, value, ID) {
  let vanDe = {
    title: title,
    value: value,
    payload: {
      goToBlock: ID,
    },
  };
  return vanDe;
}
var quickResponse = [];
// loại bỏ trùng lặp.
for (let i = 0; i < x.length; i++) {
  for (let j = 0; j < data.length; j++) {
    if (x[i]==data[j]) {
      data[j]="";
    }
  }
}
for (let j = 0; j < data.length; j++) {
   if (data[j]!="") {
    quickResponse.push(createVanDe(data[j], data[j]));
   }   
 }

var res = {
  text: "OK",
  quick_replies: quickResponse,
};
//done(res);
console.log(res);
