import { createContext } from "react";

let categories = [
    "Full Body",
    "Upper Body",
    "Lower Body",
    "Outerwear",
    "Accessories",
    "One Piece",
    "Footwear"
  ];

const optionsContext = createContext([categories])

export {optionsContext}