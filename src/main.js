//https://api.open-meteo.com/v1/gfs?latitude=31.0461&longitude=34.8516&hourly=temperature_2m&timezone=IST&start_date=2022-12-18&end_date=2023-01-03
let latitude = 31.046;
let longitude=34.851;
let start_date="2022-12-18";
let end_date="2022-12-18";
const baseUrl = "https://api.open-meteo.com/v1/gfs?";
const baseParams = "&hourly=temperature_2m&timezone=IST&";
const url = `${baseUrl}latitude=${latitude}&longitude=${longitude}${baseParams}start_date=${start_date}&end_date=${end_date}`
fetch(url).then((response) => response.json())
.then(data => console.log(data.hourly.temperature_2m))