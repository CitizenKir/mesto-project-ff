const showInputError = (element, inputErrorClass, errorElement, errorElementActiveClass, message) => {
    element.classList.add(inputErrorClass);
    errorElement.classList.add(errorElementActiveClass)
    errorElement.textContent = message
};

const hideInputError = (element, cssClass, errorElement, errorElementActiveClass) => {
    element.classList.remove(cssClass);
    errorElement.classList.remove(errorElementActiveClass)
    errorElement.textContent = ''
};

const isValid = (formInput, inputErrorClass, inactiveButtonClass, errorElement, errorElementActiveClass) => {
    if (formInput.validity.patternMismatch) {
        formInput.setCustomValidity(formInput.dataset.errorMessage);
    } else {
        formInput.setCustomValidity("");
    }
    if (!formInput.validity.valid) {
        showInputError(formInput, inputErrorClass, errorElement, errorElementActiveClass, formInput.validationMessage);
    } else {
        hideInputError(formInput, inputErrorClass, errorElement, errorElementActiveClass);
    }
}

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

const setButtonInactive = (buttonElement, inactiveButtonClass) => {
    buttonElement.disabled = true;
    buttonElement.classList.add(inactiveButtonClass);
}

const setButtonActive = (buttonElement, inactiveButtonClass) => {
    buttonElement.disabled = false;
    buttonElement.classList.remove(inactiveButtonClass);
}

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
    if (hasInvalidInput(inputList)) {
        setButtonInactive(buttonElement, inactiveButtonClass)
    } else {
        setButtonActive(buttonElement, inactiveButtonClass)
    }
};

const setEventListeners = (formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) => {
    const submitButton = formElement.querySelector(submitButtonSelector)
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));

    toggleButtonState(inputList, submitButton, inactiveButtonClass);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
            isValid(inputElement, inputErrorClass, inactiveButtonClass, errorElement, errorClass)
            toggleButtonState(inputList, submitButton, inactiveButtonClass);
        });
    });
};

export const clearValidation = (formElement, validationConfig) => {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector)

    toggleButtonState(inputList, buttonElement, validationConfig.inactiveButtonClass)
    inputList.forEach((inputElement) => {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        hideInputError(inputElement, validationConfig.inputErrorClass, errorElement, validationConfig.errorClass)
    })
}

export function enableValidation({
                                     formSelector,
                                     inputSelector,
                                     submitButtonSelector,
                                     inactiveButtonClass,
                                     inputErrorClass,
                                     errorClass
                                 }) {
    const formList = Array.from(document.querySelectorAll(formSelector));

    formList.forEach((formElement) => {
        setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass);
    });
}