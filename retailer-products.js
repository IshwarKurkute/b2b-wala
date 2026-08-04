const wholesalerId = localStorage.getItem("wholesalerId");
const retailer = JSON.parse(localStorage.getItem("retailer"));

async function loadProducts() {

    try {

        const response = await fetch(
            `https://b2b-wala.onrender.com/api/products/wholesaler/${wholesalerId}`
        );

        const data = await response.json();

        const productList = document.getElementById("productList");

        productList.innerHTML = "";

        if (!data.products || data.products.length === 0) {

            productList.innerHTML = "<h3>No Products Available</h3>";
            return;

        }

        data.products.forEach(product => {

            productList.innerHTML += `

            <div style="
                border:1px solid #ccc;
                border-radius:10px;
                padding:20px;
                margin-bottom:20px;
                background:#fff;
            ">

                <img
    src="https://b2b-wala.onrender.com/uploads/${product.image}"
    style="
        width:120px;
        height:120px;
        object-fit:contain;
        display:block;
        margin:auto;
    "
>

                <h3>${product.productName}</h3>

                <p><b>Category :</b> ${product.category}</p>

                <p><b>Brand :</b> ${product.brand}</p>

                <p><b>Price :</b> ₹${product.price}</p>

                <p><b>Stock :</b> ${product.stock}</p>

                <input
                    type="number"
                    id="qty-${product._id}"
                    placeholder="Enter Quantity"
                >

                <br><br>

                <button onclick="placeOrder(
                    '${product._id}',
                    '${product.price}'
                )">

                    Order Now

                </button>

            </div>

            `;

        });

    }

    catch (error) {

        console.log(error);

        alert("Unable To Load Products");

    }

}

async function placeOrder(productId, price) {

    const quantity = document.getElementById(
        `qty-${productId}`
    ).value;

    if (quantity === "" || quantity <= 0) {

        alert("Enter Quantity");

        return;

    }

    try {

        const response = await fetch(
            "https://b2b-wala.onrender.com/api/orders/place",
            {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    wholesalerId,

                    retailerId: retailer._id,

                    productId,

                    quantity,

                    price

                })

            }
        );

        const data = await response.json();

        alert(data.message);

    }

    catch (error) {

        console.log(error);

        alert("Server Error");

    }

}

loadProducts();