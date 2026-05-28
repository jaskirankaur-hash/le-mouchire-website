console.log("Dashboard Script Running");

async function loadDashboard(){

try{

const res = await fetch("http://localhost:5000/api/admin/data");

const data = await res.json();

console.log(data);

document.getElementById("products").innerText = data.totalProducts;

document.getElementById("orders").innerText = data.totalOrders;

document.getElementById("messages").innerText = data.totalMessages;

}catch(err){

console.log(err);

}

}

loadDashboard();