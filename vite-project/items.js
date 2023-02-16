//import _ from "lodash";
import {numbers} from './1000000.json' assert {type: 'json'}






let items1 = [
  {
    item: "Shirt",
    quantity: 20,
    price: 25,
    type: "Upper Body",
  },
  {
    item: "Pants",
    quantity: 15,
    price: 35,
    type: "Lower Body",
  },
  {
    item: "Dress",
    quantity: 10,
    price: 50,
    type: "One Piece",
  },
  {
    item: "Shoes",
    quantity: 5,
    price: 100,
    type: "Footwear",
  },
  {
    item: "Jacket",
    quantity: 10,
    price: 75,
    type: "Outerwear",
  },
  {
    item: "Skirt",
    quantity: 8,
    price: 30,
    type: "Lower Body",
  },
  {
    item: "Sunglasses",
    quantity: 12,
    price: 20,
    type: "Accessories",
  },
  {
    item: "Hat",
    quantity: 6,
    price: 15,
    type: "Accessories",
  },
  {
    item: "Belt",
    quantity: 9,
    price: 12,
    type: "Accessories",
  },
  {
    item: "Scarf",
    quantity: 7,
    price: 18,
    type: "Accessories",
  },
  {
    item: "T-Shirt",
    quantity: 20,
    price: 15,
    type: "Upper Body",
  },
  {
    item: "Jeans",
    quantity: 15,
    price: 40,
    type: "Lower Body",
  },
  {
    item: "Sweater",
    quantity: 10,
    price: 55,
    type: "Upper Body",
  },
  {
    item: "Sneakers",
    quantity: 5,
    price: 90,
    type: "Footwear",
  },
  {
    item: "Blazer",
    quantity: 8,
    price: 80,
    type: "Outerwear",
  },
  {
    item: "Shorts",
    quantity: 12,
    price: 20,
    type: "Lower Body",
  },
  {
    item: "Watch",
    quantity: 10,
    price: 50,
    type: "Accessories",
  },
  {
    item: "Earrings",
    quantity: 8,
    price: 12,
    type: "Accessories",
  },
  {
    item: "Necklace",
    quantity: 5,
    price: 20,
    type: "Accessories",
  },
  {
    item: "Bracelet",
    quantity: 7,
    price: 15,
    type: "Accessories",
  },
  {
    item: "Tank Top",
    quantity: 15,
    price: 10,
    type: "Upper Body",
  },
  {
    item: "Moschino Trousers",
    quantity: 15,
    price: 1000,
    type: "Lower Body",
  },
];


//building a Sort Algorithm
let array = [7, 5, 8, 0, 6];

//Sum of numbers Recursively

function sum(array) {
  console.log(array);

  //ends the sum function
  if (array.length === 0) {
    return 0;
  }

  let total = sum(array.slice(1));

  return total + array[0];
}


function mergeSort(arr) {
  if (arr.length <= 1) {
    // console.log('returned',arr)
    //console.log(arr)
    return arr;
  }

  let middle = Math.floor(arr.length / 2);
  console.log(middle)

  let left = mergeSort(arr.slice(0, middle));

  let right = mergeSort(arr.slice(middle));

  //console.log(left);


  //console.log(right);

  let sortedArray = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] <= right[rightIndex]) {
      sortedArray.push(left[leftIndex]);
      //console.log(sortedArray);
      leftIndex++;
      //console.log("left", leftIndex);
    } else if (left[leftIndex] > right[rightIndex]) {
      sortedArray.push(right[rightIndex]);
      //console.log(sortedArray);
      rightIndex++;
      //console.log("right", rightIndex);
    }
  }

  //console.log(leftIndex)

  //console.log(rightIndex)

  for(let i = leftIndex ;i < left.length ; i++){
    sortedArray.push(left[i])
  }

  for(let i = rightIndex ;i < right.length ; i++){
    sortedArray.push(right[i])
  }
  

  //console.log(sortedArray);
  return sortedArray;
}


let form = document.querySelector('.test-Form')
form.children[0].addEventListener('click', (e)=> {
  console.log(e)
  
})
//export { items1 };
