function goToReviewStep() {
    let fullname = document.getElementById("fullname").value.trim();
    let mobile = document.getElementById("mobile").value.trim();
    let email = document.getElementById("email").value.trim();
    let city = document.getElementById("city").value.trim();
    let purpose = document.getElementById("purpose").value;
    let message = document.getElementById("form-message");

    if (fullname === "" || mobile === "" || email === "" || city === "" || purpose === "") {
        message.innerText = "⚠️ Please fill in all fields before reviewing.";
        message.style.color = "red";
        return;
    }

    if (mobile.length !== 10 || isNaN(mobile)) {
        message.innerText = "⚠️ Please enter a valid 10-digit mobile number.";
        message.style.color = "red";
        return;
    }

    if (!email.includes("@") || !email.includes(".")) {
        message.innerText = "⚠️ Please enter a valid email address.";
        message.style.color = "red";
        return;
    }

    document.getElementById("review-name").innerText = fullname;
    document.getElementById("review-mobile").innerText = mobile;
    document.getElementById("review-email").innerText = email;
    document.getElementById("review-city").innerText = city;
    document.getElementById("review-purpose").innerText = purpose;

    message.innerText = "";

    document.getElementById("form-step1").style.display = "none";
    document.getElementById("form-step2").style.display = "block";
}

function goBackToEdit() {
    document.getElementById("form-step2").style.display = "none";
    document.getElementById("form-step1").style.display = "block";
}

function submitFinalForm() {
    document.getElementById("final-name").innerText = document.getElementById("fullname").value.trim();
    document.getElementById("final-mobile").innerText = document.getElementById("mobile").value.trim();
    document.getElementById("final-email").innerText = document.getElementById("email").value.trim();
    document.getElementById("final-city").innerText = document.getElementById("city").value.trim();
    document.getElementById("final-purpose").innerText = document.getElementById("purpose").value;

    document.getElementById("form-step2").style.display = "none";
    document.getElementById("form-step3").style.display = "block";
}

function restartFormPractice() {
    document.getElementById("fullname").value = "";
    document.getElementById("mobile").value = "";
    document.getElementById("email").value = "";
    document.getElementById("city").value = "";
    document.getElementById("purpose").value = "";

    document.getElementById("form-message").innerText = "";

    document.getElementById("form-step3").style.display = "none";
    document.getElementById("form-step1").style.display = "block";
}