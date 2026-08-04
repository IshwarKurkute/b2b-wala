const wholesaler = JSON.parse(localStorage.getItem("wholesaler"));

if (!wholesaler) {

    alert("Please Login First");
    window.location.href = "wholesaler-login.html";

}

async function loadDrivers() {

    try {

        const response = await fetch(
            `https://b2b-wala.onrender.com/api/drivers/wholesaler/${wholesaler._id}`
        );

        const data = await response.json();

        const table = document.getElementById("driverTable");

        table.innerHTML = "";

        if (!data.success || data.drivers.length === 0) {

            table.innerHTML = `
                <tr>
                    <td colspan="5">No Drivers Found</td>
                </tr>
            `;

            return;

        }

        data.drivers.forEach(driver => {

            table.innerHTML += `

                <tr>

                    <td>${driver.name}</td>

                    <td>${driver.mobile}</td>

                    <td>${driver.vehicleNumber}</td>

                    <td>${driver.vehicleType}</td>

                    <td>${driver.status}</td>

                </tr>

            `;

        });

    }

    catch (error) {

        console.log(error);
        alert("Unable To Load Drivers");

    }

}

loadDrivers();