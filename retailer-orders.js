const retailer = JSON.parse(localStorage.getItem("retailer"));

if (!retailer) {

    alert("Please Login First");
    window.location.href = "retailer-login.html";

}

async function loadOrders() {

    try {

        const response = await fetch(
            `https://b2b-wala.onrender.com/api/orders/retailer/${retailer._id}`
        );

        const data = await response.json();

        const table = document.getElementById("orderTable");

        table.innerHTML = "";

        if (!data.success || data.orders.length === 0) {

            table.innerHTML = `
                <tr>
                    <td colspan="5">No Orders Found</td>
                </tr>
            `;

            return;

        }

        data.orders.forEach(order => {

            table.innerHTML += `

                <tr>

                    <td>${order.productId.productName}</td>

                    <td>${order.quantity}</td>

                    <td>₹${order.price}</td>

                    <td>₹${order.totalAmount}</td>

                    <td>${order.status}</td>

                </tr>

            `;

        });

    }

    catch (error) {

        console.log(error);
        alert("Unable To Load Orders");

    }

}

loadOrders();