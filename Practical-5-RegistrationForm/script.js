// Get Form

const form = document.getElementById("registrationForm");

// Get Inputs

const nameInput =
    document.getElementById("name");

const emailInput =
    document.getElementById("email");

const mobileInput =
    document.getElementById("mobile");

const passwordInput =
    document.getElementById("password");

const confirmPasswordInput =
    document.getElementById("confirmPassword");

const courseInput =
    document.getElementById("course");

const yearInput =
    document.getElementById("year");

const termsInput =
    document.getElementById("terms");


// Password Strength Elements

const strengthBar =
    document.getElementById("strengthBar");

const strengthText =
    document.getElementById("strengthText");


// ===============================
// Helper Functions
// ===============================


// Make Input Valid

function setValid(input, errorId) {

    input.classList.remove("invalid");

    input.classList.add("valid");

    document.getElementById(errorId).textContent = "";
}


// Make Input Invalid

function setInvalid(input, errorId, message) {

    input.classList.remove("valid");

    input.classList.add("invalid");

    document.getElementById(errorId).textContent =
        message;
}


// ===============================
// Regular Expressions
// ===============================


const nameRegex =
    /^[A-Za-z ]{2,50}$/;


const emailRegex =
    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;


const mobileRegex =
    /^[0-9]{10}$/;


const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


// ===============================
// Name Validation
// ===============================


nameInput.addEventListener("input", function () {

    const name = nameInput.value.trim();

    if (name === "") {

        nameInput.classList.remove("valid", "invalid");

        document.getElementById("nameError").textContent = "";

    }

    else if (!nameRegex.test(name)) {

        setInvalid(
            nameInput,
            "nameError",
            "Enter a valid name using letters and spaces only."
        );

    }

    else {

        setValid(
            nameInput,
            "nameError"
        );

    }

});


// ===============================
// Email Validation
// ===============================


emailInput.addEventListener("input", function () {

    const email = emailInput.value.trim();

    if (email === "") {

        emailInput.classList.remove("valid", "invalid");

        document.getElementById("emailError").textContent = "";

    }

    else if (!emailRegex.test(email)) {

        setInvalid(
            emailInput,
            "emailError",
            "Enter a valid email address."
        );

    }

    else {

        setValid(
            emailInput,
            "emailError"
        );

    }

});


// ===============================
// Mobile Validation
// ===============================


mobileInput.addEventListener("input", function () {

    // Allow numbers only

    mobileInput.value =
        mobileInput.value.replace(/[^0-9]/g, "");


    const mobile = mobileInput.value;

    if (mobile === "") {

        mobileInput.classList.remove("valid", "invalid");

        document.getElementById("mobileError").textContent = "";

    }

    else if (!mobileRegex.test(mobile)) {

        setInvalid(
            mobileInput,
            "mobileError",
            "Mobile number must contain exactly 10 digits."
        );

    }

    else {

        setValid(
            mobileInput,
            "mobileError"
        );

    }

});


// ===============================
// Password Strength
// ===============================


passwordInput.addEventListener("input", function () {

    const password =
        passwordInput.value;

    let strength = 0;


    if (password.length >= 8) {
        strength++;
    }


    if (/[A-Z]/.test(password)) {
        strength++;
    }


    if (/[a-z]/.test(password)) {
        strength++;
    }


    if (/[0-9]/.test(password)) {
        strength++;
    }


    if (/[@$!%*?&]/.test(password)) {
        strength++;
    }


    // Empty

    if (password.length === 0) {

        strengthBar.style.width = "0%";

        strengthText.textContent = "";

        passwordInput.classList.remove(
            "valid",
            "invalid"
        );

        document.getElementById(
            "passwordError"
        ).textContent = "";

    }


    // Weak

    else if (strength <= 2) {

        strengthBar.style.width = "33%";

        strengthText.textContent =
            "Weak Password";

        strengthText.style.color =
            "#dc2626";

        setInvalid(
            passwordInput,
            "passwordError",
            "Password is too weak."
        );

    }


    // Medium

    else if (strength <= 4) {

        strengthBar.style.width = "66%";

        strengthText.textContent =
            "Medium Password";

        strengthText.style.color =
            "#d97706";

        setInvalid(
            passwordInput,
            "passwordError",
            "Use uppercase, lowercase, number and special character."
        );

    }


    // Strong

    else {

        strengthBar.style.width = "100%";

        strengthText.textContent =
            "Strong Password";

        strengthText.style.color =
            "#16a34a";

        setValid(
            passwordInput,
            "passwordError"
        );

    }


    // Check Confirm Password

    checkConfirmPassword();

});


// ===============================
// Confirm Password
// ===============================


function checkConfirmPassword() {

    const password =
        passwordInput.value;

    const confirmPassword =
        confirmPasswordInput.value;


    if (confirmPassword === "") {

        confirmPasswordInput.classList.remove(
            "valid",
            "invalid"
        );

        document.getElementById(
            "confirmPasswordError"
        ).textContent = "";

    }

    else if (password !== confirmPassword) {

        setInvalid(
            confirmPasswordInput,
            "confirmPasswordError",
            "Passwords do not match."
        );

    }

    else {

        setValid(
            confirmPasswordInput,
            "confirmPasswordError"
        );

    }
}


