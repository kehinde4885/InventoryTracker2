import { useState } from "react";
import { useEffect } from "react";

export default function Itemslist(props) {


  // console.log(props)
  const {items,handleDelete,handleEdit} = props
  
  // console.log('ItemsList Rendered')
  
  return (
    items.map((item, index) => {
      return (
        <tr key={index}>
          <td>{item.isEditing ? <input onChange={(event)=>{handleEdit(event,item.id)}} type="text"  name='item' value={item.item} /> : item.item}</td>
          <td>{item.isEditing ? <input onChange={(event)=>{handleEdit(event,item.id)}} type="text"  name='price' value={item.price} /> : `$${item.price}`}</td>
          <td>{item.isEditing ? <input onChange={(event)=>{handleEdit(event,item.id)}} type="text"  name='quantity' value={item.quantity} /> : item.quantity}</td>
          <td className="space-x-4"> 
            <button
            onClick={(event)=>{handleEdit(event,item.id)}}
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

