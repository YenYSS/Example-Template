const productImage =
    document.querySelector(".product-detail-image img");

const productCategory =
    document.querySelector(".product-detail-category");

const productName =
    document.querySelector(".product-detail-content h1");

const productPrice =
    document.querySelector(".product-detail-price");

const productDescription =
    document.querySelector(".product-detail-description");

const quantityValue =
    document.querySelector(".quantity-value");

const quantityButtons =
    document.querySelectorAll(".product-detail-quantity .quantity-button");

const estimateButton =
    document.querySelector(".product-estimate-button");

const informationDescription =
    document.querySelector(".product-information p");

const detailsList =
    document.querySelector(".product-details-list");

const productId =
    new URLSearchParams(window.location.search).get("id");

const product =
    products.find(item => item.id === productId);


// -----------------------------------------------------
// PRODUCT NOT FOUND
// -----------------------------------------------------

if (!product) {
    window.location.href = "catalog.html";
}


// -----------------------------------------------------
// PRODUCT DATA
// -----------------------------------------------------

if (product) {

    document.title = `${product.name} | Rafita's Party Rental`;

    productImage.src = product.image;
    productImage.alt = product.alt;

    productCategory.textContent =
        product.categoryLabel;

    productName.textContent =
        product.name;

    productPrice.innerHTML = `
        From
        <strong>$${product.price.toFixed(2)}</strong>
        per ${product.unit}
    `;

    productDescription.textContent =
        product.description;

    informationDescription.textContent =
        product.description;

    detailsList.innerHTML =
        product.details
            .map(detail => `
                <li>
                    <i
                        class="fa-solid fa-check"
                        aria-hidden="true"
                    ></i>
                    ${detail}
                </li>
            `)
            .join("");
}


// -----------------------------------------------------
// QUANTITY
// -----------------------------------------------------

let quantity = 0;

const savedItems =
    JSON.parse(
        localStorage.getItem("rafitasSelectedItems")
    ) || {};

if (product) {
    quantity = savedItems[product.id] || 0;
}

function updateQuantityDisplay() {
    quantityValue.textContent = quantity;
}

function saveQuantity() {

    if (quantity <= 0) {
        delete savedItems[product.id];
    } else {
        savedItems[product.id] = quantity;
    }

    localStorage.setItem(
        "rafitasSelectedItems",
        JSON.stringify(savedItems)
    );
}

quantityButtons.forEach(button => {

    button.addEventListener("click", () => {

        const isIncrease =
            button.querySelector(".fa-plus");

        if (isIncrease) {
            quantity++;
        } else {
            quantity = Math.max(0, quantity - 1);
        }

        updateQuantityDisplay();
        saveQuantity();
    });

});


// -----------------------------------------------------
// ADD TO ESTIMATE
// -----------------------------------------------------

estimateButton.addEventListener("click", () => {

    if (quantity === 0) {
        quantity = 1;
        updateQuantityDisplay();
        saveQuantity();
    }

    window.location.href = "catalog.html";
});


// -----------------------------------------------------
// INITIAL DISPLAY
// -----------------------------------------------------

updateQuantityDisplay();