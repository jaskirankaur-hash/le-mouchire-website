document.addEventListener("DOMContentLoaded", function () {

  const product = JSON.parse(localStorage.getItem("buyNowProduct"));

  if (product) {
    document.getElementById("product").innerHTML = `
      <h3>${product.name}</h3>
      <p>Price: ₹${product.price}</p>
      <img src="${product.image}" width="100">
    `;
  }

  const paymentEl = document.getElementById("payment");

  if (paymentEl) {
    paymentEl.addEventListener("change", function () {
      document.getElementById("upi-box").style.display =
        this.value === "UPI" ? "block" : "none";
    });
  }

  const btn = document.getElementById("place-btn");

  if (btn) {
    btn.addEventListener("click", async function () {

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const phone = document.getElementById("phone").value;
      const address = document.getElementById("address").value;
      const payment = document.getElementById("payment").value;

      if (!name || !phone || !address) {
        alert("Please fill all details ❗");
        return;
      }

      // 👉 COD CASE
      if (payment === "COD") {

        await fetch("http://localhost:5000/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name,
            email,
            phone,
            address,
            payment: "COD",
            product
          })
        });

        localStorage.setItem("customer", JSON.stringify({
          name,
          phone,
          address,
          payment: "COD"
        }));

        alert("Order Placed (COD) ✅");
        window.location.href = "../ordersummary/index.html";
      }

      // 👉 ONLINE PAYMENT (RAZORPAY)
      else if (payment === "UPI") {

        const amount = product.price * 100;

        const res = await fetch("http://localhost:5000/create-order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ amount })
        });

        const data = await res.json();

        const options = {
          key: "rzp_test_Sm4KYopFzBeiWn",
          amount: data.amount,
          currency: "INR",
          name: "LE MOUCHIRE",
          description: product.name,
          order_id: data.id,

          handler: async function (response) {

            await fetch("http://localhost:5000/orders", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                name,
                email,
                phone,
                address,
                payment: "ONLINE",
                product
              })
            });

            alert("Payment Successful ✅");

            window.location.href = "../ordersummary/index.html";
          }
        };

        const rzp = new Razorpay(options);
        rzp.open();
      }

    });
  }

});