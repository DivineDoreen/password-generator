const passwordLength = document.getElementById("passwordLength");
const copyButton = document.getElementById("copyButton");

copyButton.addEventListener("click", () => {
    password = document.getElementById('passwordOutput').value;

    if (!password) {
        alert('No password to copy!');
        return;
    }

    navigator.clipboard
      .writeText(password)
      .then(() => alert("Password copied"))
      .catch((err) => alert("error copying password", err));
  });

function generatePassword() {
  const length = passwordLength.value;

  if (length < 6 || length > 20) {
    alert("Password length must be greater than 6 or less than 20");
    return;
  }

  let characters = "";
  let password = "";

  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "~!@#$%^&*()_+";

  const useUppercase = document.getElementById("useUppercase").checked;
  const useLowercase = document.getElementById("useLowercase").checked;
  const useNumbers = document.getElementById("useNumbers").checked;
  const useSymbols = document.getElementById("useSymbols").checked;

  if (useUppercase) characters += uppercase;
  if (useLowercase) characters += lowercase;
  if (useNumbers) characters += numbers;
  if (useSymbols) characters += symbols;

  if (characters === "") {
    alert("Please select atleast one option");
    return;
  }

  if (useUppercase) {
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
  }
  if (useLowercase) {
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
  }
  if (useNumbers) {
    password += numbers[Math.floor(Math.random() * numbers.length)];
  }
  if (useSymbols) {
    password += symbols[Math.floor(Math.random() * symbols.length)];
  }

  for (let i = password.length; i < length; i++) {
    password += characters[Math.floor(Math.random() * characters.length)];
  }

  password = shufflePassword(password);

  document.getElementById("passwordOutput").value = password;

  const strength = checkStrength(password);
  updateStrength(strength);
}

function shufflePassword(password) {
  return password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
}

function checkStrength(password) {
  length = passwordLength.value;

  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSymbols = /[~!@#$%^&*()_+]/.test(password);

  if (
    length >= 12 &&
    hasUppercase &&
    hasLowercase &&
    hasNumbers &&
    hasSymbols
  ) {
    return "strong";
  }
  if (
    length >= 8 &&
    hasUppercase &&
    hasLowercase &&
    (hasNumbers || hasSymbols)
  ) {
    return "medium";
  } else {
    return "weak";
  }
}

function updateStrength(strength) {
  const strengthText = document.getElementById("strengthText");
  const strengthBar = document.getElementById("strengthBar");

  if (strength === "strong") {
    strengthText.textContent = "strong";
    strengthBar.style.width = "100%";
    strengthBar.style.backgroundColor = "green";
  }
  if (strength === "medium") {
    strengthText.textContent = "medium";
    strengthBar.style.width = "66%";
    strengthBar.style.backgroundColor = "orange";
  }
  if (strength === "weak") {
    strengthText.textContent = "weak";
    strengthBar.style.width = "33%";
    strengthBar.style.backgroundColor = "red";
  }
}
