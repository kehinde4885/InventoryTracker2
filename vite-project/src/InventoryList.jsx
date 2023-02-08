import { useState } from "react";
import { useEffect } from "react";

function InventoryList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/items")
      .then((res) => res.json())
      .then((data) => setItems(data));

    console.log("useEffect Ran");
  }, []);

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
              </tr>
            );
          })}
        </tbody>
      </table>


      <button className="border border-blue-700">New Item</button>
    </div>
  );
}

export { InventoryList };
