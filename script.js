const apiKey = "9728aefdb047afef74f257f4758a672b";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input"); 
const searchBtn = document.querySelector(".search button");

const weatherIcon = document.querySelector(".weather-icon");

function UrlExists(url)
{
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status!=404;
}

async function checkWeather(city){
    const response = await fetch(apiUrl + city +`&appid=${apiKey}`);
    var data = await response.json();

    console.log(data);
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp)+"°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity+"%";
    document.querySelector(".wind").innerHTML = data.wind.speed+" km/hr";

    // if(isfileexist("images/"+data.weather[0].main.toLowerCase()+".png"))
    //     weatherIcon.src = "images/"+data.weather[0].main.toLowerCase()+".png";
    // else
    //     console.log('No such file');
}

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
});

//default city should be taken from the location
document.addEventListener("DOMContentLoaded", () => {
    checkWeather("chennai");
});