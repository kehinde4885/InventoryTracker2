import React from "react";

export default function ItemsHeader(props) {
    const {HandleSort,sort,filtered} = props
  return (
    <tr>
      <th>
        <button
          name="byAlphabet"
          onClick={HandleSort}
          className="bg-blue-700 disabled:bg-blue-200 disabled:opacity-20"
          disabled={sort.byPrice || sort.byQuantity ? true : false || (filtered.bool && true)}
        >
          Item
        </button>
      </th>
      <th>
        <button
          name="byPrice"
          onClick={HandleSort}
          className="bg-blue-700 disabled:bg-blue-200 disabled:opacity-20"
          disabled={sort.byQuantity || sort.byAlphabet ? true : false || (filtered.bool && true)}
        >
          Price
        </button>
      </th>
      <th>
        <button
          name="byQuantity"
          onClick={HandleSort}
          className="bg-blue-700 disabled:bg-blue-200 disabled:opacity-20"
          disabled={sort.byPrice || sort.byAlphabet? true : false || (filtered.bool && true)}
        >
          Quantity
        </button>
      </th>
    </tr>
  );
}
