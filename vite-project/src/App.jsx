import { useState } from "react";
import { Switch, Route } from "react-router";

import reactLogo from "./assets/react.svg";
import { InventoryList } from "./InventoryList";
import { AddInventory } from "./AddInventory";
import Home from "./Home";

//console.log(options)

function App() {
  const [inventory, setInventory] = useState([]);

  console.log("App Rendered");

  return (
    <div className="App">
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route  path="/list">
          <InventoryList />
        </Route>
        <Route  path="/new">
          <AddInventory />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
