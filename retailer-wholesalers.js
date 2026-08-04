async function loadWholesalers() {

    try {

        const response = await fetch("https://b2b-wala.onrender.com/api/wholesaler/all");

        const data = await response.json();

        const wholesalerList = document.getElementById("wholesalerList");

        wholesalerList.innerHTML = "";

        data.wholesalers.forEach((wholesaler) => {

            wholesalerList.innerHTML += `
                <div style="
                    border:1px solid #ccc;
                    padding:15px;
                    margin-bottom:15px;
                    border-radius:10px;
                    background:white;
                ">

                    <h3>${wholesaler.shopName}</h3>

                    <p><b>Owner :</b> ${wholesaler.name}</p>

                    <p><b>Address :</b> ${wholesaler.address}</p>

                    <button
                        onclick="viewProducts('${wholesaler._id}')">
                        View Products
                    </button>

                </div>
            `;

        });

    } catch (error) {

        console.log(error);

        alert("Unable to Load Wholesalers");

    }

}

function viewProducts(id){

    localStorage.setItem("wholesalerId", id);

    window.location.href = "retailer-products.html";

}

loadWholesalers();