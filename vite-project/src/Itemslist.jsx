import { useState } from "react";
import { useEffect } from "react";

export default function Itemslist(props) {

  const {items,handleDelete,handleEdit,handleChange} = props
  
  // console.log('ItemsList Rendered')
  
  return (
    items.map((item, index) => {
      return (
        <tr key={index}>
          <td>{item.isEditing ? <input onChange={(event)=>{handleChange(event,index)}} type="text"  name='item' value={item.item} /> : item.item}</td>
          <td>{item.isEditing ? <input onChange={(event)=>{handleChange(event,index)}} type="text"  name='price' value={item.price} /> : `$${item.price}`}</td>
          <td>{item.isEditing ? <input onChange={(event)=>{handleChange(event,index)}} type="text"  name='quantity' value={item.quantity} /> : item.quantity}</td>
          <td className="space-x-4"> 
            <button
            onClick={()=>{handleEdit(index)}}
            className="inline"
          >
            {item.isEditing ? 'save' : 'edit'}
          </button>
          <button
            onClick={()=>{handleDelete(item.id)}}
            className="inline"
          >
            delete
          </button>
          </td>
        </tr>
      );
    })
  );


  
}

