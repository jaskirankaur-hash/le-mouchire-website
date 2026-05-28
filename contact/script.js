document.addEventListener("DOMContentLoaded", function() {

  const form = document.getElementById("contactForm");
  const msg = document.getElementById("msg");

  // ✅ safety check (important)
  if (!form) return;

  form.addEventListener("submit", async function(e) {
    e.preventDefault();

    const formData = {
      name: form.name.value,
      email: form.email.value,
      phone: form.phone.value,
      message: form.message.value
    };

    try {
      const res = await fetch("http://localhost:5000/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      // ❗ check karo response valid hai ya nahi
      if (!res.ok) {
        throw new Error("Server error");
      }

      const data = await res.json();

      msg.style.color = "green";
      msg.textContent = data.message || "Message Sent Successfully ✅";
      form.reset();

    } catch (error) {
      console.log(error);
      msg.style.color = "red";
      msg.textContent = "Server not responding ❌";
    }
  });

});