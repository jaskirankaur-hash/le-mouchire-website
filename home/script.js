// cart count update function
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  let totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);

  let cartElement = document.getElementById("cart-count");
  if(cartElement){
    cartElement.innerText = totalQty;
  }
}


// add to cart function
function addToCart(name, price, image){

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let existing = cart.find(item => item.name === name);

if(existing){
existing.quantity += 1;
}else{
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

// ❤️ WISHLIST
function addToWishlist(name, price, image) {

  let wishlist =
    JSON.parse(localStorage.getItem("wishlist")) || [];

  let existing =
    wishlist.find(item => item.name === name);

  if (existing) {

    alert("Already in Wishlist ❤️");

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

    alert("Added to Wishlist ❤️");
  }
}

window.addToWishlist = addToWishlist;

// ✅ page load hone ke baad run hoga
document.addEventListener("DOMContentLoaded", function () {
  updateCartCount();
});