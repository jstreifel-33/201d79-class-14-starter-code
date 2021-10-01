/* global Cart */
'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
const table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);
let cart;

function loadCart() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cart = new Cart(cartItems);
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
}

// TODO: Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {
  let cartTable = document.getElementById('cart')
  cartTable.innerHTML = '';
}

// TODO: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {

  // TODO: Find the table body
  let cartTable = document.getElementById('cart');
  // TODO: Iterate over the items in the cart
  for (let i = 0; i < cart.items.length; i ++){
    // TODO: Create a TR
    let cartRow = document.createElement('tr');
    // TODO: Create a TD for the delete link, quantity,  and the item
    let deleteCell = document.createElement('td');
    deleteCell.innerHTML = `<a class="delete" name="${cart.items[i][0].name}">X</a>`;
    deleteCell.addEventListener("onClick", removeItemFromCart);
    cartRow.appendChild(deleteCell);

    let quantityCell = document.createElement('td');
    quantityCell.innerText = cart.items[i][1];
    cartRow.appendChild(quantityCell);

    let imageCell = document.createElement('img');
    imageCell.setAttribute('src', cart.items[i][0].filePath);
    cartRow.appendChild(imageCell);

    let itemCell = document.createElement('td');
    itemCell.innerText = cart.items[i][0].name;
    cartRow.appendChild(itemCell);
    // TODO: Add the TR to the TBODY and each of the TD's to the TR
    cartTable.appendChild(cartRow);


  }

}

function removeItemFromCart(event) {
  // TODO: When a delete link is clicked, use cart.removeItem to remove the correct item
  console.log(event);
  let removeQuery = event.target.name;
  console.log(removeQuery);
  // TODO: Save the cart back to local storage
  cart.removeItem(removeQuery);
  // TODO: Re-draw the cart table
  renderCart();
}

// This will initialize the page and draw the cart on screen
renderCart();
