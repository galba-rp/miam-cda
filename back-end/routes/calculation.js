const express = require("express");
const router = express.Router();

// function to calculate food on a given day up to lunch of the 52 day
// from array of 14 meals for the first week
let menu = (arr, day) => {
  let array = arr;
  let temp = [];
  let lunch = day * 2 - 2;
  let dinner = day * 2 - 1;

  while (array.length > 1) {
    temp = [];
    let i = 1;
    while (i < array.length) {
      if (array[i] === array[i - 1]) {
        temp.push(array[i]);
      } else if (array[i] + array[i - 1] === 1) {
        temp.push(-1);
      } else if (array[i] + array[i - 1] === 0) {
        temp.push(0);
      } else if (array[i] + array[i - 1] === -1) {
        temp.push(1);
      }
      i++;
    }
    arr = arr.concat(temp);
    array = temp;
  }
  let result = [arr[lunch], arr[dinner]];
  return result;
};

router.post("/", (req, res) => {
  let arr = req.body.order;
  let day = req.body.day;
  let result = menu(arr, day);
  //let day = req.body.day
  console.log(result);
  res.send(result);
});

module.exports = router;
