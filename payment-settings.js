const wholesaler = JSON.parse(localStorage.getItem("wholesaler"));

if (!wholesaler) {

    alert("Please Login First");
    window.location.href = "wholesaler-login.html";

}

const qrInput = document.getElementById("qrCode");
const previewImage = document.getElementById("previewImage");


// ==========================
// QR Preview
// ==========================

qrInput.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {

        previewImage.src = e.target.result;
        previewImage.style.display = "block";

    };

    reader.readAsDataURL(file);

});


// ==========================
// Save Payment Settings
// ==========================

document.getElementById("paymentForm").addEventListener(

    "submit",

    async function (e) {

        e.preventDefault();

        const upiId = document.getElementById("upiId").value.trim();

        const qrCode = qrInput.files[0];

        if (!upiId) {

            alert("Please Enter UPI ID");
            return;

        }

        if (!qrCode) {

            alert("Please Select QR Code");
            return;

        }

        const formData = new FormData();

        formData.append("upiId", upiId);
        formData.append("qrCode", qrCode);

        try {

            const response = await fetch(

                `https://b2b-wala.onrender.com/api/payments/settings/${wholesaler._id}`,

                {

                    method: "PUT",

                    body: formData

                }

            );

            const data = await response.json();

            if (data.success) {

                alert("Payment Details Saved Successfully");

            } else {

                alert(data.message);

            }

        }

        catch (error) {

            console.log(error);

            alert("Server Error");

        }

    }

);