/* =========================================================
   AIRBOUND — TRAMPOLINE PARK
   Main JavaScript
========================================================= */


/* =========================================================
   DOM ELEMENTS
========================================================= */

const navbar = document.getElementById("navbar");

const mobileMenuButton =
    document.getElementById("mobile-menu-button");

const mobileNav =
    document.getElementById("mobile-nav");

const scrollToTopButton =
    document.getElementById("scroll-to-top");

const faqItems =
    document.querySelectorAll(".faq-item");

const mobileNavLinks =
    document.querySelectorAll(".mobile-nav a");


/* =========================================================
   NAVBAR — SCROLL EFFECT
========================================================= */

function handleNavbarScroll() {

    if (window.scrollY > 40) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

}

window.addEventListener("scroll", handleNavbarScroll);


/* =========================================================
   MOBILE MENU
========================================================= */

function toggleMobileMenu() {

    const isOpen =
        mobileNav.classList.toggle("active");

    mobileMenuButton.setAttribute(
        "aria-expanded",
        isOpen
    );

    document.body.classList.toggle(
        "menu-open",
        isOpen
    );


    const icon =
        mobileMenuButton.querySelector("i");

    if (isOpen) {

        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");

        mobileMenuButton.setAttribute(
            "aria-label",
            "Close menu"
        );

    } else {

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

        mobileMenuButton.setAttribute(
            "aria-label",
            "Open menu"
        );

    }

}

mobileMenuButton.addEventListener(
    "click",
    toggleMobileMenu
);


/* =========================================================
   CLOSE MOBILE MENU
   WHEN CLICKING A LINK
========================================================= */

mobileNavLinks.forEach(link => {

    link.addEventListener("click", () => {

        mobileNav.classList.remove("active");

        document.body.classList.remove("menu-open");

        mobileMenuButton.setAttribute(
            "aria-expanded",
            "false"
        );


        const icon =
            mobileMenuButton.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

        mobileMenuButton.setAttribute(
            "aria-label",
            "Open menu"
        );

    });

});


/* =========================================================
   FAQ ACCORDION
========================================================= */

faqItems.forEach(item => {

    const question =
        item.querySelector(".faq-question");

    question.addEventListener("click", () => {

        const isActive =
            item.classList.contains("active");


        /*
         * Close all other FAQ items
         */

        faqItems.forEach(otherItem => {

            if (otherItem !== item) {

                otherItem.classList.remove("active");

                const answer =
                    otherItem.querySelector(".faq-answer");

                answer.style.maxHeight = null;

            }

        });


        /*
         * Toggle current item
         */

        if (isActive) {

            item.classList.remove("active");

            const answer =
                item.querySelector(".faq-answer");

            answer.style.maxHeight = null;

        } else {

            item.classList.add("active");

            const answer =
                item.querySelector(".faq-answer");

            answer.style.maxHeight =
                answer.scrollHeight + "px";

        }

    });

});


/* =========================================================
   SCROLL TO TOP
========================================================= */

function handleScrollToTop() {

    if (window.scrollY > 500) {

        scrollToTopButton.classList.add("visible");

    } else {

        scrollToTopButton.classList.remove("visible");

    }

}

window.addEventListener(
    "scroll",
    handleScrollToTop
);


scrollToTopButton.addEventListener(
    "click",
    () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);


/* =========================================================
   CLOSE MENU WITH ESCAPE
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            mobileNav.classList.contains("active")
        ) {

            mobileNav.classList.remove("active");

            document.body.classList.remove("menu-open");

            mobileMenuButton.setAttribute(
                "aria-expanded",
                "false"
            );


            const icon =
                mobileMenuButton.querySelector("i");

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

            mobileMenuButton.setAttribute(
                "aria-label",
                "Open menu"
            );

        }

    }
);


/* =========================================================
   CLOSE MOBILE MENU WHEN RESIZING
========================================================= */

window.addEventListener(
    "resize",
    () => {

        if (
            window.innerWidth > 1000 &&
            mobileNav.classList.contains("active")
        ) {

            mobileNav.classList.remove("active");

            document.body.classList.remove("menu-open");

            mobileMenuButton.setAttribute(
                "aria-expanded",
                "false"
            );


            const icon =
                mobileMenuButton.querySelector("i");

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

            mobileMenuButton.setAttribute(
                "aria-label",
                "Open menu"
            );

        }

    }
);


/* =========================================================
   INTERSECTION OBSERVER
   SIMPLE SCROLL REVEAL
========================================================= */

const revealElements = document.querySelectorAll(
    ".experience-content, " +
    ".experience-image, " +
    ".attraction-card, " +
    ".pricing-card, " +
    ".party-content, " +
    ".party-image, " +
    ".gallery-item, " +
    ".faq-item"
);


/*
 * Add initial class
 */

revealElements.forEach(element => {

    element.classList.add("reveal");

});


/*
 * Observer
 */

const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "revealed"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
    document.querySelectorAll("main section[id]");

const desktopNavLinks =
    document.querySelectorAll(
        ".desktop-nav a[href^='#']"
    );


function updateActiveNavigation() {

    const scrollPosition =
        window.scrollY + 150;


    sections.forEach(section => {

        const sectionTop =
            section.offsetTop;

        const sectionBottom =
            sectionTop + section.offsetHeight;

        const sectionId =
            section.getAttribute("id");


        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionBottom
        ) {

            desktopNavLinks.forEach(link => {

                link.classList.remove("active");

                if (
                    link.getAttribute("href") ===
                    `#${sectionId}`
                ) {

                    link.classList.add("active");

                }

            });

        }

    });

}

window.addEventListener(
    "scroll",
    updateActiveNavigation
);


/* =========================================================
   INITIALIZE
========================================================= */

handleNavbarScroll();
handleScrollToTop();
updateActiveNavigation();
