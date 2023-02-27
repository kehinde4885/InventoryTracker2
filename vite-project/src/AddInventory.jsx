import { useState } from "react";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useReducer } from "react";
import { useContext } from "react";
import { optionsContext } from "./AppContext";

//A reducer function used to handle logic of state changes, all you
//need to do is pass along the case/ Context the state needs to be
//changed in through the action parameter.
function reducer(state, action) {
  if (action.type === "form_submitted") {
    //New State to be Returned
    return {
      item: "",
      quantity: 1,
      price: 1,
      type: "Full Body",
      id: uuidv4(),
    };
  }
  if (action.type === "form_edited") {
    return { ...action.form };
  }
  throw Error("Unknown action");
}

function AddInventory() {
  //when using a useReducer Hook, the callbackFn 'editItem'
  //will call the reducer function above.
  const [item, editItem] = useReducer(reducer, {
    item: "",
    quantity: 1,
    price: 1,
    type: "Full Body",
    id: uuidv4(),
  });

  //Product Categories through Context API
  let options = useContext(optionsContext)[0]
  

  //console.log("Add Inventory Component ReRendered");

  //console.log(item)

  //console.log(document.getElementById('type').parentElement.childNodes)

  return (
    <form>
      <div>
        <label htmlFor="item">Item Name</label>
        <input
          onChange={handleChange}
          value={item.item}
          type="text"
          name="item"
          id="item"
        />
      </div>

      <div>
        <label htmlFor="quantity">Quantity</label>
        <input
          onChange={handleChange}
          value={item.quantity}
          type="number"
          min={1}
          name="quantity"
          id="quantity"
        />
      </div>
      <div>
        <label htmlFor="price">Price</label>
        <input
          onChange={handleChange}
          value={item.price}
          type="number"
          min={1}
          name="price"
          id="price"
        />
      </div>
      <div>
        <label htmlFor="type">Type of Product</label>
        {/* Controlled Select Input */}
        <select value={item.type} onChange={handleChange} name="type" id="type">
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <button onClick={handleSubmit} className="border border-blue-700">
        Add Item
      </button>
    </form>
  );

  function handleSubmit(e) {
    e.preventDefault();
    submitForm();
    //console.log("Form Submitted");

    //Run Reducer Function to reset Form
    editItem({ type: "form_submitted" });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    //console.log(typeof value)

    let form = {
      ...item,
      [name]:
        name === "price"
          ? parseInt(value)
          : name === "quantity"
          ? parseInt(value)
          : value,
    };
    //console.log(form)
    editItem({ type: "form_edited", form: form });
  }

  function submitForm() {
    // fetch("http://localhost:3000/items", {
    //   method: "POST",
    //   headers: {
    //     "Content-type": "application/json",
    //   },
    //   body: JSON.stringify({ ...item }),
    // })
    // .then(res => res.json())
    // .then(data => console.log(data))
    // .catch((error) => {
    //   console.log(error);
    //   console.error("Error:", error);
    // })

    let prev = JSON.parse(localStorage.getItem('Items'))
    let newValue = [...prev,item]
    localStorage.setItem('Items', JSON.stringify(newValue))
  }
}

export { AddInventory };
