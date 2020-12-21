week = [1,1,0,0,-1,0,1,-1,-1,0,0,1,-1,-1];
day = 22;
function menu(arr, d){
  if (d == 52) {
 
  }
  
  if (d > 52) {}
// array shoud consist of -1, 0, -1 where 1 = pizza, 0 = sushi, -1 = veg;
let array = arr, temp = [];
let lunch = d*2-2;
let dinner = d*2-1; 
  
while (array.length > 1){
  temp = [];
  let i = 1;

   while(i < array.length){
    let sum =array[i] + array[i-1];
    if(array[i] == array[i-1]){
      temp.push(array[i]);
    } else if(sum == 1){
      temp.push(-1);
    } else if(sum == 0){
      temp.push(0);
    } else {
      temp.push(1)
    }
    i++;
  }
 
  arr = arr.concat(temp)
  array = temp;
  }
   console.log(arr)
  console.log(arr[lunch], arr[dinner])
}

menu(week, 52);