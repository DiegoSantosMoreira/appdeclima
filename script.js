// Variáveis de controle e seleção de elementos

const apiKey = "191517b2336bfb87cc35330559196a9f";
//const apiCountryURL = "https://flagsapi.com/BR/flat/64.png";

const nameCity = document.querySelector("#name-city");
const searchBtn = document.querySelector("#search");

const cityElementFromAPI = document.querySelector("#city");
const tempElementFromAPI = document.querySelector("#temperature span");
const descElementFromAPI = document.querySelector("#description");
const weatherIconElementFromAPI = document.querySelector("#weather-icon");
const countryElementFromAPI = document.querySelector("#country");
const humidityElementFromAPI = document.querySelector("#humidity span");
const windElementFromAPI = document.querySelector("#wind span");

const weatherContainer = document.querySelector("#weather-data");

// Funções

const getWeatherData = async(city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metrics&appid=${apiKey}&lang=pt_br`

    const res = await fetch(apiWeatherURL);
    const data = await res.json();

    console.log(data)

    return data;
}
    const showWeatherData = async (city) => {

    const data = await getWeatherData(city); 

    if (data.cod === '404'){
        window.alert ("Cidade não encontrada" +
                    "\nDigite uma cidade válida!")
                    location.reload();
    }else{
    
    cityElementFromAPI.innerText = data.name;
    tempElementFromAPI.innerText = parseInt(data.main.temp) - 273,15;
    descElementFromAPI.innerText = data.weather[0].description;
    humidityElementFromAPI.innerText = data.main.humidity + "%";
    windElementFromAPI.innerText = data.wind.speed + "km/h";
    weatherIconElementFromAPI.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    countryElementFromAPI.setAttribute("src", `https://flagsapi.com/${data.sys.country}/flat/64.png`);

    weatherContainer.classList.remove("hide");
}
};

//Eventos

searchBtn.addEventListener("click", (e) => {

    e.preventDefault()

    const city = nameCity.value;
    showWeatherData(city);
    
})
