/* =========================================================
   STUDENTHUB - PRACTICAL 4
   JavaScript DOM Manipulation & UI Interactivity
========================================================= */


/* =========================================================
   1. DOM ELEMENT SELECTION
========================================================= */

const notification = document.getElementById("notification");
const closeNotification =
    document.getElementById("closeNotification");

const menuToggle =
    document.getElementById("menuToggle");

const navbar =
    document.getElementById("navbar");

const themeToggle =
    document.getElementById("themeToggle");

const exploreBtn =
    document.getElementById("exploreBtn");

const learnBtn =
    document.getElementById("learnBtn");

const contactBtn =
    document.getElementById("contactBtn");

const modal =
    document.getElementById("modal");

const modalClose =
    document.getElementById("modalClose");

const modalOk =
    document.getElementById("modalOk");

const modalTitle =
    document.getElementById("modalTitle");

const modalMessage =
    document.getElementById("modalMessage");

const slides =
    document.querySelectorAll(".slide");

const prevBtn =
    document.getElementById("prevBtn");

const nextBtn =
    document.getElementById("nextBtn");

const dots =
    document.querySelectorAll(".dot");

const faqQuestions =
    document.querySelectorAll(".faq-question");

const registerButtons =
    document.querySelectorAll(".register-btn");


/* =========================================================
   2. CONSOLE TESTING
========================================================= */

console.log("StudentHub JavaScript loaded successfully.");
console.log("DOM elements selected successfully.");
console.log("Number of FAQ items:", faqQuestions.length);
console.log("Number of slides:", slides.length);


/* =========================================================
   3. NOTIFICATION BANNER
========================================================= */

closeNotification.addEventListener("click", function () {

    notification.style.display = "none";

    console.log("Notification banner closed.");

});


/* =========================================================
   4. HAMBURGER MENU
========================================================= */

menuToggle.addEventListener("click", function () {

    navbar.classList.toggle("open");

    const isOpen =
        navbar.classList.contains("open");

    menuToggle.setAttribute(
        "aria-expanded",
        isOpen
    );

    menuToggle.textContent =
        isOpen ? "✕" : "☰";

    console.log(
        "Mobile menu:",
        isOpen ? "Opened" : "Closed"
    );

});


/* Close mobile menu after clicking navigation */

const navLinks =
    document.querySelectorAll(".navbar a");

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navbar.classList.remove("open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.textContent = "☰";

    });

});


/* =========================================================
   5. LIGHT / DARK THEME SWITCHER
   Using localStorage
========================================================= */


/* Function to update button text */

function updateThemeButton() {

    if (document.body.classList.contains("dark-mode")) {

        themeToggle.textContent =
            "☀️ Light Mode";

    } else {

        themeToggle.textContent =
            "🌙 Dark Mode";

    }

}


/* Load saved theme */

const savedTheme =
    localStorage.getItem("studentHubTheme");


if (savedTheme === "dark") {

    document.body.classList.add("dark-mode");

}


updateThemeButton();


/* Theme button event */

themeToggle.addEventListener("click", function () {

    document.body.classList.toggle("dark-mode");

    const isDark =
        document.body.classList.contains("dark-mode");


    if (isDark) {

        localStorage.setItem(
            "studentHubTheme",
            "dark"
        );

    } else {

        localStorage.setItem(
            "studentHubTheme",
            "light"
        );

    }


    updateThemeButton();


    console.log(
        "Theme changed to:",
        isDark ? "Dark" : "Light"
    );

});


/* =========================================================
   6. MODAL POPUP
========================================================= */


/* Open modal function */

function openModal(title, message) {

    modalTitle.textContent = title;

    modalMessage.textContent = message;

    modal.classList.add("show");

    modal.setAttribute(
        "aria-hidden",
        "false"
    );

    console.log("Modal opened:", title);

}


/* Close modal function */

function closeModal() {

    modal.classList.remove("show");

    modal.setAttribute(
        "aria-hidden",
        "true"
    );

    console.log("Modal closed.");

}


/* Explore button */

exploreBtn.addEventListener("click", function () {

    document.getElementById("events")
        .scrollIntoView({
            behavior: "smooth"
        });

});


/* Learn more button */

