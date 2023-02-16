
function mergeSort(arr,sortby) {

    //Reengineered to sort an Array Of Objects

   if (arr.length <= 1) {
      
      return arr;
    }
  
    let middle = Math.floor(arr.length / 2);
  
    let left = mergeSort(arr.slice(0, middle),sortby);
  
    let right = mergeSort(arr.slice(middle),sortby);
  


    let sortedArray = [];
    let leftIndex = 0;
    let rightIndex = 0;
  
    while (leftIndex < left.length && rightIndex < right.length) {
      if (parseInt(left[leftIndex][sortby]) <= parseInt(right[rightIndex][sortby])) {
        sortedArray.push(left[leftIndex]);
        
        leftIndex++;
        
      } else if (parseInt(left[leftIndex][sortby]) > parseInt(right[rightIndex][sortby])) {
        sortedArray.push(right[rightIndex]);
        
        rightIndex++;
        
      }
    }
  
  
    for(let i = leftIndex ;i < left.length ; i++){
      sortedArray.push(left[i])
    }
  
    for(let i = rightIndex ;i < right.length ; i++){
      sortedArray.push(right[i])
    }
    
  
    
    return sortedArray;
  }

  export {mergeSort}