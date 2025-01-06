const generatorForm = document.forms["password-generator-form"];
const passwordLengthInput = document.querySelector("#password-length");
const passwordOutputInput = document.querySelector("#password-output");
const copyButton = document.querySelector("#copy-btn");
const checkboxes = document.querySelectorAll("input[type='checkbox']");

function handleFormSubmission(e) {
    e.preventDefault();

    const generatedPassword = generatePassword();
    const passwordStrength = checkStrength(generatedPassword);

    updateStrength(passwordStrength);
    passwordOutputInput.value = generatedPassword;
}

function generatePassword() {
    const passwordLength = parseInt(passwordLengthInput.value);
    const options = [];
    let password = "";
    const charactersObj = {
        uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        lowercase: "abcdefghijklmnopqrstuvwxyz",
        numbers: "0123456789",
        symbols: "~!@#$%^&*()_+"
    };

    if (Number.isNaN(passwordLength)) return alert("Please enter a number");
    if (passwordLength < 6 || passwordLength > 20)
        return alert("Password length must be greater than 6 or less than 20");
    if (!Array.from(checkboxes).some((checkbox) => checkbox.checked)) return alert("Please select at least one option");

    checkboxes.forEach((checkbox) => checkbox.checked && options.push(checkbox.id));

    for (let i = 0; i < passwordLength; i++) {
        if (i < options.length) {
            password += charactersObj[options[i]].charAt(Math.floor(Math.random() * charactersObj[options[i]].length));
        } else {
            const randomOption = options[Math.floor(Math.random() * options.length)];
            const randomOptionCharacters = charactersObj[randomOption];
            const randomCharacter = randomOptionCharacters.charAt(
                Math.floor(Math.random() * randomOptionCharacters.length)
            );

            password += randomCharacter;
        }
    }

    return shufflePassword(password);
}

function shufflePassword(password) {
    let passwordArray = password.split("");

    for (let i = 0; i < Math.floor(passwordArray.length / 2); i++) {
        let randomIndex = Math.floor(Math.random() * passwordArray.length);
        let charAtRandIndex = passwordArray[randomIndex];
        let charAtOriginalIndex = passwordArray[i];

        passwordArray[i] = charAtRandIndex;
        passwordArray[randomIndex] = charAtOriginalIndex;
    }

    return passwordArray.join("");
}

function checkStrength(password) {
    switch (true) {
        case password.length >= 12 && /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+~]).{12,}$/.test(password):
            return "strong";
        case password.length >= 8 && /^(?=.*([a-z]|[A-Z]))(?=.*([0-9]|[!@#$%^&*()_+~])).{8,}$/.test(password):
            return "medium";
        default:
            return "weak";
    }
}

function updateStrength(strength) {
    const strengthText = document.querySelector("#strength-text");
    const strengthBar = document.querySelector("#strength-bar");

    strengthText.textContent = strength.toUpperCase();

    if (strength === "strong") {
        strengthBar.style.width = "100%";
        strengthBar.style.backgroundColor = "green";
    } else if (strength === "medium") {
        strengthBar.style.width = "66%";
        strengthBar.style.backgroundColor = "orange";
    } else {
        strengthBar.style.width = "33%";
        strengthBar.style.backgroundColor = "red";
    }
}

function copyPassword(e) {
    try {
        window.navigator.clipboard.writeText(passwordOutputInput.value);
        e.target.textContent = "Copied!";
        setTimeout(() => (e.target.textContent = "Copy"), 500);
    } catch {
        alert("Failed to copy password");
    }
}

generatorForm.addEventListener("submit", handleFormSubmission);
copyButton.addEventListener("click", copyPassword);
