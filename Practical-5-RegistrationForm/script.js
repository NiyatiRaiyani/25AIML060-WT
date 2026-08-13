const form = document.getElementById("registrationForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const mobileInput = document.getElementById("mobile");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const courseInput = document.getElementById("course");
const yearInput = document.getElementById("year");
const termsInput = document.getElementById("terms");

const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");


// Password Strength
passwordInput.addEventListener("keyup", function () {

    const password = passwordInput.value;
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

    if (/[^A-Za-z0-9]/.test(password)) {
        strength++;
    }

    if (password.length === 0) {
        strengthBar.style.width = "0%";
        strengthText.textContent = "";
    }
    else if (strength <= 2) {
        strengthBar.style.width = "33%";
        strengthText.textContent = "Weak Password";
    }
    else if (strength <= 4) {
        strengthBar.style.width = "66%";
        strengthText.textContent = "Medium Password";
    }
    else {
        strengthBar.style.width = "100%";
        strengthText.textContent = "Strong Password";
    }
});


// Form Submit
form.addEventListener("submit", function (event) {

    event.preventDefault();

    // Clear previous errors
    document.querySelectorAll(".error").forEach(function (error) {
        error.textContent = "";
    });

    document.getElementById("successMessage").textContent = "";

    let isValid = true;


    // Regular Expressions
    const nameRegex = /^[A-Za-z ]{2,50}$/;

    const emailRegex =
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    const mobileRegex = /^[0-9]{10}$/;

    const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


    // Name Validation
    if (nameInput.value.trim() === "") {

        document.getElementById("nameError").textContent =
            "Name is required.";

        isValid = false;

    }
    else if (!nameRegex.test(nameInput.value.trim())) {

        document.getElementById("nameError").textContent =
            "Enter a valid name using letters and spaces only.";

        isValid = false;
    }


    // Email Validation
    if (emailInput.value.trim() === "") {

        document.getElementById("emailError").textContent =
            "Email is required.";

        isValid = false;

    }
    else if (!emailRegex.test(emailInput.value.trim())) {

        document.getElementById("emailError").textContent =
            "Enter a valid email address.";

        isValid = false;
    }


    // Mobile Validation
    if (mobileInput.value.trim() === "") {

        document.getElementById("mobileError").textContent =
            "Mobile number is required.";

        isValid = false;

    }
    else if (!mobileRegex.test(mobileInput.value.trim())) {

        document.getElementById("mobileError").textContent =
            "Mobile number must contain exactly 10 digits.";

        isValid = false;
    }


    // Password Validation
    if (passwordInput.value === "") {

        document.getElementById("passwordError").textContent =
            "Password is required.";

        isValid = false;

    }
    else if (!passwordRegex.test(passwordInput.value)) {

        document.getElementById("passwordError").textContent =
            "Password must contain 8+ characters, uppercase, lowercase, number and special character.";

        isValid = false;
    }


    // Confirm Password
    if (confirmPasswordInput.value === "") {

        document.getElementById("confirmPasswordError").textContent =
            "Please confirm your password.";

        isValid = false;

    }
    else if (passwordInput.value !== confirmPasswordInput.value) {

        document.getElementById("confirmPasswordError").textContent =
            "Passwords do not match.";

        isValid = false;
    }


    // Course
    if (courseInput.value === "") {

        document.getElementById("courseError").textContent =
            "Please select a course.";

        isValid = false;
    }


    // Year
    if (yearInput.value === "") {

        document.getElementById("yearError").textContent =
            "Please select your year.";

        isValid = false;
    }


    // Gender
    const gender = document.querySelector(
        'input[name="gender"]:checked'
    );

    if (!gender) {

        document.getElementById("genderError").textContent =
            "Please select your gender.";

        isValid = false;
    }


    // Terms
    if (!termsInput.checked) {

        document.getElementById("termsError").textContent =
            "You must accept the Terms and Conditions.";

        isValid = false;
    }


    // Final Result
    if (isValid) {

        document.getElementById("successMessage").textContent =
            "Registration successful!";

        form.reset();

        strengthBar.style.width = "0%";
        strengthText.textContent = "";
    }
});