function checkPasswordStrength() {
  const user = document.getElementById("login-user").value.trim();
  const password = document.getElementById("login-password").value;
  const message = document.getElementById("password-message");
  const rulesBox = document.getElementById("password-rules");

  const hasLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>_\-+=/\\[\]]/.test(password);

  if (user === "" || password === "") {
    message.innerText = "⚠️ Please fill in both fields.";
    message.style.color = "red";
    rulesBox.style.display = "none";
    return;
  }

  rulesBox.style.display = "block";

  updateRule("rule-length", hasLength, "At least 8 characters");
  updateRule("rule-upper", hasUpper, "At least 1 uppercase letter");
  updateRule("rule-number", hasNumber, "At least 1 number");
  updateRule("rule-special", hasSpecial, "At least 1 special character");

  let score = 0;
  if (hasLength) score++;
  if (hasUpper) score++;
  if (hasNumber) score++;
  if (hasSpecial) score++;

  let strength = "";
  let strengthMessage = "";

  if (score <= 2) {
    strength = "Weak";
    strengthMessage = "❌ Weak Password. Improve it using the checklist above.";
    message.style.color = "red";
  } else if (score === 3) {
    strength = "Medium";
    strengthMessage = "⚠️ Medium Password. Good, but it can be stronger.";
    message.style.color = "#b45309";
  } else {
    strength = "Strong";
    strengthMessage = "✅ Strong Password! Great job creating a safer password.";
    message.style.color = "green";
  }

  message.innerText = strengthMessage;

  // Only allow moving forward if medium or strong
  if (score >= 3) {
    setTimeout(() => {
      showPasswordResult(user, strength);
    }, 1200);
  }
}

function updateRule(ruleId, passed, text) {
  const rule = document.getElementById(ruleId);
  if (passed) {
    rule.innerText = "✔ " + text;
    rule.style.color = "green";
  } else {
    rule.innerText = "✖ " + text;
    rule.style.color = "red";
  }
}

function showPasswordResult(user, strength) {
  document.getElementById("final-user").innerText = user;
  document.getElementById("final-strength").innerText = strength;

  if (strength === "Strong") {
    document.getElementById("strength-result").innerText = "Your password is strong and safer for digital use.";
  } else {
    document.getElementById("strength-result").innerText = "Your password is acceptable, but strengthening it further is recommended.";
  }

  document.getElementById("password-step1").style.display = "none";
  document.getElementById("password-step2").style.display = "block";
}

function restartPasswordPractice() {
  document.getElementById("login-user").value = "";
  document.getElementById("login-password").value = "";
  document.getElementById("password-message").innerText = "";
  document.getElementById("password-rules").style.display = "none";

  resetRule("rule-length", "At least 8 characters");
  resetRule("rule-upper", "At least 1 uppercase letter");
  resetRule("rule-number", "At least 1 number");
  resetRule("rule-special", "At least 1 special character");

  document.getElementById("password-step2").style.display = "none";
  document.getElementById("password-step1").style.display = "block";
}

function resetRule(ruleId, text) {
  const rule = document.getElementById(ruleId);
  rule.innerText = "• " + text;
  rule.style.color = "#334155";
}