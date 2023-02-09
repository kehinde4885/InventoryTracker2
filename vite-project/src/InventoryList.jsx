import { useState } from "react";
import { useEffect } from "react";
import { items1 } from "../items";

import _ from "lodash";

function InventoryList() {
  const [items, setItems] = useState([]);

  console.log(items);

    useEffect(() => {
      console.log("useEffect Ran");

      fetch("http://localhost:3000/items")
        .then((res) => res.json())
        .then((data) => setItems(data));
    }, []);

  console.log("Component Rerendered");
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
          {items.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.item}</td>
                <td>${item.price}</td>
                <td>{item.quantity}</td>
                <td>
                  <button
                    onClick={() => {
                      handleDelete(index);
                    }}
                    className="inline"
                  >
                    delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <button className="border border-blue-700">New Item</button>
    </div>
  );

  function handleDelete(location) {
    setItems((prevItem) => {
      let array = [...prevItem];
      let deleted = _.remove(array, function (value, index, array) {
        if (index === location) {
          return value;
        }
      });

      return array;
    });
  }
}

export { InventoryList };
