const wholesaler = JSON.parse(localStorage.getItem("wholesaler"));

if (!wholesaler) {

    alert("Please Login First");
    window.location.href = "wholesaler-login.html";

}

async function loadOrders() {

    try {

        const response = await fetch(
            `https://b2b-wala.onrender.com/api/orders/wholesaler/${wholesaler._id}`
        );

        const data = await response.json();

        const table = document.getElementById("orderTable");

        table.innerHTML = "";

        if (!data.success || data.orders.length === 0) {

            table.innerHTML = `
                <tr>
                    <td colspan="7">No Orders Found</td>
                </tr>
            `;

            return;
        }

        data.orders.forEach(order => {

            let actionButtons = "";

            if (order.status === "Pending") {

                actionButtons = `
                    <button onclick="acceptOrder('${order._id}')">
                        Accept
                    </button>

                    <button onclick="rejectOrder('${order._id}')">
                        Reject
                    </button>
                `;

            } else {

                actionButtons = order.status;

            }

            table.innerHTML += `

                <tr>

                    <td>${order.retailerId.shopName}</td>

                    <td>${order.productId.productName}</td>

                    <td>${order.quantity}</td>

                    <td>₹${order.price}</td>

                    <td>₹${order.totalAmount}</td>

                    <td>${order.status}</td>

                    <td>${actionButtons}</td>

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

loadOrders();