confirmPasswordInput.addEventListener(
    "input",
    checkConfirmPassword
);


// ===============================
// Course Validation
// ===============================


courseInput.addEventListener("change", function () {

    if (courseInput.value === "") {

        courseInput.classList.remove(
            "valid",
            "invalid"
        );

        document.getElementById(
            "courseError"
        ).textContent = "";

    }

    else {

        setValid(
            courseInput,
            "courseError"
        );

    }

});


// ===============================
// Year Validation
// ===============================


yearInput.addEventListener("change", function () {

    if (yearInput.value === "") {

        yearInput.classList.remove(
            "valid",
            "invalid"
        );

        document.getElementById(
            "yearError"
        ).textContent = "";

    }

    else {

        setValid(
            yearInput,
            "yearError"
        );

    }

});


// ===============================
// Terms Validation
// ===============================


termsInput.addEventListener("change", function () {

    if (termsInput.checked) {

        document.getElementById(
            "termsError"
        ).textContent = "";

    }

    else {

        document.getElementById(
            "termsError"
        ).textContent =
            "You must accept the Terms and Conditions.";

    }

});


// ===============================
// Form Submit
// ===============================


form.addEventListener("submit", function (event) {

    event.preventDefault();

    let isValid = true;


    // NAME

    if (nameInput.value.trim() === "") {

        setInvalid(
            nameInput,
            "nameError",
            "Name is required."
        );

        isValid = false;

    }
    else if (!nameRegex.test(
        nameInput.value.trim()
    )) {

        setInvalid(
            nameInput,
            "nameError",
            "Enter a valid name using letters and spaces only."
        );

        isValid = false;

    }


    // EMAIL

    if (emailInput.value.trim() === "") {

        setInvalid(
            emailInput,
            "emailError",
            "Email is required."
        );

        isValid = false;

    }
    else if (!emailRegex.test(
        emailInput.value.trim()
    )) {

        setInvalid(
            emailInput,
            "emailError",
            "Enter a valid email address."
        );

        isValid = false;

    }


    // MOBILE

    if (mobileInput.value.trim() === "") {

        setInvalid(
            mobileInput,
            "mobileError",
            "Mobile number is required."
        );

        isValid = false;

    }
    else if (!mobileRegex.test(
        mobileInput.value.trim()
    )) {

        setInvalid(
            mobileInput,
            "mobileError",
            "Mobile number must contain exactly 10 digits."
        );

        isValid = false;

    }


    // PASSWORD

    if (passwordInput.value === "") {

        setInvalid(
            passwordInput,
            "passwordError",
            "Password is required."
        );

        isValid = false;

    }
    else if (!passwordRegex.test(
        passwordInput.value
    )) {

        setInvalid(
            passwordInput,
            "passwordError",
            "Password must contain 8+ characters, uppercase, lowercase, number and special character."
        );

        isValid = false;

    }


    // CONFIRM PASSWORD

    if (confirmPasswordInput.value === "") {

        setInvalid(
            confirmPasswordInput,
            "confirmPasswordError",
            "Please confirm your password."
        );

        isValid = false;

    }
    else if (
        passwordInput.value !==
        confirmPasswordInput.value
    ) {

        setInvalid(
            confirmPasswordInput,
            "confirmPasswordError",
            "Passwords do not match."
        );

        isValid = false;

    }


    // COURSE

    if (courseInput.value === "") {

        setInvalid(
            courseInput,
            "courseError",
            "Please select a course."
        );

        isValid = false;

    }


    // YEAR

    if (yearInput.value === "") {

        setInvalid(
            yearInput,
            "yearError",
            "Please select your year."
        );

        isValid = false;

    }


    // GENDER

    const gender =
        document.querySelector(
            'input[name="gender"]:checked'
        );


    if (!gender) {

        document.getElementById(
            "genderError"
        ).textContent =
            "Please select your gender.";

        isValid = false;

    }
    else {

        document.getElementById(
            "genderError"
        ).textContent = "";

    }


    // TERMS

    if (!termsInput.checked) {

        document.getElementById(
            "termsError"
        ).textContent =
            "You must accept the Terms and Conditions.";

        isValid = false;

    }
    else {

        document.getElementById(
            "termsError"
        ).textContent = "";

    }


    // SUCCESS

    if (isValid) {

        document.getElementById(
            "successMessage"
        ).textContent =
            "Registration Successful!";


        // Reset form

        form.reset();


        // Remove green borders

        document.querySelectorAll(
            "input, select"
        ).forEach(function (element) {

            element.classList.remove(
                "valid",
                "invalid"
            );

        });


        // Reset password strength

        strengthBar.style.width = "0%";

        strengthText.textContent = "";

    }

});