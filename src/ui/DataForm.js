import { showErrorMessage } from "./errorMessage.js"; 
export class DataForm {
    //TODO 
    #formElement;
    #inputElements;
    #dateFromElement;
    #dateToElement;
    #hoursFromElement;
    #hoursToElement;
    #errorMessageElem;
    //....
    constructor(params) {
        this.#formElement = document.getElementById(params.idForm);
        this.#inputElements = document.querySelectorAll(`#${params.idForm} [name]`);
        this.#dateFromElement = document.getElementById(params.idDateFrom);
        this.#hoursFromElement = document.getElementById(params.idHoursFrom);
        this.#hoursToElement = document.getElementById(params.idHoursTo);
        this.#errorMessageElem = document.getElementById(params.idErrorMessage);
    }
    addHandler(processFun) {
        this.#formElement.addEventListener("submit", (event) => {
            event.preventDefault();
            console.log("submitted");
            const dataForm = Array.from(this.#inputElements).reduce(
                (res, cur) => {
                    res[cur.name] = cur.value;
                    return res;
            }, {});
            console.log(dataForm);
            processFun(dataForm);
        });
    }


}