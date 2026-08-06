const retailer = JSON.parse(localStorage.getItem("retailer"));

console.log("Retailer Object:", retailer);
console.log("Retailer ID:", retailer ? retailer._id : null);


if (!retailer) {

    alert("Please Login First");
    window.location.href = "retailer-login.html";

}



async function loadOrders() {

    try {


        const url = `https://b2b-wala.onrender.com/api/orders/retailer/${retailer._id}`;


        const response = await fetch(url);


        const data = await response.json();


        const table = document.getElementById("orderTable");


        table.innerHTML = "";



        if (!data.success || data.orders.length === 0) {


            table.innerHTML = `

                <tr>

                    <td colspan="6">
                        No Orders Found
                    </td>

                </tr>

            `;


            return;

        }



        data.orders.forEach(order => {
            console.log("ORDER DATA:", order);


            let otp = "-";


            if(order.status === "Out For Delivery"){

                otp = order.deliveryOTP;

            }



            table.innerHTML += `


                <tr>


                    <td>
                        ${order.productId.productName}
                    </td>


                    <td>
                        ${order.quantity}
                    </td>


                    <td>
                        ₹${order.price}
                    </td>


                    <td>
                        ₹${order.totalAmount}
                    </td>


                    <td>
                        ${order.status}
                    </td>
                    
                    


                    <td>

                        ${otp}

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



loadOrders();