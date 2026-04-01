function goToPinStep() {
    let receiver = document.getElementById("receiver").value.trim();
    let upiid = document.getElementById("upiid").value.trim();
    let amount = document.getElementById("amount").value.trim();
    let message = document.getElementById("payment-message");

    if (receiver === "" || upiid === "" || amount === "") {
        message.innerText = "⚠️ Please fill in all fields before proceeding.";
        message.style.color = "red";
        return;
    }

    if (!upiid.includes("@")) {
        message.innerText = "⚠️ Please enter a valid UPI ID (example@upi).";
        message.style.color = "red";
        return;
    }

    if (Number(amount) <= 0) {
        message.innerText = "⚠️ Amount must be greater than zero.";
        message.style.color = "red";
        return;
    }

    message.innerText = "";

    document.getElementById("step1").style.display = "none";
    document.getElementById("step2").style.display = "block";
}

function confirmPayment() {
    let pin = document.getElementById("pin").value.trim();
    let pinMessage = document.getElementById("pin-message");

    if (pin.length !== 4 || isNaN(pin)) {
        pinMessage.innerText = "⚠️ Please enter a valid 4-digit PIN.";
        pinMessage.style.color = "red";
        return;
    }

    let receiver = document.getElementById("receiver").value.trim();
    let amount = document.getElementById("amount").value.trim();

    document.getElementById("success-receiver").innerText = receiver;
    document.getElementById("success-amount").innerText = amount;

    pinMessage.innerText = "";

    document.getElementById("step2").style.display = "none";
    document.getElementById("step3").style.display = "block";
}

function restartPractice() {
    document.getElementById("receiver").value = "";
    document.getElementById("upiid").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("pin").value = "";

    document.getElementById("payment-message").innerText = "";
    document.getElementById("pin-message").innerText = "";

    document.getElementById("step3").style.display = "none";
    document.getElementById("step1").style.display = "block";
}