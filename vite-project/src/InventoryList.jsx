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
  const [sort, changeState] = useState({
    byQuantity: false,
    byPrice: false,
  });

  
  //IDEA: USE MEMOIZATION TO STORE THIS VALUES
  //SO I CAN AVOID UNNECCESARY RERENDERS
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



  //console.log("Inventory Component Rerendered");
  return (
    <div>
      <label htmlFor="filter">Filter By</label>

      <select name="type" id="filter">
        <option value='dog'>Dog</option>
        <option value='dog'>Dog</option>
        <option value='dog'>Dog</option>
        <option value='dog'>Dog</option>
      </select>
      
      <table className="table-auto">
        <thead className="border-red-500 border">
          <tr>
            <th>Item</th>
            <th>
              <button
                name="byPrice"
                onClick={changeSort}
                className="bg-blue-700 disabled:bg-blue-200"
                disabled = {sort.byQuantity ? true : false}
              >
                Price
              </button>
            </th>
            <th>
              <button
                name="byQuantity"
                onClick={changeSort}
                className="bg-blue-700 disabled:bg-blue-200"
                disabled = {sort.byPrice ? true : false}
              >
                Quantity
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          <Itemslist
            items={
              sort.byPrice ? byPrice : sort.byQuantity ? byQuantity : items
            }
            handleDelete={handleDelete}
            handleEdit={handleEdit}
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

  function changeSort(e) {
    console.log(e.target.name);

    // if(sort.byPrice && e.target.name === 'byQuantity' || sort.byQuantity && e.target.name === 'byPrice'){
    //Conditional no longer neccesary, Shorter  conditional by disabling the button
    // as neccesary
    // }else{
      changeState((preValue) => {
        console.log(preValue);
        return { ...preValue, [e.target.name]: !preValue[e.target.name] };
      });
  }
}

export { InventoryList };
