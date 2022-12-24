import { DataForm } from "./ui/DataForm.js";
import { TemperaturesList } from "./ui/TemperaturesList.js";
import { WeatherDataProcessor } from "./data/WeatherDataProcessor.js";
//https://api.open-meteo.com/v1/gfs?latitude=31.0461&longitude=34.8516&hourly=temperature_2m&timezone=IST&start_date=2022-12-18&end_date=2023-01-03

const weatherProcessor = new WeatherDataProcessor();
const params = {
    idForm: "data_form", idDateFrom: "date_from", idDateTo: "date_to",
    idHourFrom: "hour_from", idHourTo: "hour_to", idErrorMessage: "error_message", idCities: "cities",
    cities: weatherProcessor.getCities(), minMaxDates: getMinMaxDates(weatherProcessor.getDatesInteval())
};
const dataForm = new DataForm(params);
const temperatureList = new TemperaturesList("items-list", "city");

dataForm.addHandler(async (dataFromForm) => {
    const data = await weatherProcessor.getData(dataFromForm);
    temperatureList.showTemperatures(data);
})

function getMinMaxDates(interval) {
    const currentDate = new Date();
    const dateNow = currentDate.toISOString().substring(0, 10);
    const day = currentDate.getDate();
    currentDate.setDate(day + interval);
    const objMinMaxDates = { minISODate: dateNow, maxISODate: currentDate.toISOString().substring(0, 10) };
    return objMinMaxDates;
}


