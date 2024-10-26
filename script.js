document.addEventListener("DOMContentLoaded", () => {
    // Check if the user's browser supports geolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(fetchWeather, handleError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});

function fetchWeather(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const apiKey = "dd740e37a94937f0bcfb43f3f82f4d17";
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

    fetch(weatherUrl)
        .then(response => response.json())
        .then(data => updateWeatherUI(data))
        .catch(error => console.error("Error fetching weather data:", error));
}

function updateWeatherUI(data) {
    document.getElementById("location").innerText = `${data.name}, ${data.sys.country}`;
    document.getElementById("temperature").innerText = `${Math.round(data.main.temp)} °F`;
    document.getElementById("description").innerText = `${data.weather[0].description}`;
    document.getElementById("feels-like").innerText = `${Math.round(data.main.feels_like)} °F`;
    document.getElementById("humidity").innerText = `${data.main.humidity}%`;
    document.getElementById("wind").innerText = `${Math.round(data.wind.speed)} mph`;
}

function handleError(error) {
    console.error("Geolocation error:", error);
    alert("Unable to retrieve your location for weather updates.");
}
