const driver = JSON.parse(localStorage.getItem("driver"));

if (!driver) {

    alert("Please Login First");
    window.location.href = "driver-login.html";

}

async function loadOrders() {

    try {

        const response = await fetch(
            `https://b2b-wala.onrender.com/api/orders/driver/${driver._id}`
        );

        const data = await response.json();

        const table = document.getElementById("orderTable");

        table.innerHTML = "";

        if (!data.success || data.orders.length === 0) {

            table.innerHTML = `
                <tr>
                    <td colspan="6">No Orders Assigned</td>
                </tr>
            `;

            return;

        }

        data.orders.forEach(order => {

            table.innerHTML += `

                <tr>

                    <td>${order.retailerId.shopName}</td>

                    <td>${order.productId.productName}</td>

                    <td>${order.quantity}</td>

                    <td>${order.retailerId.address}</td>

                    <td>${order.status}</td>

                    <td>

                        <button onclick="outForDelivery('${order._id}')">

                            Out For Delivery

                        </button>

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

async function outForDelivery(orderId) {

    const response = await fetch(

        `https://b2b-wala.onrender.com/api/orders/out-for-delivery/${orderId}`,

        {

            method: "PUT"

        }

    );

    const data = await response.json();

    alert(data.message);

    loadOrders();

}

loadOrders();