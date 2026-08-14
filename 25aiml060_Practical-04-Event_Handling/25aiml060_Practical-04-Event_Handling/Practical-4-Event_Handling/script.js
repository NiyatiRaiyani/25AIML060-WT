/* ==========================================
   PRACTICAL 4
   JavaScript DOM Manipulation,
   Event Handling & UI Interactivity

   Student       : Niyati Raiyani
   Student ID    : 25AIML060
   Department    : AIML Department
   Club          : MathFlow Club
   University    : CHARUSAT University
========================================== */


document.addEventListener("DOMContentLoaded", () => {


    /* ===============================
       DOM ELEMENT SELECTION
    =============================== */

    const notification =
        document.getElementById("notification");

    const closeNotification =
        document.getElementById("closeNotification");

    const hamburger =
        document.getElementById("hamburger");

    const navbar =
        document.getElementById("navbar");

    const themeToggle =
        document.getElementById("themeToggle");

    const openModal =
        document.getElementById("openModal");

    const modal =
        document.getElementById("studentModal");

    const closeModal =
        document.getElementById("closeModal");

    const modalDone =
        document.getElementById("modalDone");

    const faqQuestions =
        document.querySelectorAll(".faq-question");

    const slides =
        document.querySelectorAll(".slide");

    const dots =
        document.querySelectorAll(".dot");

    const prevSlide =
        document.getElementById("prevSlide");

    const nextSlide =
        document.getElementById("nextSlide");


    /* ===============================
       NOTIFICATION BANNER
    =============================== */

    closeNotification.addEventListener("click", () => {

        notification.style.display = "none";

    });


    /* ===============================
       HAMBURGER MENU
    =============================== */

    hamburger.addEventListener("click", () => {

        const menuOpen =
            navbar.classList.toggle("show");

        hamburger.setAttribute(
            "aria-expanded",
            menuOpen
        );

    });


    document.querySelectorAll(".navbar a")
        .forEach(link => {

            link.addEventListener("click", () => {

                navbar.classList.remove("show");

                hamburger.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });


    /* ===============================
       DARK / LIGHT THEME
       USING LOCAL STORAGE
    =============================== */

    const savedTheme =
        localStorage.getItem("theme");


    if (savedTheme === "dark") {

        document.body.classList.add(
            "dark-theme"
        );

        themeToggle.textContent =
            "☀️ Light";

    }


    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle(
            "dark-theme"
        );


        const darkMode =
            document.body.classList.contains(
                "dark-theme"
            );


        if (darkMode) {

            localStorage.setItem(
                "theme",
                "dark"
            );

            themeToggle.textContent =
                "☀️ Light";

        } else {

            localStorage.setItem(
                "theme",
                "light"
            );

            themeToggle.textContent =
                "🌙 Dark";

        }

    });


    /* ===============================
       MODAL POPUP
    =============================== */

    openModal.addEventListener("click", () => {

        modal.classList.add("show");

        closeModal.focus();

    });


    closeModal.addEventListener("click", () => {

        modal.classList.remove("show");

    });


    modalDone.addEventListener("click", () => {

        modal.classList.remove("show");

    });


    modal.addEventListener("click", (event) => {

        if (event.target === modal) {

            modal.classList.remove("show");

        }

    });


    /* ESC KEY TO CLOSE MODAL */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            modal.classList.remove("show");

        }

    });


    /* ===============================
       COLLAPSIBLE FAQ
    =============================== */

    faqQuestions.forEach(question => {

        question.addEventListener("click", () => {

            const faqItem =
                question.parentElement;

            const icon =
                question.querySelector("b");


            faqItem.classList.toggle("open");


            if (faqItem.classList.contains("open")) {

                icon.textContent = "−";

            } else {

                icon.textContent = "+";

            }

        });

    });


    /* ===============================
       EVENT CONTENT SLIDER
    =============================== */

    let currentSlide = 0;


    function showSlide(index) {

        slides.forEach(slide => {

            slide.classList.remove("active");

        });


        dots.forEach(dot => {

            dot.classList.remove("active");

        });


        slides[index].classList.add("active");

        dots[index].classList.add("active");

    }


    /* NEXT */

    nextSlide.addEventListener("click", () => {

        currentSlide++;

        if (currentSlide >= slides.length) {

            currentSlide = 0;

        }

        showSlide(currentSlide);

    });


    /* PREVIOUS */

    prevSlide.addEventListener("click", () => {

        currentSlide--;

        if (currentSlide < 0) {

            currentSlide =
                slides.length - 1;

        }

        showSlide(currentSlide);

    });


    /* DOT NAVIGATION */

    dots.forEach((dot, index) => {

        dot.addEventListener("click", () => {

            currentSlide = index;

            showSlide(currentSlide);

        });

    });


    /* AUTOMATIC SLIDER */

    setInterval(() => {

        currentSlide++;

        if (currentSlide >= slides.length) {

            currentSlide = 0;

        }

        showSlide(currentSlide);

    }, 5000);


    /* ===============================
       BROWSER CONSOLE TESTING
    =============================== */

    console.log(
        "================================"
    );

    console.log(
        "Practical 4 Loaded Successfully"
    );

    console.log(
        "Student: Niyati Raiyani"
    );

    console.log(
        "Student ID: 25AIML060"
    );

    console.log(
        "Department: AIML Department"
    );

    console.log(
        "Club: MathFlow Club"
    );

    console.log(
        "University: CHARUSAT University"
    );

    console.log(
        "================================"
    );

});