import { useState } from "react";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useReducer } from "react";



//A reducer function used to handle logic of state changes, all you 
//need to do is pass along the case/ Context the state needs to be
//changed in through the action parameter.
function reducer(state, action) {
  if (action.type === "form_submitted") {
    return {
      item: "",
      quantity: 0,
      price: 0,
      type: "",
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
    quantity: 0,
    price: 0,
    type: "",
    id: uuidv4(),
  });

  console.log("Component ReRendered");

  return (
    <form>
      <div>
        <label htmlFor="item">Item</label>
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
          type="text"
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
          name="price"
          id="price"
        />
      </div>
      <div>
        <label htmlFor="type">Type</label>
        <input
          onChange={handleChange}
          value={item.type}
          type="text"
          name="type"
          id="type"
        />
      </div>

      <button onClick={handleClick} className="border border-blue-700">
        Add Item
      </button>
    </form>
  );

  function handleClick(e) {
    e.preventDefault();
    submitForm();
    console.log("Form Submitted");
    editItem({ type: "form_submitted" });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    let form = { ...item, [name]: value };
    editItem({ type: "form_edited", form: form });
  }

  function submitForm() {
    fetch("http://localhost:3000/items", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ ...item }),
    }).catch((error) => {
      console.log(error);
      console.error("Error:", error);
    });
  }
}

export { AddInventory };
