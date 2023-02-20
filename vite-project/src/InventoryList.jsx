import { useState, useEffect, useContext } from "react";
import { optionsContext } from "./AppContext";
import Items from "./Itemslist";

import { mergeSort } from "../functions";

import _, { filter } from "lodash";
import Itemslist from "./Itemslist";

function InventoryList() {
  const [items, setItems] = useState([]);

  const options = useContext(optionsContext)[0];

  const [byQuantity, quantitySort] = useState([]);
  const [byPrice, priceSort] = useState([]);
  const [sort, changeSort] = useState({
    byQuantity: false,
    byPrice: false,
  });

  const [view, changeView] = useState([]);
  const [filtered, changeFilter] = useState({
    bool: false,
    by: "None",
  });

  console.log(filtered);

  

  function handleFilter(e) {
    //changeFilter(preValue => ({...preValue, by: e.target.value}))

    if (e.target.value === "None") {
      changeFilter((preValue) => ({ bool: false, by: e.target.value }));
      let view = [...items];
      changeView(view);

      // change(view)
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
    
    console.log(filtered.by);
    if (filtered.by === "None") {
      let view = [...items];
      changeView(view);
    } else {
      let view = items.filter((item) => item.type === filtered.by);
      console.log(view);
      changeView(view);
    }

    if (items.length) {
      console.log("Resorting Ran");
      let arr1 = mergeSort(items, "quantity");
      let arr2 = mergeSort(items, "price");
      quantitySort(arr1);
      priceSort(arr2);
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
          <tr>
            <th>Item</th>
            <th>
              <button
                name="byPrice"
                onClick={HandleSort}
                className="bg-blue-700 disabled:bg-blue-200 disabled:opacity-20"
                disabled={sort.byQuantity ? true : false || filtered.bool && true}
              >
                Price
              </button>
            </th>
            <th>
              <button
                name="byQuantity"
                onClick={HandleSort}
                className="bg-blue-700 disabled:bg-blue-200 disabled:opacity-20"
                disabled={sort.byPrice ? true : false || filtered.bool && true}
              >
                Quantity
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          <Itemslist
            items={sort.byPrice ? byPrice : sort.byQuantity ? byQuantity : view}
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
    // if(sort.byPrice && e.target.name === 'byQuantity' || sort.byQuantity && e.target.name === 'byPrice'){
    //Conditional no longer neccesary, Shorter  conditional by disabling the button
    // as neccesary
    // }else{
    changeSort((preValue) => {
      return { ...preValue, [e.target.name]: !preValue[e.target.name] };
    });
  }
}

export { InventoryList };
