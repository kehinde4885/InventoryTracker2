import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { InventoryList } from './InventoryList'
import { AddInventory } from './AddInventory'


function App() {
  const [inventory, setInventory] = useState([])

  console.log('App Rendered')

  return (
    <div className="App">
      <AddInventory/>
      
    </div>
      
  )
}

export default App
