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


            let action = "";


            if (order.status === "Driver Assigned") {

                action = `

                <button onclick="outForDelivery('${order._id}')">

                    Out For Delivery

                </button>

                `;

            }


            else if (order.status === "Out For Delivery") {


                action = `

                <input 
                type="text" 
                id="otp-${order._id}" 
                placeholder="Enter OTP"
                style="width:100px;padding:5px;"
                >


                <button onclick="verifyOTP('${order._id}')">

                    Verify

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

                <td>${order.retailerId.address}</td>

                <td>${order.status}</td>

                <td>

                    ${action}

                </td>


            </tr>

            `;


        });


    }

    catch(error){

        console.log(error);

        alert("Unable To Load Orders");

    }

}




async function outForDelivery(orderId){


    const response = await fetch(

        `https://b2b-wala.onrender.com/api/orders/out-for-delivery/${orderId}`,

        {

            method:"PUT"

        }

    );


    const data = await response.json();


    alert(data.message);


    loadOrders();


}





async function verifyOTP(orderId){


    const otp = document.getElementById(
        `otp-${orderId}`
    ).value;



    const response = await fetch(

        `https://b2b-wala.onrender.com/api/orders/verify-otp/${orderId}`,

        {

            method:"PUT",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify({

                otp

            })

        }

    );


    const data = await response.json();


    alert(data.message);


    loadOrders();


}



loadOrders();