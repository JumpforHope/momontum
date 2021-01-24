const weather = document.querySelector(".js-weather");
const API_KEY = 'd4c3e3bc6587526fa30855ff46fafd1b';
const COORDS = 'coords';

function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`).then(function(response){
        return response.json();
    }).then(function(json) {
        const temperature = json.main.temp;
        const nowWeather = json.weather[0].main;
        const place = json.name;
        const country = json.sys.country;
        weather.innerText = `${temperature}'c, ${nowWeather}\n${place}, ${country}`;
    })
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
}

function handleGeoError() {
    console.log("Can't access geographical location!");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);

}

function loadCoords() {
    const loadedcoords = localStorage.getItem(COORDS);
    if(loadedcoords === null) {
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedcoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();