import { showErrorMessage } from "./errorMessage.js";
export class DataForm {
    
    #formElement;
    #dateFromElement;
    #dateToElement;
    #hourFromElement;
    #hourToElement;
    #errorMessageElem;
    #inputElements;
    #dateFrom;
    #dateTo;
    #hourFrom;
    #hourTo;
    #citiesElement
    
    constructor (params) {
       this.#formElement = document.getElementById(params.idForm);
       this.#inputElements = document.querySelectorAll(`#${params.idForm} [name]`);
       this.#dateFromElement = document.getElementById(params.idDateFrom);
       this.#dateToElement = document.getElementById(params.idDateTo);
       this.#hourFromElement = document.getElementById(params.idHourFrom);
       this.#hourToElement = document.getElementById(params.idHourTo);
       this.#errorMessageElem = document.getElementById(params.idErrorMessage);
       this.onChangeDate();
       this.onChangeHours();
       this.#citiesElement = document.getElementById(params.idCities);
       
    }

    addMinMaxDates(obj) {
        this.#dateFromElement.min = obj.minISODate;
        this.#dateFromElement.max = obj.maxISODate;
        this.#dateToElement.min = obj.minISODate;
        this.#dateToElement.max = obj.maxISODate;
    }

    addCitiesElement(cities) {
        this.#citiesElement.innerHTML += cities;
    }

    addHandler(processFun) {
        this.#formElement.addEventListener('submit', (event) => {
            event.preventDefault();
            const data = Array.from(this.#inputElements)
            .reduce((res, cur) => {
                res[cur.name] = cur.value;
                return res;
            }, {});
            console.log(data);
            processFun(data);

        })
    }
    onChangeDate() {
        this.#dateFromElement.addEventListener('change', this.dateHandler.bind(this));
        this.#dateToElement.addEventListener('change', this.dateHandler.bind(this));
    }
    onChangeHours() {
        this.#hourFromElement.addEventListener('change', this.hourHandler.bind(this));
        this.#hourToElement.addEventListener('change', this.hourHandler.bind(this));
    }
    dateHandler(event) {
        if (event.target == this.#dateFromElement) {
            if (this.#dateTo && this.#dateTo < this.#dateFromElement.value) {
                showErrorMessage(this.#dateFromElement, "date-from must be less or equal date-to"
                , this.#errorMessageElem);
            } else {
                this.#dateFrom = this.#dateFromElement.value;
            }
        }  else {
            if (this.#dateFrom && this.#dateFrom > this.#dateToElement.value) {
                showErrorMessage(this.#dateToElement, "date-to must be greater or equal date-from"
                , this.#errorMessageElem);
            } else {
                this.#dateTo = this.#dateToElement.value;
            }
        }
    }
    hourHandler(event) {
        const hour = event.target.value;
        if(hour < 0 || hour > 23) {
            showErrorMessage(event.target, "hour-from must be in range [0-23]"
                , this.#errorMessageElem);

        } else {
            if (event.target == this.#hourFromElement) {
                if (this.#hourTo && this.#hourTo < hour) {
                    showErrorMessage(this.#hourFromElement, "hour-from must be less or equal hour-to"
                    , this.#errorMessageElem);
                } else {
                    this.#hourFrom = hour;
                }
            }  else {
                if (this.#hourFrom && this.#hourFrom > this.#hourToElement.value) {
                    showErrorMessage(this.#hourToElement, "hour-to must be greater or equal hour-from"
                    , this.#errorMessageElem);
                } else {
                    this.#hourTo = this.#hourToElement.value;
                }
            }
        }
        }
        
}

 