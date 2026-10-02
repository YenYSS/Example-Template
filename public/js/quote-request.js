// =====================================================
// QUOTE REQUEST STATE
// =====================================================

const selectedItems =
    JSON.parse(
        localStorage.getItem("rafitasSelectedItems")
    ) || {};

const savedEventDate =
    localStorage.getItem("rafitasEventDate") || "";

const savedGuestCount =
    localStorage.getItem("rafitasGuestCount") || "";

// =====================================================
// SAVED CUSTOMER INFORMATION
// =====================================================

const savedCustomerName =
    localStorage.getItem("rafitasCustomerName") || "";

const savedCustomerEmail =
    localStorage.getItem("rafitasCustomerEmail") || "";

const savedCustomerPhone =
    localStorage.getItem("rafitasCustomerPhone") || "";

const savedEventLocation =
    localStorage.getItem("rafitasEventLocation") || "";

const savedAdditionalDetails =
    localStorage.getItem("rafitasAdditionalDetails") || "";


// =====================================================
// ELEMENTS
// =====================================================

const quoteForm =
    document.getElementById("quote-request-form");

const quoteSelectedItems =
    document.getElementById("quote-selected-items");

const quoteEstimatedTotal =
    document.getElementById("quote-estimated-total");

const quoteSubmitMessage =
    document.getElementById("quote-submit-message");

const eventDateInput =
    document.getElementById("event-date");

const guestCountInput =
    document.getElementById("guest-count");


// =====================================================
// RESTORE EVENT DETAILS
// =====================================================

if (eventDateInput && savedEventDate) {
    eventDateInput.value =
        savedEventDate;
}

if (guestCountInput && savedGuestCount) {
    guestCountInput.value =
        savedGuestCount;
}

// =====================================================
// RESTORE CUSTOMER INFORMATION
// =====================================================

const customerNameInput =
    document.getElementById("customer-name");

const customerEmailInput =
    document.getElementById("customer-email");

const customerPhoneInput =
    document.getElementById("customer-phone");

const eventLocationInput =
    document.getElementById("event-location");

const additionalDetailsInput =
    document.getElementById("additional-details");


if (customerNameInput && savedCustomerName) {
    customerNameInput.value =
        savedCustomerName;
}

if (customerEmailInput && savedCustomerEmail) {
    customerEmailInput.value =
        savedCustomerEmail;
}

if (customerPhoneInput && savedCustomerPhone) {
    customerPhoneInput.value =
        savedCustomerPhone;
}

if (eventLocationInput && savedEventLocation) {
    eventLocationInput.value =
        savedEventLocation;
}

if (additionalDetailsInput && savedAdditionalDetails) {
    additionalDetailsInput.value =
        savedAdditionalDetails;
}

// =====================================================
// SAVE CUSTOMER INFORMATION
// =====================================================

if (customerNameInput) {

    customerNameInput.addEventListener(
        "input",
        () => {

            localStorage.setItem(
                "rafitasCustomerName",
                customerNameInput.value
            );

        }
    );
}


if (customerEmailInput) {

    customerEmailInput.addEventListener(
        "input",
        () => {

            localStorage.setItem(
                "rafitasCustomerEmail",
                customerEmailInput.value
            );

        }
    );
}


if (customerPhoneInput) {

    customerPhoneInput.addEventListener(
        "input",
        () => {

            localStorage.setItem(
                "rafitasCustomerPhone",
                customerPhoneInput.value
            );

        }
    );
}


if (eventLocationInput) {

    eventLocationInput.addEventListener(
        "input",
        () => {

            localStorage.setItem(
                "rafitasEventLocation",
                eventLocationInput.value
            );

        }
    );
}


if (additionalDetailsInput) {

    additionalDetailsInput.addEventListener(
        "input",
        () => {

            localStorage.setItem(
                "rafitasAdditionalDetails",
                additionalDetailsInput.value
            );

        }
    );
}


// =====================================================
// RENDER SELECTED ITEMS
// =====================================================

function renderQuoteItems() {

    const selectedProductIds =
        Object.keys(selectedItems);

    // -----------------------------------------------
    // No products selected
    // -----------------------------------------------

    if (selectedProductIds.length === 0) {

        quoteSelectedItems.innerHTML = `
            <div class="quote-empty-state">

                <div class="quote-empty-icon">
                    <i
                        class="fa-solid fa-list-check"
                        aria-hidden="true"
                    ></i>
                </div>

                <p>
                    No items selected yet.
                </p>

                <span>
                    You can still send us a request
                    and tell us what you're looking for.
                </span>

            </div>
        `;

        quoteEstimatedTotal.textContent =
            "$0.00";

        return;
    }


    // -----------------------------------------------
    // Selected products
    // -----------------------------------------------

    let subtotal = 0;

    const itemsHTML =
        selectedProductIds
            .map(productId => {

                const product =
                    products.find(
                        item => item.id === productId
                    );

                if (!product) {
                    return "";
                }

                const quantity =
                    selectedItems[productId];

                const itemTotal =
                    product.price * quantity;

                subtotal += itemTotal;

                return `
                    <div
                        class="quote-selected-item"
                        data-product-id="${product.id}"
                    >

                        <div class="quote-selected-item-info">

                            <strong>
                                ${product.name}
                            </strong>

                            <span>
                                ${quantity} ×
                                $${product.price.toFixed(2)}
                            </span>

                        </div>

                        <strong>
                            $${itemTotal.toFixed(2)}
                        </strong>

                    </div>
                `;
            })
            .join("");


    quoteSelectedItems.innerHTML = `
        <div class="quote-items-list">
            ${itemsHTML}
        </div>

        <div class="quote-summary-breakdown">

            <div>
                <span>
                    Rental subtotal
                </span>

                <strong>
                    $${subtotal.toFixed(2)}
                </strong>
            </div>

            <div>
                <span>
                    Delivery & setup
                </span>

                <strong>
                    $20.00
                </strong>
            </div>

        </div>
    `;


    // -----------------------------------------------
    // Estimated total
    // -----------------------------------------------

    const deliverySetup =
        20;

    const total =
        subtotal + deliverySetup;

    quoteEstimatedTotal.textContent =
        `$${total.toFixed(2)}`;
}


