function mergeSort(arr, sortby) {
  //Reengineered to sort an Array Of Objects

    //console.log('...')

  if (arr.length <= 1) {
    return arr;
  }

  let middle = Math.floor(arr.length / 2);

  let left = mergeSort(arr.slice(0, middle), sortby);

  let right = mergeSort(arr.slice(middle), sortby);

  let sortedArray = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex][sortby] <= right[rightIndex][sortby]) {
      sortedArray.push(left[leftIndex]);

      leftIndex++;
    } else if (left[leftIndex][sortby] > right[rightIndex][sortby]) {
      sortedArray.push(right[rightIndex]);

      rightIndex++;
    }
  }

  for (let i = leftIndex; i < left.length; i++) {
    sortedArray.push(left[i]);
  }

  for (let i = rightIndex; i < right.length; i++) {
    sortedArray.push(right[i]);
  }

  return sortedArray;
}

let arr = ["Trouser", "Microphone"];
alphabetSort(arr);
function alphabetSort(arr) {
  //Reengineered to sort an Array Of Objects

  //console.log('...')

  if (arr.length <= 1) {
    return arr;
  }

  let middle = Math.floor(arr.length / 2);

  let left = mergeSort(arr.slice(0, middle));

  let right = mergeSort(arr.slice(middle));
  console.log(left);
  console.log(right);

  let sortedArray = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    let alphabetIndex = 1;
    if (left[leftIndex] <= right[rightIndex]) {
      sortedArray.push(left[leftIndex]);

      leftIndex++;
    } else if (left[leftIndex] > right[rightIndex]) {
      sortedArray.push(right[rightIndex]);

      rightIndex++;
    }
    console.log(alphabetIndex);
    console.log(sortedArray);
  }

  for (let i = leftIndex; i < left.length; i++) {
    sortedArray.push(left[i]);
  }

  for (let i = rightIndex; i < right.length; i++) {
    sortedArray.push(right[i]);
  }

  console.log(sortedArray);
  return sortedArray;
}

export { mergeSort };
