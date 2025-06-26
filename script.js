// Redirect if not logged in
if (localStorage.getItem('loggedIn') !== 'true') {
  if (!window.location.href.includes('login.html')) {
    window.location.href = 'login.html';
  }
}

const imageMap = {
  "Roti": "images/roti.png",
  "Drink": "images/drink.png",
  "Momos": "images/momos.png",
  "Tandoor": "images/tandoor.png",
  "Roll": "images/roll.png"
};

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(item, price) {
  const existing = cart.find(i => i.item === item);
  if (existing) {
    existing.quantity = (existing.quantity || 1) + 1;
  } else {
    cart.push({ item, price, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${item} added to cart!`);
}

function goToCart() {
  window.location.href = 'cart.html';
}

function renderCart(containerId, totalId) {
  const cartList = document.getElementById(containerId);
  const totalSpan = document.getElementById(totalId);
  cartList.innerHTML = '';
  let total = 0;

  cart.forEach((itemObj, index) => {
    const { item, price, quantity = 1 } = itemObj;
    const itemDiv = document.createElement('div');
    itemDiv.className = 'cart-item';

    itemDiv.innerHTML = `
      <img src="${imageMap[item] || 'images/default.png'}" alt="${item}" />
      <div class="item-details">
        <p><strong>${item}</strong></p>
        <p>₹${price} x 
          <input type="number" min="1" value="${quantity}" onchange="updateQuantity(${index}, this.value)" />
        </p>
        <p>Subtotal: ₹${price * quantity}</p>
        <button class="remove-btn" onclick="removeItem(${index})">🗑 Remove</button>
      </div>
    `;

    cartList.appendChild(itemDiv);
    total += price * quantity;
  });

  totalSpan.textContent = total;
  localStorage.setItem('cart', JSON.stringify(cart));
}

function updateQuantity(index, newQty) {
  const qty = Math.max(1, parseInt(newQty));
  cart[index].quantity = qty;
  renderCart('cart-list', 'total');
}

function removeItem(index) {
  cart.splice(index, 1);
  renderCart('cart-list', 'total');
}

function placeOrder() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
  alert(`Order placed using ${paymentMethod}! Thank you 😊`);
  localStorage.removeItem('cart');
  window.location.href = 'thankyou.html';
}
