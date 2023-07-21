var x;
try {
  x = event["conversation"]["variables"]["van_de_quan_tam"].split("\n");
} catch {
  x = [""];
}
var data = [
  "Học phí",
  "Chương trình học",
  "Chế độ dinh dưỡng",
  "Thời khóa biểu",
  "Các vấn đề khác",
];
function createVanDe(title, value, ID) {
  var vanDe = {
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
    if (x[i] == data[j]) {
      data[j] = "";
    }
  }
}
for (let j = 0; j < data.length; j++) {
  if (data[j] == "Các vấn đề khác") {
    quickResponse.push(
      createVanDe(data[j], data[j], "s0d98b480-4694-4ab1-ba86-2ba43e0358e8")
    );
  } else if (data[j] != "") {
    quickResponse.push(
      createVanDe(data[j], data[j], "sb78e5b37-0512-4003-a7aa-b4b65d4eee80")
    );
  }
}
var res = {
  text: "Hãy chọn những vấn đề mà ba/mẹ quan tâm để cô có thể giải đáp",
  quick_replies: quickResponse,
};
console.log(res);
