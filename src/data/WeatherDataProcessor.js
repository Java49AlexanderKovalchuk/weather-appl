export class WeatherDataProcessor {
    #cityGeocodes
    constructor() {
        this.#cityGeocodes = [{ city: "Rehovot", latitude: 31.8928, longitude: 34.8113 },
        { city: "Haifa", latitude: 32.7940, longitude: 34.9896 },
        { city: "Jerusalem", latitude: 31.7683, longitude: 35.2137 },
        { city: "Tel-Aviv", latitude: 32.0853, longitude: 34.7818 },
        { city: "Eilat", latitude: 29.5577, longitude: 34.9519 }];

    }
    async getData(requestObject) {
        
        const url = this.getUrl(requestObject);
        const response = await fetch(url);
        return this.processData(await response.json(), requestObject);
    }
    
    getUrl(requestObject) {
        const baseUrl = "https://api.open-meteo.com/v1/gfs?";
        const baseParams = "&hourly=temperature_2m&timezone=IST&";
        const geocodes = this.#cityGeocodes.find(gc => gc.city == requestObject.city);
        const latitude = geocodes.latitude;
        const longitude = geocodes.longitude;
        const startDate = requestObject.dateFrom;
        const endDate = requestObject.dateTo;
        const url = `${baseUrl}latitude=${latitude}&longitude=${longitude}${baseParams}start_date=${startDate}&end_date=${endDate}`
        console.log(url)
        return url;
    }
    processData(data, requestObject) {
        const times = data.hourly.time;
        const temperatures = data.hourly.temperature_2m;
        const timesSelectedDatesHours = times.filter((__, index) => {
            const hour = index % 24;
            return hour >= requestObject.hourFrom && hour <= requestObject.hourTo;
        });
        const temperaturesDateDatesHours = temperatures.filter((__, index) => {
            const hour = index % 24;
            return hour >= requestObject.hourFrom && hour <= requestObject.hourTo;
        });
        const objects = timesSelectedDatesHours.map((dt, index) => {
            const dateTime = dt.split("T");
            return { date: dateTime[0], hour: dateTime[1], temperature: temperaturesDateDatesHours[index] };
        });
        return { city: requestObject.city, objects };
    }

    getCities() {
        return this.#cityGeocodes.map(el => el.city);
    }
    getDatesInteval() {
        return 17;
    }

}
