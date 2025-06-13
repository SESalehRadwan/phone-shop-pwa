let phones = [];
let cart = [];

fetch('phones.json')
  .then(res => res.json())
  .then(data => {
    phones = data;
    displayPhones(phones);
  });

function displayPhones(list) {
  const container = document.getElementById('phones-container');
  container.innerHTML = '';
  list.forEach(phone => {
    const phoneCard = document.createElement('div');
    phoneCard.className = 'phone';
    phoneCard.innerHTML = `
      <img src="${phone.image}" alt="${phone.name}" />
      <h3>${phone.name}</h3>
      <p>$${phone.price}</p>
      <button onclick='addToCart(${JSON.stringify(phone)})'>Buy</button>
    `;
    container.appendChild(phoneCard);
  });
}

function addToCart(phone) {
  cart.push(phone);
  document.getElementById('cart-count').innerText = cart.length;
}

function viewCart() {
  const list = document.getElementById('cart-list');
  const total = document.getElementById('cart-total');
  list.innerHTML = '';
  let sum = 0;
  cart.forEach(item => {
    const li = document.createElement('li');
    li.innerText = `${item.name} - $${item.price}`;
    list.appendChild(li);
    sum += item.price;
  });
  total.innerText = sum.toFixed(2);
  document.getElementById('cart-section').style.display = 'block';
}

function closeCart() {
  document.getElementById('cart-section').style.display = 'none';
}

function checkout() {
  const orderDetails = cart.map(item => `${item.name} - $${item.price}`).join('\n');
  alert('Thank you for your purchase!\n\nOrder Summary:\n' + orderDetails + '\n\nTotal: $' + getCartTotal());
  cart = [];
  document.getElementById('cart-count').innerText = '0';
  closeCart();
}

function getCartTotal() {
  return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
}

document.getElementById('searchInput').addEventListener('input', function (e) {
  const query = e.target.value.toLowerCase();
  const filtered = phones.filter(p => p.name.toLowerCase().includes(query));
  displayPhones(filtered);
});
