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