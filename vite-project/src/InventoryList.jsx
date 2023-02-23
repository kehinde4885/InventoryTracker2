import { useState, useEffect, useContext, useReducer } from "react";
import _ from "lodash";

import { optionsContext } from "./AppContext";
import Items from "./Itemslist";
import { mergeSort } from "../functions";

//Components
import Itemslist from "./Itemslist";
import ItemsHeader from "./ItemsHeader";

//reducer function
function reducer(state, action) {
  if (action.type === "Filtering") {
    //console.log(action);
    let arr = action.default;
    let filter = action.filter;
    
    if (!filter) {
      let arr1 = arr.filter((item) => item.type);
      return arr1;
    } else {
      let arr1 = arr.filter((item) => item.type === filter);
      return arr1;
    }
  } else if (action.type === "Filtering & Searching") {
    //Filter then Search
    let arr = action.default;
    let filter = action.filter;
    let searching = action.searching;
    let arr1 = arr.filter((item) => item.type === filter);

    let searchResults = arr1.filter((item) =>
      item.item.toLowerCase().startsWith(searching.toLowerCase())
    );

    return searchResults;
  } else if (action.type === "Searching") {
    //console.log(action);
    const currentView = action.view;
    const value = action.searching;
    //Converts both the search String and Item Name to lower case
    //Checks if they are the same
    //Searches only through the current view
    let searchResults = currentView.filter((item) =>
      item.item.toLowerCase().startsWith(value.toLowerCase())
    );
    //console.log(searchResults);
    return searchResults;
  }
}

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

  //||
  //Filter & Sort are Mutually Exclusive
  //||
  //Filter States
  const [view, changeView] = useReducer(reducer, []);
  const [filtered, changeFilter] = useState({
    bool: false,
    by: "",
  });

  const [searching, changeSearch] = useState({
    bool: false,
    by: "",
  });

  console.log('filter',filtered)
   console.log('search',searching)

  function handleFilter(e) {
    //Filter logic when user interaction happens
    if (e.target.value && searching.bool) {
      
      console.log('FS')
      changeFilter((preValue) => ({
        ...preValue,
        bool: true,
        by: e.target.value,
      }));
      changeView({
        type: "Filtering & Searching",
        default: items,
        filter: e.target.value,
        searching: searching.by,
      });
    } else if (!e.target.value || searching.bool) {
      //No Filtering
      changeFilter((preValue) => ({
        ...preValue,
        bool: false,
        by: e.target.value,
      }));

      changeView({ type: "Searching", view: items, searching: searching.by });
    } else if (e.target.value) {
      
      //Filtering
      changeFilter((preValue) => ({
        ...preValue,
        bool: true,
        by: e.target.value,
      }));

      changeView({ type: "Filtering", default: items, filter: e.target.value });
    }
  }

  //Search only searches the current View
  function handleSearch(e) {
    const { value } = e.target;
    
    if (value && filtered.bool) {
      
      changeSearch((preValue) => ({ ...preValue, by: value, bool: true }));
      changeView({
        type: "Filtering & Searching",
        default: items,
        filter: filtered.by,
        searching: value,
      });
    } else if (!value || filtered.bool) {
      //Not Searching but filtering
      changeSearch((preValue) => ({ ...preValue, by: value, bool: false }));
      changeView({ type: "Filtering", default: items, filter: filtered.by });
    } else if(value) {
      //Searching
     
      let arr = view;
      
      changeSearch((preValue) => ({ ...preValue, by: value, bool: true }));

      changeView({ type: "Searching", view: arr, searching: value });
    }
  }

  function HandleSort(e) {
    //Signifies using boolean, value the Items is being sorted By
    changeSort((preValue) => {
      return { ...preValue, [e.target.name]: !preValue[e.target.name] };
    });
  }

  //IDEA: USE MEMOIZATION TO STORE THIS VALUES
  //SO I CAN AVOID UNNECCESARY RERENDERS

  useEffect(() => {
    //Filter Logic when App first loads or Default array Changes
    // if(items.length){

    if (filtered.bool) {
      changeView({ type: "Filtering", default: items, filter: filtered.by });
    } else if (searching.bool && filtered.bool) {
      console.log("FS");
      changeView({
        type: "Searching & Filtering",
        default: items,
        filter: filtered.by,
        searching: searching.by,
      });
    } else {
      //console.log("f");

      changeView({ type: "Filtering", default: items, filter: filtered.by });
    }
  }, [items]);

  useEffect(() => {
    //Sorting Logic when App first loads or Default array Changes
    if (view.length) {
      // console.log("Resorting Ran");
      let arr1 = mergeSort(view, "quantity");
      let arr2 = mergeSort(view, "price");
      let arr3 = mergeSort(view, "item");
      quantitySort(arr1);
      priceSort(arr2);
      AlphabetSort(arr3);
    }
  }, [view]);

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
        <option value="">All</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>

      <label htmlFor="search">Search</label>
      <input
        type="text"
        value={searching.by}
        onChange={(e) => handleSearch(e)}
        placeholder="item name"
        name="search"
        id="search"
      />

      <table className="table-auto">
        <thead className="border-red-500 border">
          <ItemsHeader
            HandleSort={HandleSort}
            sort={sort}
            filtered={filtered}
          />
        </thead>
        <tbody>
          <Itemslist
            // Renders Either the Sorted Views or Filtered View
            items={
              sort.byPrice
                ? byPrice
                : sort.byQuantity
                ? byQuantity
                : sort.byAlphabet
                ? byAlphabet
                : view
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
