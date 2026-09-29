// =====================================================
// CATALOG ELEMENTS
// =====================================================

const productsGrid = document.getElementById("products-grid");
const searchInput = document.getElementById("catalog-search");
const categoryButtons = document.querySelectorAll(".category-button");
const productsCount = document.querySelector(".products-count");
const selectedItemsContainer = document.querySelector(".estimate-items");
const selectedItemsCount = document.querySelector(".estimate-items-header span");
const estimateTotal = document.querySelector(".estimate-total-row strong");
const estimateTotalNote = document.querySelector(".estimate-total p");

let activeCategory = "all";

// =====================================================
// CATALOG STATE
// =====================================================

let selectedItems =
    JSON.parse(
        localStorage.getItem("rafitasSelectedItems")
    ) || {};
let eventDate = "";

const rentalSettings = {
    deliverySetup: 20
};

const eventDateInput =
    document.getElementById("event-date");

if (eventDateInput) {
    const today = new Date();

    const localToday = new Date(
        today.getTime() -
        today.getTimezoneOffset() * 60000
    )
        .toISOString()
        .split("T")[0];

    eventDateInput.min = localToday;

    eventDateInput.addEventListener("change", () => {
        eventDate = eventDateInput.value;
    });
}

// =====================================================
// RENDER PRODUCTS
// =====================================================

// =====================================================
// RENDER PRODUCTS
// =====================================================

function renderProducts(productList) {

    if (!productsGrid) return;

    productsGrid.innerHTML = "";


    // Update visible product count
    if (productsCount) {
        productsCount.textContent = `${productList.length} ${
            productList.length === 1 ? "item" : "items"
        }`;
    }


    // Empty state
    if (productList.length === 0) {

        const emptyState = document.createElement("div");

        emptyState.className = "catalog-empty";

        emptyState.innerHTML = `

            <div class="catalog-empty-icon">
                <i
                    class="fa-solid fa-magnifying-glass"
                    aria-hidden="true"
                ></i>
            </div>

            <h3>No items found</h3>

            <p>
                Try a different search or browse another category.
            </p>

        `;

        productsGrid.appendChild(emptyState);

        return;
    }


    // Generate product cards
    productList.forEach(product => {

        const card = document.createElement("article");

        card.className = "product-card";

        card.dataset.productId = product.id;
        card.dataset.category = product.category;

        card.innerHTML = `

            <div class="product-image">

                <img
                    src="${product.image}"
                    alt="${product.alt}"
                    loading="lazy"
                >

            </div>


            <div class="product-info">

                <span class="product-category">
                    ${product.categoryLabel}
                </span>

                <h3>
                    ${product.name}
                </h3>

                <p class="product-price">
                    From <strong>$${product.price.toFixed(2)}</strong>
                    per ${product.unit}
                </p>


                <div class="product-actions">

                    <span class="quantity-label">
                        Quantity
                    </span>

                    <div class="quantity-control">

                        <button
                            type="button"
                            class="quantity-button"
                            data-action="decrease"
                            aria-label="Decrease ${product.name} quantity"
                        >
                            <i
                                class="fa-solid fa-minus"
                                aria-hidden="true"
                            ></i>
                        </button>


                        <span
                            class="quantity-value"
                            aria-live="polite"
                        >
                            ${selectedItems[product.id] || 0}
                        </span>

                        <button
                            type="button"
                            class="quantity-button"
                            data-action="increase"
                            aria-label="Increase ${product.name} quantity"
                        >
                            <i
                                class="fa-solid fa-plus"
                                aria-hidden="true"
                            ></i>
                        </button>

                    </div>

                </div>

            </div>

        `;

        productsGrid.appendChild(card);
        card.addEventListener("click", (event) => {

        if (event.target.closest(".quantity-control")) {
            return;
        }

        window.location.href = `product.html?id=${product.id}`;

    });

    });

}

// =====================================================
// UPDATE PRODUCT QUANTITY
// =====================================================

function updateQuantity(productId, change) {

    const currentQuantity =
        selectedItems[productId] || 0;

    const newQuantity =
        Math.max(
            0,
            currentQuantity + change
        );


    if (newQuantity === 0) {

        delete selectedItems[productId];

    } else {

        selectedItems[productId] = newQuantity;

    }


    localStorage.setItem(
        "rafitasSelectedItems",
        JSON.stringify(selectedItems)
    );


    updateEstimate();
    updateProductQuantities();
}

// =====================================================
// UPDATE PRODUCT QUANTITIES
// =====================================================

function updateProductQuantities() {

    document
        .querySelectorAll(".product-card")
        .forEach(card => {

            const productId = card.dataset.productId;

            const quantityElement =
                card.querySelector(".quantity-value");

            if (quantityElement) {

                quantityElement.textContent =
                    selectedItems[productId] || 0;

            }

        });

}

// =====================================================
// PRODUCT QUANTITY CONTROLS
// =====================================================

if (productsGrid) {

    productsGrid.addEventListener("click", event => {

        const button =
            event.target.closest(".quantity-button");

        if (!button) return;


        const card =
            button.closest(".product-card");

        if (!card) return;


        const productId =
            card.dataset.productId;

        const action =
            button.dataset.action;


        if (action === "increase") {

            updateQuantity(productId, 1);

        }


        if (action === "decrease") {

            updateQuantity(productId, -1);

        }

    });

}

// =====================================================
// UPDATE ESTIMATE
// =====================================================

