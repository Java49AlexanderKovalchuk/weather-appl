export class TemperaturesList {
    
    #listElement;
    constructor(idList) {
        this.#listElement = document.getElementById(idList);
    }
    showTemperatures(dataArray) {
        //TODO
        //{city, objects: [{date, hour, temperature}, ...]}
        this.#listElement.innerHTML = getWeather(dataArray);
    }

}
function getWeather(dataAr) {
    return dataAr.map(value => `<li class='weather-item-container'>
        <p class='weather-item-paragraf'>Place: ${value.place}</p>
        <p class='weather-item-paragraf'>Date: ${value.date}</p>
        <p class="weather-item-paragraf">Hours: ${value.hour}</p>
        <p class='weather-item-paragraf'>Temperature: ${value.temperature}</p>

    </li >`).join('');
} 