learnBtn.addEventListener("click", function () {

    openModal(
        "About StudentHub",
        "StudentHub is an interactive student platform created using HTML5, CSS3 and JavaScript ES6+."
    );

});


/* Contact button */

contactBtn.addEventListener("click", function () {

    openModal(
        "Contact StudentHub",
        "You can contact the StudentHub team through the university student support center."
    );

});


/* Modal close buttons */

modalClose.addEventListener(
    "click",
    closeModal
);


modalOk.addEventListener(
    "click",
    closeModal
);


/* Close modal by clicking outside */

modal.addEventListener("click", function (event) {

    if (event.target === modal) {

        closeModal();

    }

});


/* Close modal using Escape key */

document.addEventListener("keydown", function (event) {

    if (
        event.key === "Escape" &&
        modal.classList.contains("show")
    ) {

        closeModal();

    }

});


/* =========================================================
   7. EVENT REGISTRATION MODAL
========================================================= */

registerButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const eventName =
            button
                .closest(".slide-content")
                .querySelector("h3")
                .textContent;

        openModal(
            "Registration Successful!",
            `You selected "${eventName}". Registration details will be shared with you shortly.`
        );

    });

});


/* =========================================================
   8. IMAGE / CONTENT SLIDER
========================================================= */

let currentSlide = 0;


/* Function to display slide */

function showSlide(index) {

    /* Handle first and last slide */

    if (index >= slides.length) {

        currentSlide = 0;

    } else if (index < 0) {

        currentSlide =
            slides.length - 1;

    } else {

        currentSlide = index;

    }


    /* Remove active class from all slides */

    slides.forEach(function (slide) {

        slide.classList.remove("active");

    });


    /* Remove active class from all dots */

    dots.forEach(function (dot) {

        dot.classList.remove("active");

    });


    /* Show current slide */

    slides[currentSlide]
        .classList.add("active");


    dots[currentSlide]
        .classList.add("active");


    console.log(
        "Current slide:",
        currentSlide + 1
    );

}


/* Next slide */

nextBtn.addEventListener("click", function () {

    showSlide(currentSlide + 1);

});


/* Previous slide */

prevBtn.addEventListener("click", function () {

    showSlide(currentSlide - 1);

});


/* Dot navigation */

dots.forEach(function (dot) {

    dot.addEventListener("click", function () {

        const slideNumber =
            Number(
                dot.getAttribute("data-slide")
            );

        showSlide(slideNumber);

    });

});


/* Automatic slider */

let autoSlide =
    setInterval(function () {

        showSlide(currentSlide + 1);

    }, 5000);


/* Pause slider when mouse enters */

const slider =
    document.querySelector(".slider");


slider.addEventListener("mouseenter", function () {

    clearInterval(autoSlide);

});


/* Resume slider when mouse leaves */

slider.addEventListener("mouseleave", function () {

    autoSlide =
        setInterval(function () {

            showSlide(currentSlide + 1);

        }, 5000);

});


/* =========================================================
   9. FAQ ACCORDION
========================================================= */

faqQuestions.forEach(function (question) {

    question.addEventListener("click", function () {

        const faqItem =
            question.parentElement;

        const answer =
            faqItem.querySelector(".faq-answer");


        /* Close other FAQ items */

        document
            .querySelectorAll(".faq-item")
            .forEach(function (item) {

                if (item !== faqItem) {

                    item.classList.remove("active");

                    item.querySelector(
                        ".faq-answer"
                    ).style.maxHeight = null;

                }

            });


        /* Toggle current FAQ */

        faqItem.classList.toggle("active");


        if (faqItem.classList.contains("active")) {

            answer.style.maxHeight =
                answer.scrollHeight + "px";

            console.log("FAQ opened.");

        } else {

            answer.style.maxHeight = null;

            console.log("FAQ closed.");

        }

    });

});


/* =========================================================
   10. KEYBOARD ACCESSIBILITY
========================================================= */

document.addEventListener("keydown", function (event) {

    /* Arrow keys for slider */

    if (event.key === "ArrowRight") {

        showSlide(currentSlide + 1);

    }


    if (event.key === "ArrowLeft") {

        showSlide(currentSlide - 1);

    }

});


/* =========================================================
   11. FINAL INITIALIZATION
========================================================= */

showSlide(0);

console.log(
    "All interactive components initialized successfully."
);