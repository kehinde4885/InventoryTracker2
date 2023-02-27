/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/App.jsx', './src/InventoryList.jsx', './src/Itemslist.jsx', './src/ItemsHeader.jsx'],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
