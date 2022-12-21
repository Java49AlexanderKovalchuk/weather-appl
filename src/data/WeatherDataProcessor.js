export class WeatherDataProcessor {
    #cityGeocodes
    constructor() {
        this.#cityGeocodes = [{
            city: "Rehovot", latitude: 31.046,
            longitude: 34.851
        }, {
            city: "Haifa", latitude: 32.808,
            longitude: 34.987
        }, {
            city: "Jerusalem", latitude: 31.777,
            longitude: 35.235
        }, {
            city: "Tel Aviv", latitude: 32.081,
            longitude: 34.781
        }];
    }
    getData(requestObject) {
        //{city, dateFrom, dateTo, hoursFrom, hoursTo }
        console.log("requestObject", requestObject);
        const url = this.getUrl(requestObject);     
        const promiseResponse = fetch(url);
        return this.processData(promiseResponse.then(response => response.json()));
    }
    getUrl(requestObject) {
        //TODO create URL for request and returns it
        let latitude, longitude;
        [latitude, longitude] = this.getCoordinates(this.#cityGeocodes, requestObject.place);
        console.log("latitude", latitude, "longitude", longitude);
        const start_date = requestObject.dateFrom;
        const end_date = requestObject.dateTo;
        
        const baseUrl = "https://api.open-meteo.com/v1/gfs?";
        const baseParams = "&hourly=temperature_2m&timezone=IST&";
        const url = `${baseUrl}latitude=${latitude}&longitude=${longitude}${baseParams}start_date=${start_date}&end_date=${end_date}`

        console.log('url', url)
        return url;

    }
    
    getHourLimits(requestObject) {
        return {hourMin: +requestObject.hoursFrom, hourMax: +requestObject.hoursTo};
    }
    
    processData(promiseData) {
        return promiseData.then(data => {
            return data.hourly.time.map((el, ind) => {
                const dateTime = el.split("T");
                return {
                    
                    date: dateTime[0],
                    hour: dateTime[1],
                    temperature: data.hourly.temperature_2m[ind]
                }
            });
        });
            //TODO
            // return {city, objects: [{date, hour, temperature}, ...]}
    }
    
    getCoordinates(cityGeocodes, city) {
        const res = [];
        const bySity = cityGeocodes.filter(n => n.city == city);
        res[0] = bySity[0].latitude;
        res[1] = bySity[0].longitude;
        return res;
    }
}
