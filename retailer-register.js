const form = document.getElementById("registerForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const shopName = document.getElementById("shopName").value;
    const ownerName = document.getElementById("ownerName").value;
    const mobile = document.getElementById("mobile").value;
    const password = document.getElementById("password").value;
    const address = document.getElementById("address").value;

    try {

        const response = await fetch("https://b2b-wala.onrender.com/api/retailers/register", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                shopName,
                ownerName,
                mobile,
                password,
                address
            })

        });

        const data = await response.json();

        if (data.success) {

            alert("Registration Successful");

            window.location.href = "retailer-login.html";

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.log(error);

        alert("Server Error");

    }

});