function loadWishlist() {

  let wishlist =
    JSON.parse(localStorage.getItem("wishlist")) || [];

  let container =
    document.getElementById("wishlist-items");

  container.innerHTML = "";

  if (wishlist.length === 0) {
    container.innerHTML = "<h3>No Wishlist Items ❤️</h3>";
    return;
  }

  wishlist.forEach((item, index) => {

    container.innerHTML += `
    
    <div class="product-card">

      <img src="${item.image}" width="200">

      <h3>${item.name}</h3>

      <p>₹${item.price}</p>

      <button onclick="removeWishlist(${index})">
        Remove
      </button>

    </div>
    `;
  });
}

function removeWishlist(index) {

  let wishlist =
    JSON.parse(localStorage.getItem("wishlist"));

  wishlist.splice(index, 1);

  localStorage.setItem(
    "wishlist",
    JSON.stringify(wishlist)
  );

  loadWishlist();
}

loadWishlist();