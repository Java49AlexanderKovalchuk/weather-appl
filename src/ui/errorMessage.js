const TIME_OUT_ERROR_MESSAGE = 5000;
const ERROR_CLASS = 'error';
export function showErrorMessage(element, message, errorElement) {
    element.classList.add(ERROR_CLASS);
    errorElement.innerHTML = message;
    setTimeout(() => {
        errorElement.innerHTML = '';
        element.value = '';
        element.classList.remove(ERROR_CLASS);
        
    }, TIME_OUT_ERROR_MESSAGE);
}