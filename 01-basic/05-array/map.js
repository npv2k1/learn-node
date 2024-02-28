/**
 * .map()
 * Phương thức .map() với mảng nhận vào 1 hàm callback và trả về 1 mảng mới với các phần tử được thay đổi bởi hàm callback.
 * Hàm callback nhận vào 3 tham số: currentValue (Giá trị hiện tại), index (Vị trí index hiện tại), array (Mảng đang được duyệt)
 */

let exampleArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// Tăng giá trị của mỗi phần tử lên 1 đơn vị
let exampleArr2 = exampleArr.map((currentValue, index, array) => {
    return currentValue + 1;
})
console.log("exampleArr2: ", exampleArr2);


exampleArr.map((currentValue, index, array) => {
  array[index-1] = 0;
  console.log("currentValue: ", currentValue);
  
});
console.log("🚀 ~ file: map.js:19 ~ exampleArr.map ~ exampleArr:", exampleArr)
