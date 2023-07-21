var x = ["VD1", "VD2"];
x = even["conversation"]["variables"]["VD"].split("\n");
var data = ["VD1", "VD2", "VD3", "VD4", "VD5"];
// Cách định nghĩa một hàm trong JS
// function [Tên Hàm]{
//}
function create(title, value, ID) {
      // kiểu dictionary (từ điển)
  /*
    dict={
        key:value;  } 
    
    */
  var res = {
    title: title,
    value: value,
    payload: {
      goToBlock: ID,
    },
  };
  return res;
}
// cách lấy chiều dài 1 mảng  [tên mang].length
for (let i = 0; i < data.length; i++) {
  for (let j = 0; j < x.length; j++) {
    if (data[i] == x[i]) {
      data[i] = "";
    }
  }
}
var quickResponse = [];
for (let i = 0; i < data.length; i++) {
  if (data[i] != "") {
    quickResponse.push(create(data[i], data[i])); // [tên mảng].push([phần tử]) : chèn thêm phần tử vào mảng
  }
}
var result = {
  text: "Hello World",
  quick_replies: quickResponse,
};

console.log(result);
