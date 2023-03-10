import React from "react";
import { Link } from "react-router-dom";
import { InventoryList } from "./InventoryList";

console.log('INitialiszing')
let items = [
    {
      item: "Louis Vuiton",
      quantity: 300,
      price: 500,
      type: "Full Body",
      id: "d4a81a02-ab0b-405c-b761-69291d5e929c"
    }
]


localStorage.setItem('Items', JSON.stringify(items))


export default function Home() {
  return (
    <div>
      <h1>Welcome to Your Inventory</h1>
      <Link to='/list'>View Inventory</Link>
      <Link to='/new'>Add a New Item</Link>
    </div>
  );
}
