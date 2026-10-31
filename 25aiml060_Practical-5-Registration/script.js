// Get Form
const form = document.getElementById("registrationForm");

// Get Inputs
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const mobileInput = document.getElementById("mobile");
const addressInput = document.getElementById("address");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const courseInput = document.getElementById("course");
const yearInput = document.getElementById("year");
const termsInput = document.getElementById("terms");

// Password Strength
const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");

// Regular Expressions
const nameRegex = /^[A-Za-z ]{2,50}$/;
const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const mobileRegex = /^[6-9][0-9]{9}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&]).{8,}$/;

// Helper Functions
function showError(input, errorId, message) {
    input.classList.remove("valid");
    input.classList.add("invalid");
    document.getElementById(errorId).textContent = message;
}

function showValid(input, errorId) {
    input.classList.remove("invalid");
    input.classList.add("valid");
    document.getElementById(errorId).textContent = "";
}

function clearValidation(input, errorId) {
    input.classList.remove("valid", "invalid");
    document.getElementById(errorId).textContent = "";
}

// Name Validation
function validateName() {
    const value = nameInput.value.trim();

    if (value === "") {
        showError(nameInput, "nameError", "Please enter your name.");
        return false;
    }

    if (!nameRegex.test(value)) {
        showError(nameInput, "nameError", "Name should contain only letters and spaces.");
        return false;
    }

    showValid(nameInput, "nameError");
    return true;
}

// Email Validation
function validateEmail() {
    const value = emailInput.value.trim();

    if (value === "") {
        showError(emailInput, "emailError", "Please enter your email.");
        return false;
    }

    if (!emailRegex.test(value)) {
        showError(emailInput, "emailError", "Please enter a valid email address.");
        return false;
    }

    showValid(emailInput, "emailError");
    return true;
}

// Mobile Validation
function validateMobile() {
    const value = mobileInput.value.trim();

    if (value === "") {
        showError(mobileInput, "mobileError", "Please enter your mobile number.");
        return false;
    }

    if (!mobileRegex.test(value)) {
        showError(mobileInput, "mobileError", "Enter a valid 10 digit mobile number.");
        return false;
    }

    showValid(mobileInput, "mobileError");
    return true;
}

// Address Validation
function validateAddress() {
    const value = addressInput.value.trim();

    if (value === "") {
        showError(addressInput, "addressError", "Please enter your address.");
        return false;
    }

    if (value.length < 10) {
        showError(addressInput, "addressError", "Address must contain at least 10 characters.");
        return false;
    }

    showValid(addressInput, "addressError");
    return true;
}

// Password Strength
function checkPasswordStrength() {
    const password = passwordInput.value;
    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[@$!%*?&]/.test(password)) score++;

    if (password.length === 0) {
        strengthBar.style.width = "0%";
        strengthBar.style.background = "#e5e7eb";
        strengthText.textContent = "";
        return;
    }

    if (score <= 2) {
        strengthBar.style.width = "33%";
        strengthBar.style.background = "#dc2626";
        strengthText.textContent = "Password Strength: Weak";
        strengthText.style.color = "#dc2626";
    } else if (score <= 4) {
        strengthBar.style.width = "66%";
        strengthBar.style.background = "#f59e0b";
        strengthText.textContent = "Password Strength: Medium";
        strengthText.style.color = "#d97706";
    } else {
        strengthBar.style.width = "100%";
        strengthBar.style.background = "#16a34a";
        strengthText.textContent = "Password Strength: Strong";
        strengthText.style.color = "#15803d";
    }
}

// Password Validation
function validatePassword() {
    const value = passwordInput.value;

    if (value === "") {
        showError(passwordInput, "passwordError", "Please enter a password.");
        return false;
    }

    if (!passwordRegex.test(value)) {
        showError(
            passwordInput,
            "passwordError",
            "Password must contain 8 characters, uppercase, lowercase, number and special character."
        );
        return false;
    }

    showValid(passwordInput, "passwordError");
    return true;
}

// Confirm Password
function validateConfirmPassword() {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (confirmPassword === "") {
        showError(
            confirmPasswordInput,
            "confirmPasswordError",
            "Please confirm your password."
        );
        return false;
    }

    if (password !== confirmPassword) {
        showError(
            confirmPasswordInput,
            "confirmPasswordError",
            "Passwords do not match."
        );
        return false;
    }

    showValid(confirmPasswordInput, "confirmPasswordError");
    return true;
}

// Course Validation
function validateCourse() {
    if (courseInput.value === "") {
        showError(courseInput, "courseError", "Please select a course.");
        return false;
    }

    showValid(courseInput, "courseError");
    return true;
}

// Year Validation
function validateYear() {
    if (yearInput.value === "") {
        showError(yearInput, "yearError", "Please select your academic year.");
        return false;
    }

    showValid(yearInput, "yearError");
    return true;
}

// Gender Validation
function validateGender() {
    const selectedGender = document.querySelector('input[name="gender"]:checked');
    const error = document.getElementById("genderError");

    if (!selectedGender) {
        error.textContent = "Please select your gender.";
        return false;
    }

    error.textContent = "";
    return true;
}

// Terms Validation
function validateTerms() {
    const error = document.getElementById("termsError");

    if (!termsInput.checked) {
        error.textContent = "Please accept the Terms and Conditions.";
        return false;
    }

    error.textContent = "";
    return true;
}

// Real-Time Validation
nameInput.addEventListener("input", validateName);
emailInput.addEventListener("input", validateEmail);

mobileInput.addEventListener("input", function () {
    mobileInput.value = mobileInput.value.replace(/[^0-9]/g, "");
    validateMobile();
});

addressInput.addEventListener("input", validateAddress);

passwordInput.addEventListener("input", function () {
    checkPasswordStrength();
    validatePassword();

    if (confirmPasswordInput.value !== "") {
        validateConfirmPassword();
    }
});

confirmPasswordInput.addEventListener("input", validateConfirmPassword);
courseInput.addEventListener("change", validateCourse);
yearInput.addEventListener("change", validateYear);

// Gender
const genderInputs = document.querySelectorAll('input[name="gender"]');

genderInputs.forEach(function (gender) {
    gender.addEventListener("change", validateGender);
});

termsInput.addEventListener("change", validateTerms);

// Form Submit
form.addEventListener("submit", function (event) {
    event.preventDefault();

    const validName = validateName();
    const validEmail = validateEmail();
    const validMobile = validateMobile();
    const validAddress = validateAddress();
    const validPassword = validatePassword();
    const validConfirmPassword = validateConfirmPassword();
    const validCourse = validateCourse();
    const validYear = validateYear();
    const validGender = validateGender();
    const validTerms = validateTerms();

    if (
        validName &&
        validEmail &&
        validMobile &&
        validAddress &&
        validPassword &&
        validConfirmPassword &&
        validCourse &&
        validYear &&
        validGender &&
        validTerms
    ) {
        document.getElementById("successMessage").textContent = "Registration Successful!";
        alert("Registration Successful!");
    } else {
        document.getElementById("successMessage").textContent = "";
    }
});

// Reset Form
form.addEventListener("reset", function () {
    setTimeout(function () {
        document.querySelectorAll("input, textarea, select").forEach(function (element) {
            element.classList.remove("valid", "invalid");
        });

        document.querySelectorAll(".error").forEach(function (error) {
            error.textContent = "";
        });

        strengthBar.style.width = "0%";
        strengthBar.style.background = "#e5e7eb";
        strengthText.textContent = "";
        document.getElementById("successMessage").textContent = "";
    }, 10);
});