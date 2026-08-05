const wholesaler = JSON.parse(localStorage.getItem("wholesaler"));

if (!wholesaler) {

    alert("Please Login First");
    window.location.href = "wholesaler-login.html";

}

let drivers = [];

async function loadDrivers() {

    try {

        const response = await fetch(
            `https://b2b-wala.onrender.com/api/drivers/wholesaler/${wholesaler._id}`
        );

        const data = await response.json();

        if (data.success) {

            drivers = data.drivers;

        }

    }

    catch (error) {

        console.log(error);

    }

}

async function loadOrders() {

    try {

        await loadDrivers();

        const response = await fetch(
            `https://b2b-wala.onrender.com/api/orders/wholesaler/${wholesaler._id}`
        );

        const data = await response.json();

        const table = document.getElementById("orderTable");

        table.innerHTML = "";

        if (!data.success || data.orders.length === 0) {

            table.innerHTML = `
                <tr>
                    <td colspan="8">No Orders Found</td>
                </tr>
            `;

            return;

        }

        data.orders.forEach(order => {

            let driverOptions = "";

            drivers.forEach(driver => {

                driverOptions += `
                    <option value="${driver._id}">
                        ${driver.name}
                    </option>
                `;

            });

            let action = "";

            if (order.status === "Pending") {

                action = `
                    <button onclick="acceptOrder('${order._id}')">
                        Accept
                    </button>

                    <button onclick="rejectOrder('${order._id}')">
                        Reject
                    </button>
                `;

            }

            else if (order.status === "Accepted") {

                action = `

                    <select id="driver-${order._id}">

                        <option value="">
                            Select Driver
                        </option>

                        ${driverOptions}

                    </select>

                    <button onclick="assignDriver('${order._id}')">

                        Assign Driver

                    </button>

                `;

            }

            else {

                action = order.status;

            }

            table.innerHTML += `

                <tr>

                    <td>${order.retailerId.shopName}</td>

                    <td>${order.productId.productName}</td>

                    <td>${order.quantity}</td>

                    <td>₹${order.price}</td>

                    <td>₹${order.totalAmount}</td>

                    <td>${order.status}</td>

                    <td>

                        ${order.driverId ? order.driverId.name : "-"}

                    </td>

                    <td>

                        ${action}

                    </td>

                </tr>

            `;

        });

    }

    catch (error) {

        console.log(error);

        alert("Unable To Load Orders");

    }

}
async function acceptOrder(orderId) {

    const response = await fetch(

        `https://b2b-wala.onrender.com/api/orders/accept/${orderId}`,

        {
            method: "PUT"
        }

    );

    const data = await response.json();

    alert(data.message);

    loadOrders();

}

async function rejectOrder(orderId) {

    const response = await fetch(

        `https://b2b-wala.onrender.com/api/orders/reject/${orderId}`,

        {
            method: "PUT"
        }

    );

    const data = await response.json();

    alert(data.message);

    loadOrders();

}

async function assignDriver(orderId) {

    const driverId = document.getElementById(
        `driver-${orderId}`
    ).value;

    if (driverId === "") {

        alert("Please Select Driver");

        return;

    }

    try {

        const response = await fetch(

            `https://b2b-wala.onrender.com/api/orders/assign-driver/${orderId}`,

            {

                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    driverId

                })

            }

        );

        const data = await response.json();

        alert(data.message);

        loadOrders();

    }

    catch (error) {

        console.log(error);

        alert("Server Error");

    }

}

loadOrders();