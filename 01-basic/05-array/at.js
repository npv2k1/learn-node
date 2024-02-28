/**
 * .at()
 * Phương thức .at() với mảng nhận vào là 1 số nguyên dương và trả về phần tử tại vị trí đó trong mảng.
 */
let exampleArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// Lấy phần tử thứ 2 trong mảng
console.log(exampleArr.at(1)); // 2

// Phương thức sẽ trả về undefined nếu vị trí truyền vào không tồn tại trong mảng
console.log(exampleArr.at(100)); // undefined
