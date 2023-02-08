/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/App.jsx', './src/InventoryList.jsx'],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
