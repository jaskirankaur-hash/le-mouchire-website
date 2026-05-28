function loadCart() {

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let cartContainer = document.getElementById("cart-items");

  let total = 0;

  cartContainer.innerHTML = "";

  // ✅ Empty cart
  if (cart.length === 0) {

    cartContainer.innerHTML = `
      <h3>Your cart is empty 🛒</h3>
    `;

    document.getElementById("total").innerText = "₹ 0";

    return;
  }

  // ✅ Show cart items
  cart.forEach((item, index) => {

    total += item.price * item.quantity;

    cartContainer.innerHTML += `
      <div class="cart-item">

        <img src="${item.image}" width="80">

        <h4>${item.name}</h4>

        <p>₹${item.price}</p>

        <div class="qty-box">

          <button class="qty-btn" onclick="decreaseQty(${index})">
            ➖
          </button>

          <span class="qty-number">
            ${item.quantity}
          </span>

          <button class="qty-btn" onclick="increaseQty(${index})">
            ➕
          </button>

        </div>

        <button class="remove-btn" onclick="removeItem(${index})">
           Remove
        </button>

      </div>
    `;
  });

  // ✅ Total
  document.getElementById("total").innerText = "₹ " + total;
}


// ➕ Increase quantity
function increaseQty(index) {

  let cart = JSON.parse(localStorage.getItem("cart"));

  cart[index].quantity += 1;

  localStorage.setItem("cart", JSON.stringify(cart));

  loadCart();
}


// ➖ Decrease quantity
function decreaseQty(index) {

  let cart = JSON.parse(localStorage.getItem("cart"));

  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  loadCart();
}


// ❌ Remove item
function removeItem(index) {

  let cart = JSON.parse(localStorage.getItem("cart"));

  cart.splice(index, 1);

  localStorage.setItem("cart", JSON.stringify(cart));

  loadCart();
}


// ✅ Checkout button
function goCheckout() {

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {

    alert("Cart is empty ❌");

    return;
  }

  window.location.href = "../checkout/index.html";
}


// ✅ Load cart on page start
document.addEventListener("DOMContentLoaded", loadCart);