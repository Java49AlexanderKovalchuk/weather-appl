import { DataForm } from "./ui/DataForm.js";
import { TemperaturesList } from "./ui/TemperaturesList.js";
import { WeatherDataProcessor } from "./data/WeatherDataProcessor.js";
//https://api.open-meteo.com/v1/gfs?latitude=31.0461&longitude=34.8516&hourly=temperature_2m&timezone=IST&start_date=2022-12-18&end_date=2023-01-03

const params = {idForm: "data_form", idDateFrom: "date_from", idDateTo: "date_to",
idHourFrom: "hour_from", idHourTo: "hour_to", idErrorMessage: "error_message", idCities: "cities"};
const weatherProcessor = new WeatherDataProcessor();
const dataForm = new DataForm(params);
const temperatureList = new TemperaturesList("items-list", "city");

dataForm.addHandler(async(dataFromForm) => {
    const data = await weatherProcessor.getData(dataFromForm);
    temperatureList.showTemperatures(data);
})

weatherProcessor.getCities(cities => dataForm.addCitiesElement(cities));
weatherProcessor.getMinMaxDates(dates => dataForm.addMinMaxDates(dates));

