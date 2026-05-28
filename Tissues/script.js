// 🔹 UPDATE CART COUNT
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let totalQty = cart.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  let cartElement = document.getElementById("cart-count");

  if (cartElement) {
    cartElement.innerText = totalQty;
  }
}


// 🔹 ADD TO CART
function addToCart(name, price, image) {

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let existing = cart.find(item => item.name === name);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      name: name,
      price: price,
      image: image,
      quantity: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();

  alert("Product added to cart 🛒");
}


// 🔹 BUY NOW (Direct checkout)
function buyNow(name, price, image) {

  const product = {
    name: name,
    price: price,
    image: image,
    quantity: 1
  };

  // Buy now ke liye cart clear
  localStorage.removeItem("cart");

  // Product save
  localStorage.setItem(
    "buyNowProduct",
    JSON.stringify(product)
  );

  // Checkout page
  window.location.href = "../checkout/index.html";
}


// 🔹 PAGE LOAD
document.addEventListener("DOMContentLoaded", function () {
  updateCartCount();
});


// 🔹 GLOBAL (button onclick ke liye)
window.addToCart = addToCart;
window.buyNow = buyNow;

// ❤️ WISHLIST
function addToWishlist(name, price, image) {

  let wishlist =
    JSON.parse(localStorage.getItem("wishlist")) || [];

  let existing =
    wishlist.find(item => item.name === name);

  if (existing) {

    alert("Already in wishlist ❤️");

  } else {

    wishlist.push({
      name,
      price,
      image
    });

    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlist)
    );

    alert("Added to wishlist ❤️");
  }
}

window.addToWishlist = addToWishlist;