let myform = document.querySelector("#myForm");
let errMsg = document.querySelector('#errMsg');

myform.addEventListener('submit', function (e) {
    e.preventDefault();

    let formData = new FormData(e.target);
    let data = Object.fromEntries(formData.entries());
    let { cardNumber, cvc, amount, firstName, city, lastName, state, zip, message, cardType } = data;

    // Limpiar mensajes anteriores
    errMsg.innerHTML = "";
    let hasError = false;

    const showError = (inputId, message) => {
        hasError = true;

        const alertDiv = document.createElement("div");
        alertDiv.className = "alert alert-danger alert-transparent";
        alertDiv.role = "alert";
        alertDiv.textContent = message;
        errMsg.appendChild(alertDiv);

        let input = myform.querySelector(`#${inputId}`);
        if (input) input.classList.add("border", "border-danger");
    };

    // Validaciones
    if (!cardNumber || cardNumber.length !== 16) {
        showError("cardNumber", "This is not a valid card number");
    }

    if (!cvc || cvc.length < 3 || cvc.length > 4) {
        showError("cvc", "CVC must be 3 or 4 digits");
    }

    if (!amount || isNaN(amount) || amount <= 0) {
        showError("amount", "Amount must be a positive number");
    }

    if (!firstName.trim()) {
        showError("firstName", "First Name is required");
    }

    if (!lastName.trim()) {
        showError("lastName", "Last Name is required");
    }

    if (!city.trim()) {
        showError("city", "City is required");
    }

    if (!state.trim()) {
        showError("state", "State is required");
    }

    if (!zip || isNaN(zip)) {
        showError("zip", "Zip must be a valid number");
    }

    if (!cardType) {
        hasError = true;

        const alertDiv = document.createElement("div");
        alertDiv.className = "alert alert-danger alert-transparent";
        alertDiv.role = "alert";
        alertDiv.textContent = "Please select a card type";
        errMsg.appendChild(alertDiv);

        let cardTypeInputs = myform.querySelectorAll("input[name='cardType']");
        cardTypeInputs.forEach(input => input.classList.add("border", "border-danger"));
    }

 
    if (!hasError) {
        myform.reset();

        let inputs = myform.querySelectorAll(".border-danger");
        inputs.forEach(input => input.classList.remove("border", "border-danger"));

        const successAlert = document.createElement("div");
        successAlert.className = "alert alert-success";
        successAlert.role = "alert";
        successAlert.textContent = "✅ Form submitted successfully!";
        errMsg.appendChild(successAlert);
    }
});
