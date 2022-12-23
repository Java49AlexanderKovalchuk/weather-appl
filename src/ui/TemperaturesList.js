export class TemperaturesList {
    #cityElement
    #listElement
    constructor(idList, idCity) {
        this.#cityElement = document.getElementById(idCity);
        this.#listElement = document.getElementById(idList);
    }
    showTemperatures(dataArray) {
             this.#cityElement.innerHTML = dataArray.city;
             this.#listElement.innerHTML = getListItems(dataArray.objects)
              
    }
}
function getListItems(data) {
    return data.map(d =>
        `<li class="item-class">
              <div class="item-container">
                 <p class="item-paragraph">Date: ${d.date} </p>
                 <p class="item-paragraph">Hour: ${d.hour} </p>
                 <p class="item-paragraph">Temperature: ${d.temperature}</p>
                 
              </div>
          </li>`).join('');
}