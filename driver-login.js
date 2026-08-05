const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const mobile = document.getElementById("mobile").value;
    const password = document.getElementById("password").value;

    try {

        const response = await fetch(
            "https://b2b-wala.onrender.com/api/drivers/login",
            {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    mobile,
                    password

                })

            }
        );

        const data = await response.json();

        if (data.success) {

            alert("Login Successful");

            localStorage.setItem(
                "driver",
                JSON.stringify(data.driver)
            );

            window.location.href = "driver-dashboard.html";

        }

        else {

            alert(data.message);

        }

    }

    catch (error) {

        console.log(error);

        alert("Server Error");

    }

});