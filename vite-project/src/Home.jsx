import React from "react";
import { Link } from "react-router-dom";
import { InventoryList } from "./InventoryList";

export default function Home() {
  return (
    <div>
      <h1>Welcome to Your Inventory</h1>
      <Link to='/list'>View Inventory</Link>
      <Link to='/new'>Add a New Item</Link>
    </div>
  );
}
