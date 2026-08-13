// ===============================
// DOM ELEMENT SELECTION
// ===============================

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

const themeBtn = document.getElementById("themeBtn");

const notification = document.getElementById("notification");
const closeNotification =
    document.getElementById("closeNotification");

const modal = document.getElementById("modal");
const openModal = document.getElementById("openModal");
const closeModal = document.getElementById("closeModal");
const modalOk = document.getElementById("modalOk");

const faqQuestions =
    document.querySelectorAll(".faq-question");

const slideTitle =
    document.getElementById("slideTitle");

const slideText =
    document.getElementById("slideText");

const prevBtn =
    document.getElementById("prevBtn");

const nextBtn =
    document.getElementById("nextBtn");

const dots =
    document.querySelectorAll(".dot");


// ===============================
// HAMBURGER MENU
// ===============================

menuBtn.addEventListener("click", function () {

    navMenu.classList.toggle("show");

    console.log("Hamburger menu clicked");

});


// ===============================
// NOTIFICATION BANNER
// ===============================

closeNotification.addEventListener("click", function () {

    notification.style.display = "none";

    console.log("Notification closed");

});


// ===============================
// MODAL POPUP
// ===============================

openModal.addEventListener("click", function () {

    modal.classList.add("show");

    console.log("Modal opened");

});


closeModal.addEventListener("click", function () {

    modal.classList.remove("show");

});


modalOk.addEventListener("click", function () {

    modal.classList.remove("show");

});


// Close modal when clicking outside
modal.addEventListener("click", function (event) {

    if (event.target === modal) {
        modal.classList.remove("show");
    }

});


// ===============================
// FAQ COLLAPSIBLE
// ===============================

faqQuestions.forEach(function (question) {

    question.addEventListener("click", function () {

        const answer = question.nextElementSibling;
        const icon = question.querySelector("span");

        answer.classList.toggle("show");

        if (answer.classList.contains("show")) {
            icon.textContent = "−";
        } else {
            icon.textContent = "+";
        }

        console.log("FAQ clicked");

    });

});


// ===============================
// IMAGE / CONTENT SLIDER
// ===============================

const slides = [

    {
        title: "Coding Workshop",
        text: "Learn programming and web development skills."
    },

    {
        title: "AI & ML Seminar",
        text: "Explore Artificial Intelligence and Machine Learning."
    },

    {
        title: "Annual Sports Event",
        text: "Participate in exciting sports and team activities."
    }

];

let currentSlide = 0;


function showSlide(index) {

    slideTitle.textContent = slides[index].title;
    slideText.textContent = slides[index].text;

    dots.forEach(function (dot) {
        dot.classList.remove("active");
    });

    dots[index].classList.add("active");

    console.log("Current slide:", index + 1);

}


nextBtn.addEventListener("click", function () {

    currentSlide++;

    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }

    showSlide(currentSlide);

});


prevBtn.addEventListener("click", function () {

    currentSlide--;

    if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }

    showSlide(currentSlide);

});


// ===============================
// DARK / LIGHT THEME
// ===============================

function updateThemeButton() {

    if (document.body.classList.contains("dark")) {

        themeBtn.textContent = "☀️ Light Mode";

    } else {

        themeBtn.textContent = "🌙 Dark Mode";

    }

}


themeBtn.addEventListener("click", function () {

    document.body.classList.toggle("dark");

    const currentTheme =
        document.body.classList.contains("dark")
            ? "dark"
            : "light";

    localStorage.setItem("theme", currentTheme);

    updateThemeButton();

    console.log("Theme saved:", currentTheme);

});


// ===============================
// RESTORE THEME FROM LOCALSTORAGE
// ===============================

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {

    document.body.classList.add("dark");

}

updateThemeButton();


// ===============================
// PAGE LOAD MESSAGE
// ===============================

console.log("StudentHub Practical 4 loaded successfully.");
console.log("DOM manipulation and event handling are working.");