function updateEstimate() {

    const selectedProductIds =
        Object.keys(selectedItems);


    // Total quantity of selected items
    const totalQuantity =
        Object.values(selectedItems)
            .reduce((total, quantity) => {
                return total + quantity;
            }, 0);


    // Update item counter
    if (selectedItemsCount) {

        selectedItemsCount.textContent =
            totalQuantity;

    }


    // Calculate subtotal
    const subtotal =
        selectedProductIds.reduce((total, productId) => {

            const product =
                products.find(item => item.id === productId);

            if (!product) return total;


            const quantity =
                selectedItems[productId];


            return total +
                (product.price * quantity);

        }, 0);


    const deliverySetup =
        subtotal > 0
            ? rentalSettings.deliverySetup
            : 0;


    const total =
        subtotal + deliverySetup;


    // Update total
    if (estimateTotal) {

        estimateTotal.textContent =
            `$${total.toFixed(2)}`;

    }


    // Update selected items
    renderSelectedItems(
        subtotal,
        deliverySetup
    );

}

// =====================================================
// RENDER SELECTED ITEMS
// =====================================================

function renderSelectedItems(subtotal, deliverySetup) {

    if (!selectedItemsContainer) return;


    const selectedProductIds =
        Object.keys(selectedItems);


    // Empty state
    if (selectedProductIds.length === 0) {

        selectedItemsContainer.innerHTML = `

            <div class="estimate-items-header">

                <h3>Selected items</h3>

                <span>0</span>

            </div>


            <div class="empty-estimate">

                <div class="empty-estimate-icon">

                    <i
                        class="fa-solid fa-list-check"
                        aria-hidden="true"
                    ></i>

                </div>

                <p>Your estimate is waiting</p>

                <span>
                    Select rental items from the catalog
                    and we'll keep track of them here.
                </span>

            </div>

        `;

        return;
    }


    // Selected items
    selectedItemsContainer.innerHTML = `

        <div class="estimate-items-header">

            <h3>Selected items</h3>

            <span>${Object.values(selectedItems)
                .reduce((total, quantity) => total + quantity, 0)}</span>

        </div>


        <div class="selected-items-list">

            ${selectedProductIds.map(productId => {

                const product =
                    products.find(item => item.id === productId);

                if (!product) return "";


                const quantity =
                    selectedItems[productId];


                const itemTotal =
                    product.price * quantity;


                return `

                    <div
                        class="selected-item"
                        data-product-id="${product.id}"
                    >

                        <div class="selected-item-info">

                            <strong>
                                ${product.name}
                            </strong>

                            <span>
                                ${quantity} ×
                                $${product.price.toFixed(2)}
                            </span>

                        </div>


                        <div class="selected-item-right">

                            <strong>
                                $${itemTotal.toFixed(2)}
                            </strong>


                            <div class="selected-item-controls">

                                <button
                                    type="button"
                                    class="selected-quantity-button"
                                    data-action="decrease"
                                    aria-label="Decrease ${product.name} quantity"
                                >
                                    <i
                                        class="fa-solid fa-minus"
                                        aria-hidden="true"
                                    ></i>
                                </button>


                                <span>
                                    ${quantity}
                                </span>


                                <button
                                    type="button"
                                    class="selected-quantity-button"
                                    data-action="increase"
                                    aria-label="Increase ${product.name} quantity"
                                >
                                    <i
                                        class="fa-solid fa-plus"
                                        aria-hidden="true"
                                    ></i>
                                </button>

                            </div>

                        </div>

                    </div>

                `;

            }).join("")}

        </div>


        <div class="estimate-breakdown">

            <div>
                <span>Rental subtotal</span>
                <strong>$${subtotal.toFixed(2)}</strong>
            </div>

            <div>
                <span>Delivery & setup</span>
                <strong>$${deliverySetup.toFixed(2)}</strong>
            </div>

        </div>

    `;
}

// =====================================================
// SELECTED ITEM CONTROLS
// =====================================================

if (selectedItemsContainer) {

    selectedItemsContainer.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    ".selected-quantity-button"
                );

            if (!button) return;


            const item =
                button.closest(".selected-item");

            if (!item) return;


            const productId =
                item.dataset.productId;

            const action =
                button.dataset.action;


            if (action === "increase") {

                updateQuantity(productId, 1);

            }


            if (action === "decrease") {

                updateQuantity(productId, -1);

            }

        }
    );

}

// =====================================================
// FILTER PRODUCTS
// =====================================================

function filterProducts() {

    const searchTerm = searchInput
        ? searchInput.value.trim().toLowerCase()
        : "";


    const filteredProducts = products.filter(product => {

        // Category filter
        const matchesCategory =
            activeCategory === "all" ||
            product.category === activeCategory;


        // Search filter
        const matchesSearch =
            product.name.toLowerCase().includes(searchTerm) ||
            product.categoryLabel.toLowerCase().includes(searchTerm);


        return matchesCategory && matchesSearch;

    });


    renderProducts(filteredProducts);

}

// =====================================================
// SEARCH
// =====================================================

if (searchInput) {

    searchInput.addEventListener("input", filterProducts);

}

// =====================================================
// CATEGORY FILTER
// =====================================================

categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        activeCategory = button.dataset.category;


        // Update active button
        categoryButtons.forEach(categoryButton => {
            categoryButton.classList.remove("active");
        });

        button.classList.add("active");


        filterProducts();

    });

});

// =====================================================
// INITIAL RENDER
// =====================================================

renderProducts(products);
updateEstimate();