console.log("Products JS Loaded");

// =============================
// Elements
// =============================

const tableBody = document.getElementById("productTable");

const modal = document.getElementById("productModal");
const addBtn = document.getElementById("addProductBtn");
const closeBtn = document.querySelector(".close");

const productForm = document.getElementById("productForm");

// =============================
// Load Products
// =============================

async function loadProducts() {

    try {

        const response = await fetch("https://b2b-wala.onrender.com/api/products");

        const data = await response.json();

        tableBody.innerHTML = "";

        data.products.forEach(product => {

            tableBody.innerHTML += `

            <tr>

                <td>
                    <img
                    src="https://b2b-wala.onrender.com/uploads/${product.image}"
                    width="60"
                    height="60">
                </td>

                <td>${product.productName}</td>
                <td>${product.category}</td>
                <td>${product.brand}</td>
                <td>₹${product.price}</td>
                <td>${product.stock}</td>

            </tr>

            `;

        });

    }

    catch (err) {

        console.log(err);

    }

}

loadProducts();

// =============================
// Open Modal
// =============================

addBtn.addEventListener("click", () => {

    modal.style.display = "flex";

});

// =============================
// Close Modal
// =============================

closeBtn.addEventListener("click", () => {

    modal.style.display = "none";

});

window.addEventListener("click", (e) => {

    if (e.target === modal) {

        modal.style.display = "none";

    }

});

// =============================
// Add Product
// =============================

productForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    try {

        const wholesalerId = localStorage.getItem("wholesalerId");

        if (!wholesalerId) {

            alert("Wholesaler Login Required");

            return;

        }

        const formData = new FormData();

        formData.append("wholesalerId", wholesalerId);

        formData.append("image", document.getElementById("image").files[0]);

        formData.append("productName", document.getElementById("productName").value);

        formData.append("category", document.getElementById("category").value);

        formData.append("brand", document.getElementById("brand").value);

        formData.append("price", document.getElementById("price").value);

        formData.append("stock", document.getElementById("stock").value);

        formData.append("unit", "Piece");

        const response = await fetch(
            "https://b2b-wala.onrender.com/api/products/add",
            {
                method: "POST",
                body: formData
            }
        );

        const data = await response.json();

        if (data.success) {

            alert("✅ Product Added Successfully");

            productForm.reset();

            modal.style.display = "none";

            loadProducts();

        } else {

            alert(data.message);

        }

    }

    catch (err) {

    console.log("ERROR :", err);

    if (err.response) {
        console.log(err.response);
    }

    alert(err.message);

}

});