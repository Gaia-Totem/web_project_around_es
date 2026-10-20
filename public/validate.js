function showInputError(input) {
    const errorElement = input.nextElementSibling;
    errorElement.textContent = input.validationMessage;
}
function hideInputError(input) {
    const errorElement = input.nextElementSibling;
    errorElement.textContent = "";
}
function checkInputValidity(input) {
    if (!input.validity.valid) {
        showInputError(input);
    }
    else {
        hideInputError(input);
    }
}
function toggleButtonState(inputs, button) {
    const allValid = Array.from(inputs).every((input) => input.validity.valid);
    button.disabled = !allValid;
}
function setEventListeners(inputs, button) {
    inputs.forEach((input) => {
        input.addEventListener("input", () => {
            checkInputValidity(input);
            toggleButtonState(inputs, button);
        });
    });
}
export { toggleButtonState, setEventListeners };
//# sourceMappingURL=validate.js.map