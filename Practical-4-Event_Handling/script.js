/* =========================================
   StudentHub - Practical 4
   JavaScript DOM Manipulation
   ========================================= */


/* =========================================
   1. Notification Banner
   ========================================= */

const notification = document.getElementById("notification");
const closeNotification =
    document.getElementById("closeNotification");

closeNotification.addEventListener("click", function () {
    notification.style.display = "none";
});


/* =========================================
   2. Hamburger Menu
   ========================================= */

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", function () {

    navMenu.classList.toggle("open");

    const isOpen = navMenu.classList.contains("open");

    menuBtn.setAttribute("aria-expanded", isOpen);

    menuBtn.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );
});


/* Close mobile menu after clicking navigation link */

const navLinks = document.querySelectorAll("nav a");

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {
        navMenu.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
    });

});


/* =========================================
   3. Dark / Light Theme
   ========================================= */

const themeBtn = document.getElementById("themeBtn");

function updateThemeButton() {

    if (document.body.classList.contains("dark")) {

        themeBtn.textContent = "☀️ Light Mode";

    } else {

        themeBtn.textContent = "🌙 Dark Mode";
    }
}


/* Restore saved theme */

const savedTheme = localStorage.getItem("studentHubTheme");

if (savedTheme === "dark") {

    document.body.classList.add("dark");

}

updateThemeButton();


/* Change theme */

themeBtn.addEventListener("click", function () {

    document.body.classList.toggle("dark");

    const isDark =
        document.body.classList.contains("dark");

    localStorage.setItem(
        "studentHubTheme",
        isDark ? "dark" : "light"
    );

    updateThemeButton();
});


/* =========================================
   4. FAQ Accordion
   ========================================= */

const faqQuestions =
    document.querySelectorAll(".faq-question");

faqQuestions.forEach(function (question) {

    question.addEventListener("click", function () {

        const answer =
            question.nextElementSibling;

        const isExpanded =
            question.getAttribute("aria-expanded") === "true";


        /* Close other FAQ items */

        faqQuestions.forEach(function (item) {

            if (item !== question) {

                item.setAttribute(
                    "aria-expanded",
                    "false"
                );

                item.nextElementSibling.style.maxHeight = null;
            }

        });


        /* Toggle selected FAQ */

        question.setAttribute(
            "aria-expanded",
            !isExpanded
        );

        if (!isExpanded) {

            answer.style.maxHeight =
                answer.scrollHeight + "px";

        } else {

            answer.style.maxHeight = null;
        }

    });

});


/* =========================================
   5. Image / Content Slider
   ========================================= */

const slides =
    document.querySelectorAll(".slide");

const prevBtn =
    document.getElementById("prevBtn");

const nextBtn =
    document.getElementById("nextBtn");

const dotsContainer =
    document.getElementById("dots");

let currentSlide = 0;


/* Create slider dots */

slides.forEach(function (_, index) {

    const dot = document.createElement("button");

    dot.classList.add("dot");

    dot.setAttribute(
        "aria-label",
        "Go to slide " + (index + 1)
    );

    dot.addEventListener("click", function () {

        currentSlide = index;
        showSlide(currentSlide);

    });

    dotsContainer.appendChild(dot);
});


const dots =
    document.querySelectorAll(".dot");


function showSlide(index) {

    slides.forEach(function (slide) {

        slide.classList.remove("active");

    });

    dots.forEach(function (dot) {

        dot.classList.remove("active");

    });


    slides[index].classList.add("active");
    dots[index].classList.add("active");
}


/* Next slide */

nextBtn.addEventListener("click", function () {

    currentSlide++;

    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }

    showSlide(currentSlide);
});


/* Previous slide */

prevBtn.addEventListener("click", function () {

    currentSlide--;

    if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }

    showSlide(currentSlide);
});


/* Initial slide */

showSlide(currentSlide);


/* =========================================
   6. Modal Popup
   ========================================= */

const modal =
    document.getElementById("modal");

const openModal =
    document.getElementById("openModal");

const closeModal =
    document.getElementById("closeModal");

const modalDone =
    document.getElementById("modalDone");


function showModal() {

    modal.classList.add("show");
    document.body.style.overflow = "hidden";

    modalDone.focus();
}


function hideModal() {

    modal.classList.remove("show");
    document.body.style.overflow = "";
}


/* Open modal */

openModal.addEventListener("click", showModal);


/* Close modal */

closeModal.addEventListener("click", hideModal);

modalDone.addEventListener("click", hideModal);


/* Close modal when clicking outside */

modal.addEventListener("click", function (event) {

    if (event.target === modal) {
        hideModal();
    }

});


/* Close modal using Escape */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape" &&
        modal.classList.contains("show")) {

        hideModal();
    }

});


/* =========================================
   7. Contact Button
   ========================================= */

const contactBtn =
    document.getElementById("contactBtn");

contactBtn.addEventListener("click", function () {

    alert(
        "Thank you for your interest in StudentHub!"
    );

});


/* =========================================
   Console Testing
   ========================================= */

console.log(
    "StudentHub Practical 4 JavaScript loaded successfully."
);