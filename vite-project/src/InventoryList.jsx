import { useState, useEffect, useContext } from "react";
import _ from "lodash";

import { optionsContext } from "./AppContext";
import Items from "./Itemslist";
import { mergeSort } from "../functions";

//Components
import Itemslist from "./Itemslist";
import ItemsHeader from "./ItemsHeader";

function InventoryList() {
  //Default State
  const [items, setItems] = useState([]);

  

  const options = useContext(optionsContext)[0];

  //Sorting State
  const [byQuantity, quantitySort] = useState([]);
  const [byPrice, priceSort] = useState([]);
  const [byAlphabet, AlphabetSort] = useState([]);
  const [sort, changeSort] = useState({
    byQuantity: false,
    byPrice: false,
    byAlphabet: false,
  });

  //Filter & Sort are Mutually Exclusive
  //Filter States
  const [view, changeView] = useState([]);
  const [filtered, changeFilter] = useState({
    bool: false,
    by: "None",
  });

  function handleFilter(e) {
    if (e.target.value === "None") {
      changeFilter((preValue) => ({ bool: false, by: e.target.value }));
      let view = [...items];
      changeView(view);
    } else if (e.target.value) {
      console.log(e.target.value);
      changeFilter({ bool: true, by: e.target.value });
      let view = items.filter((item) => item.type === e.target.value);
      changeView(view);
    }
  }

  //IDEA: USE MEMOIZATION TO STORE THIS VALUES
  //SO I CAN AVOID UNNECCESARY RERENDERS

  //Use REducer to Handle View State???

  useEffect(() => {
    //console.log(filtered.by);
    if (filtered.by === "None") {
      let view = [...items];
      changeView(view);
    } else {
      let view = items.filter((item) => item.type === filtered.by);
      //console.log(view);
      changeView(view);
    }

    if (items.length) {
      //console.log("Resorting Ran");
      let arr1 = mergeSort(items, "quantity");
      let arr2 = mergeSort(items, "price");
      let arr3 = mergeSort(items,'item')
      quantitySort(arr1);
      priceSort(arr2);
      AlphabetSort(arr3)
    }
  }, [items]);

  //Fetch and Set INventory
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

      <select
        onChange={(e) => handleFilter(e)}
        value={filtered.by}
        name="type"
        id="filter"
      >
        <option value="None">All</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>

      <table className="table-auto">
        <thead className="border-red-500 border">
          <ItemsHeader 
          HandleSort={HandleSort}
          sort={sort}
          filtered={filtered}/>
        </thead>
        <tbody>
          <Itemslist
          // Renders Either the Sorted Views or Filtered View
            items={sort.byPrice ? byPrice : 
              sort.byQuantity ? byQuantity : 
              sort.byAlphabet ? byAlphabet : 
              view}
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

  function HandleSort(e) {
    
    //Signifies value the Items is being sorted By
    changeSort((preValue) => {
      return { ...preValue, [e.target.name]: !preValue[e.target.name] };
    });
  }
}

export { InventoryList };
