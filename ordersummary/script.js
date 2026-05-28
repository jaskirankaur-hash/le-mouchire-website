document.addEventListener("DOMContentLoaded", function () {

  console.log("Summary JS working ✅");

  const container = document.getElementById("order-items");
  const totalEl = document.getElementById("total-price");
  const confirmBtn = document.getElementById("confirm-btn");

  if (!container || !totalEl || !confirmBtn) {
    console.error("HTML elements missing ❌");
    return;
  }

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let buyNow = JSON.parse(localStorage.getItem("buyNowProduct"));

  console.log("buyNow:", buyNow);
  console.log("cart:", cart);

  let total = 0;

  // ❗ EMPTY CHECK
  if (!buyNow && cart.length === 0) {
    container.innerHTML = "<h3>No Order Found ❌</h3>";
    return;
  }

  // ✅ BUY NOW
  if (buyNow) {
    total = buyNow.price;

    container.innerHTML = `
      <div>
        <h3>${buyNow.name}</h3>
        <p>₹${buyNow.price}</p>
        <img src="${buyNow.image}" width="100">
      </div>
    `;
  }

  // ✅ CART
  else {
    cart.forEach(item => {
      total += item.price * item.quantity;

      container.innerHTML += `
        <div>
          <h3>${item.name}</h3>
          <p>₹${item.price} x ${item.quantity}</p>
          <img src="${item.image}" width="100">
        </div>
      `;
    });
  }

  totalEl.innerText = "Total: ₹" + total;

  let customer = JSON.parse(localStorage.getItem("customer"));

document.getElementById("order-items").innerHTML += `
  <hr>
  <h3>Customer Details</h3>
  <p>Name: ${customer.name}</p>
  <p>Phone: ${customer.phone}</p>
  <p>Address: ${customer.address}</p>
  <p>Payment: ${customer.payment}</p>
`;
  //cancel button

  document.getElementById("cancel-btn").addEventListener("click", function () {

  let confirmCancel = confirm("Are you sure you want to cancel this order?");

  if (confirmCancel) {
    localStorage.removeItem("cart");
    localStorage.removeItem("buyNowProduct");
    localStorage.removeItem("customer");

    alert("Order Cancelled ❌");

    window.location.href = "../home/index.html";
  }

});
  // ✅ CONFIRM BUTTON
  confirmBtn.addEventListener("click", function () {

    alert("Order Confirmed ✅");

    localStorage.removeItem("cart");
    localStorage.removeItem("buyNowProduct");

    window.location.href = "../home/index.html";
  });

});