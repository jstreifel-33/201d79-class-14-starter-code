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
    deleteCell.innerHTML = `<button class="delete" name="${cart.items[i][0].name}">X Delete this Item</button>`;
    deleteCell.addEventListener("onClick", removeItemFromCart);
    cartRow.appendChild(deleteCell);

    let imageCell = document.createElement('img');
    imageCell.setAttribute('src', cart.items[i][0].filePath);
    cartRow.appendChild(imageCell);

    let quantityCell = document.createElement('td');
    quantityCell.innerText = cart.items[i][1];
    cartRow.appendChild(quantityCell);

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

function renderForm(){
  let parentEl = document.getElementById('cart-container');
  let orderForm = document.createElement('form');
  orderForm.addEventListener('submit', makeVisible)
  orderForm.id = 'orderForm';

  let orderField = document.createElement('fieldset');
  let orderLegend = document.createElement('legend');
  orderLegend.innerText = 'Billing Information';

  let custName = document.createElement('input');
  custName.id = 'custName';
  let street = document.createElement('input');
  street.id = 'street';
  let city = document.createElement('input');
  city.id = 'city';
  let state = document.createElement('input');
  state.id = 'state';
  let zip = document.createElement('input');
  zip.id = 'zip';
  let phone = document.createElement('input');
  phone.id = 'phone';

  let creditCard = document.createElement('input');
  creditCard.id = 'creditCard';
  creditCard.maxLength = 16;
  creditCard.minLength = 16;

  let custNameLabel = document.createElement('label');
  custNameLabel.innerText = 'Name: ';
  custNameLabel.for = 'custName';
  let streetLabel = document.createElement('label');
  streetLabel.innerText = 'Address: ';
  streetLabel.for = 'street';
  let cityLabel = document.createElement('label');
  cityLabel.innerText = 'City: ';
  cityLabel.for = 'city';
  let stateLabel = document.createElement('label');
  stateLabel.innerText = 'State: ';
  stateLabel.for = 'state';
  let zipLabel = document.createElement('label');
  zipLabel.innerText = 'ZIP: '
  zipLabel.for = 'zip';
  let phoneLabel = document.createElement('label');
  phoneLabel.innerText = 'Phone Number: ';
  phoneLabel.for = 'phone';

  let creditCardLabel = document.createElement('label');
  creditCardLabel.innerText = 'Credit Card: ';
  creditCardLabel.for = 'creditCard';


  let process = document.createElement('input');
  process.type = 'submit';
  process.value = 'Process Order';
  //process.addEventListener('submit', makeVisible)
 
  parentEl.appendChild(orderForm);
  orderForm.appendChild(orderField);
  orderField.appendChild(orderLegend);
  orderField.appendChild(custNameLabel);
  orderField.appendChild(custName);
  orderField.appendChild(streetLabel);
  orderField.appendChild(street);
  orderField.appendChild(cityLabel);
  orderField.appendChild(city);
  orderField.appendChild(stateLabel);
  orderField.appendChild(state);
  orderField.appendChild(zipLabel);
  orderField.appendChild(zip);
  orderField.appendChild(phoneLabel);
  orderField.appendChild(phone);
  orderField.appendChild(creditCardLabel);
  orderField.appendChild(creditCard);
  orderField.appendChild(process);
}

renderForm();

function renderConfirm(){
  let confirm = document.createElement('div');
  confirm.id = 'confirm';
  confirm.innerText = 'ORDER CONFIRMED!'
  let parentEl = document.getElementById('cart-container');
  parentEl.append(confirm);
}

renderConfirm();

function makeVisible(event){
  event.preventDefault();
  console.log('show confirm')
  let confirm = document.getElementById('confirm');
  confirm.style.visibility = 'visible';
  confirm.style.animationName = 'confirm';

  setTimeout(function(){
    confirm.style.visibility = 'hidden';
    confirm.style.animationName = 'null';
  }, 3000);

  //reset form
  document.getElementById('orderForm').reset();
}
