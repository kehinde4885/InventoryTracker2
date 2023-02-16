import { useState } from "react";
import { useEffect } from "react";
import Items from "./Itemslist";

import { mergeSort } from "../functions";

import _ from "lodash";
import Itemslist from "./Itemslist";

function InventoryList() {
  const [items, setItems] = useState([]);
  const [byQuantity, quantitySort] = useState([]);
  const [byPrice, priceSort] = useState([]);

  // console.log(items)
  // console.log(byQuantity)
  // console.log(byPrice)

  useEffect(() => {
    if (items.length) {
      let arr1 = mergeSort(items, "quantity");
      let arr2 = mergeSort(items, "price");
      quantitySort(arr1);
      priceSort(arr2);
    }
  }, [items]);

  useEffect(() => {
    //console.log("useEffect Ran");

    fetch("http://localhost:3000/items")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  //console.log(mergeSort(items,'quantity'))

  //console.log("Inventory Component Rerendered");
  return (
    <div>
      <table className="table-auto">
        <thead className="border-red-500 border">
          <tr>
            <th>Item</th>
            <th>
              <button className="bg-blue">Price</button>
            </th>
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

  function handleDelete(id) {
    setItems((prevItem) => {
      let array = [...prevItem];

      //Used Lodash to delete item from array
      let deleted = _.remove(array, function (value, index, array) {
        if (array[index].id === id) {
          return value;
        }
      });

      return array;
    });
  }


  //HandleChange and HandleEdit Combined together using 
  //a Conditional

  function handleEdit(e, id) {
    let array = [...items];

    //look for the array item with the same id

    let location = array.findIndex((item) => item.id === id);

    //HandleEdit
    if (e.type === "click") {
      //Change the Value of isEditing Property in state
      array[location].isEditing = array[location].isEditing ? false : true;

      setItems(array);
    } 
    //HandleChange
    else if (e.type === "change") {
      array[location] = { ...array[location], [e.target.name]: e.target.value };

      setItems(array);
    }
  }
}

export { InventoryList };
