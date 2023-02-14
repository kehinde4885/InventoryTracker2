import { useState } from "react";
import { useEffect } from "react";
import Items from "./Itemslist";
import { items1 } from "../items";

import _ from "lodash";
import Itemslist from "./Itemslist";

function InventoryList() {
  const [items, setItems] = useState([]);

  //console.log(items)

    useEffect(() => {
      //console.log("useEffect Ran");

      fetch("http://localhost:3000/items")
        .then((res) => res.json())
        .then((data) => setItems(data));
    }, []);

  //console.log("Inventory Component Rerendered");
  return (
    <div>
      <table className="table-auto">
        <thead className="border-red-500 border">
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          <Itemslist 
          items={items}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          handleChange={handleChange}
          
          />
          
        </tbody>
      </table>

      <button className="border border-blue-700">New Item</button>
    </div>
  );

  function handleDelete(location) {
    setItems((prevItem) => {
      let array = [...prevItem];
      //Used Lodash to delete item from array
      let deleted = _.remove(array, function (value, index, array) {
        if (index === location) {
          return value;
        }
      });

      return array;
    });
  }


  //HandleChange and HandleEdit can be Combined together
  function handleChange(e,location){
    let array = [...items]

    array[location] = ({...array[location], [e.target.name] : e.target.value})

    setItems(array)
  
  }

  function handleEdit(location){
    let array = [...items]

    array[location].isEditing = array[location].isEditing ? false : true

    // if(array[location].isEditing){
    //   console.log(array[location].isEditing = false)
    // }else{
    //   console.log(array[location].isEditing = true)
    // }
    setItems(array)
    
  }
}


export { InventoryList };
