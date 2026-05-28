console.log("Orders Page Loaded ✅");

async function loadOrders() {

  try {

    const res = await fetch("http://localhost:5000/orders");
    const orders = await res.json();

    console.log("Orders:", orders);

    const table = document.getElementById("orders-table");
    table.innerHTML = "";

    if (orders.length === 0) {
      table.innerHTML = "<tr><td colspan='7'>No Orders Found ❌</td></tr>";
      return;
    }

    orders.forEach((order, index) => {

      table.innerHTML += `
      <tr>

        <td>${order.name || "-"}</td>

        <td>${order.phone || "-"}</td>

        <td>${order.address || "-"}</td>

        <td>₹${order.product?.price || 0}</td>

        <td>${order.product?.name || "N/A"}</td>

        <td id="status-${index}">
          Pending
        </td>

        <td>

          <button onclick="updateStatus(${index}, 'Shipped')">
            Shipped
          </button>

          <button onclick="updateStatus(${index}, 'Delivered')">
            Delivered
          </button>

          <button onclick="updateStatus(${index}, 'Cancelled')">
            Cancel
          </button>

        </td>

      </tr>
      `;

    });

  } catch (error) {
    console.log("Error loading orders:", error);
  }

}

function updateStatus(index, status) {

  document.getElementById(`status-${index}`).innerText = status;

}

loadOrders();