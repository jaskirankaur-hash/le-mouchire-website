const express = require("express");
const cors = require("cors");
const Razorpay = require("razorpay");
const crypto = require("crypto"); // 👈 ADD THIS

const app = express();

app.use(cors());
app.use(express.json());

// Razorpay setup
const razorpay = new Razorpay({
  key_id: "rzp_test_Sm4KYopFzBeiWn",
  key_secret: "mN7wYEsM5jr3eDl6l6fjfSHE"
});

// temporary storage
let orders = [];

// GET orders
app.get("/orders", (req, res) => {
  res.json(orders);
});

// SAVE order
app.post("/orders", (req, res) => {
  const order = req.body;

  console.log("New Order:", order);

  orders.push(order);

  res.json({ success: true });
});

// CREATE ORDER (Razorpay)
app.post("/create-order", async (req, res) => {

  const { amount } = req.body;

  const options = {
    amount: amount,
    currency: "INR",
    receipt: "order_" + Date.now()
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error creating order");
  }
});


// 🔥 👉 YAHI ADD KARNA THA (STEP 5)
app.post("/verify-payment", (req, res) => {

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", "YOUR_SECRET_KEY") // 👈 apna secret
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    res.json({ success: true });
  } else {
    res.status(400).json({ success: false });
  }
});


app.listen(5000, () => {
  console.log("Server running on port 5000 ✅");
});