// =====================================================
// WHATSAPP
// =====================================================

const whatsappNumber =
    "5804247509070"; // Replace with Rafita's WhatsApp number


// =====================================================
// FORM SUBMIT
// =====================================================

if (quoteForm) {

    quoteForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            // ---------------------------------------------
            // FORM VALUES
            // ---------------------------------------------

            const customerName =
                document.getElementById("customer-name")?.value.trim() || "";

            const customerEmail =
                document.getElementById("customer-email")?.value.trim() || "";

            const customerPhone =
                document.getElementById("customer-phone")?.value.trim() || "";

            const eventLocation =
                document.getElementById("event-location")?.value.trim() || "";

            const additionalDetails =
                document.getElementById("additional-details")?.value.trim() || "";

            const eventDate =
                eventDateInput?.value || savedEventDate;

            const guestCount =
                guestCountInput?.value || savedGuestCount;


            // ---------------------------------------------
            // SELECTED ITEMS
            // ---------------------------------------------

            const selectedProductIds =
                Object.keys(selectedItems);

            let subtotal = 0;

            const itemsMessage =
                selectedProductIds
                    .map(productId => {

                        const product =
                            products.find(
                                item => item.id === productId
                            );

                        if (!product) {
                            return "";
                        }

                        const quantity =
                            selectedItems[productId];

                        const itemTotal =
                            product.price * quantity;

                        subtotal += itemTotal;

                        return (
                            `• ${quantity} × ${product.name} — ` +
                            `$${itemTotal.toFixed(2)}`
                        );

                    })
                    .filter(Boolean)
                    .join("\n");


            // ---------------------------------------------
            // TOTAL
            // ---------------------------------------------

            const deliverySetup =
                selectedProductIds.length > 0
                    ? 20
                    : 0;

            const total =
                subtotal + deliverySetup;


            // ---------------------------------------------
            // DATE FORMAT
            // ---------------------------------------------

            let formattedDate =
                "Not provided";

            if (eventDate) {

                const date =
                    new Date(eventDate + "T00:00:00");

                formattedDate =
                    date.toLocaleDateString(
                        "en-US",
                        {
                            month: "long",
                            day: "numeric",
                            year: "numeric"
                        }
                    );
            }


            // ---------------------------------------------
            // BUILD MESSAGE
            // ---------------------------------------------

            let message =
                `Hi! I'd like to request a quote for an upcoming event.\n\n` +

                `Here are the details:\n\n` +

                `Event date: ${formattedDate}\n` +
                `Number of guests: ${guestCount || "Not provided"}\n` +
                `Event location: ${eventLocation}\n\n`;


            if (itemsMessage) {

                message +=
                    `I'm interested in:\n` +
                    `${itemsMessage}\n\n` +

                    `Estimated from: $${total.toFixed(2)}\n\n`;

            } else {

                message +=
                    `I haven't selected any specific rentals yet, ` +
                    `but I'd like to discuss some options for my event.\n\n`;

            }


            message +=
                `My information:\n\n` +

                `Name: ${customerName}\n` +
                `Email: ${customerEmail}\n` +
                `Phone: ${customerPhone || "Not provided"}\n\n`;


            if (additionalDetails) {

                message +=
                    `Additional details:\n` +
                    `${additionalDetails}\n\n`;

            }


            message +=
                `Thank you! I look forward to hearing from you.`;

            // ---------------------------------------------
            // OPEN WHATSAPP
            // ---------------------------------------------

            const whatsappURL =
                `https://wa.me/${whatsappNumber}` +
                `?text=${encodeURIComponent(message)}`;

            window.open(
                whatsappURL,
                "_blank"
            );
            if (quoteSubmitMessage) {

                quoteSubmitMessage.textContent =
                    "Your request is ready in WhatsApp. Please send the message to complete your inquiry.";

            }
            // ---------------------------------------------
            // CLEAR SAVED QUOTE DATA
            // ---------------------------------------------

            localStorage.removeItem("rafitasSelectedItems");
            localStorage.removeItem("rafitasEventDate");
            localStorage.removeItem("rafitasGuestCount");

            localStorage.removeItem("rafitasCustomerName");
            localStorage.removeItem("rafitasCustomerEmail");
            localStorage.removeItem("rafitasCustomerPhone");
            localStorage.removeItem("rafitasEventLocation");
            localStorage.removeItem("rafitasAdditionalDetails");

            quoteForm.reset();
        }
    );
}

// =====================================================
// INITIALIZE
// =====================================================

renderQuoteItems();