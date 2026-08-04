const wholesaler = JSON.parse(localStorage.getItem("wholesaler"));

const form = document.getElementById("driverForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const name = document.getElementById("name").value;
    const mobile = document.getElementById("mobile").value;
    const vehicleNumber = document.getElementById("vehicleNumber").value;
    const vehicleType = document.getElementById("vehicleType").value;
    const password = document.getElementById("password").value;

    try {

        const response = await fetch(
            "https://b2b-wala.onrender.com/api/drivers/register",
            {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    wholesalerId: wholesaler._id,
                    name,
                    mobile,
                    vehicleNumber,
                    vehicleType,
                    password

                })

            }
        );

        const data = await response.json();

        alert(data.message);

        if (data.success) {

            window.location.href = "drivers.html";

        }

    }

    catch (error) {

        console.log(error);

        alert("Server Error");

    }

});