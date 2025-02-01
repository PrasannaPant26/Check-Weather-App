// http://api.weatherapi.com/v1/current.json?key=325240462d884db3afb212350250101&q=Dehradun&aqi=no

//Axios and Fetch are two popular ways to make HTTP requests in JavaScript. Axios converts the response into json format by default.

const temperatureField = document.querySelector(".temp");
const locationField = document.querySelector(".time_location p");
const dateandTimeField = document.querySelector(".time_location span");
const conditionField = document.querySelector(".condition p");
const searchField = document.querySelector(".search_area");
const HumidityField = document.querySelector('#weather-details p:nth-child(2)');
const PressureField = document.querySelector('#weather-details p:nth-child(3)');
const WindSpeedField = document.querySelector('#weather-details p:nth-child(4)');
const WindDirectionField = document.querySelector('#weather-details p:nth-child(5)');
const DewpointField = document.querySelector('#weather-details p:nth-child(6)');
const LastUpdatedField = document.querySelector('#weather-details p:nth-child(7)');
const form = document.querySelector("form");

// Default location
let targetLocation = 'Chennai';

// Fetch weather data
// Earlier .then .catch .finally() functions were used to handle promises, instead of async and await
const fetchResults = async (targetLocation) => {
    let url = `http://api.weatherapi.com/v1/current.json?key=325240462d884db3afb212350250101&q=${targetLocation}&aqi=no`;

    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error("Failed to fetch weather data");
        }
        const data = await res.json();
        console.log(data);

        let locationName = data.location.name;
        let time = data.location.localtime;
        let temp = data.current.temp_c;
        let condition = data.current.condition.text;

        let humidity = data.current.humidity;
        let pressure = data.current.pressure_in;
        let wind_direction = data.current.wind_dir;
        let dewpoint = data.current.dewpoint_c;
        let wind_speed = data.current.wind_kph;
        let last_updated = data.current.last_updated;

        updateDetails(temp, locationName, time, condition, humidity, pressure, wind_direction, dewpoint, wind_speed, last_updated);
    } catch (error) {
        console.error(error);
        alert("Could not fetch weather data. Please try again.");
    }
};

// Update UI with weather details
function updateDetails(temp, locationName, time, condition, humidity, pressure, wind_direction, dewpoint, wind_speed, last_updated) {
    temperatureField.innerText = `${temp}°C`;
    locationField.innerText = locationName;
    dateandTimeField.innerText = `Date & Time: ${time}`;
    conditionField.innerText = condition;

    HumidityField.innerText = `Humidity: ${humidity}`;
    PressureField.innerText = `Pressure: ${pressure} inHg`;
    WindSpeedField.innerText = `Speed in kph: ${wind_speed}`;
    WindDirectionField.innerText = `Wind Direction: ${wind_direction}`;
    DewpointField.innerText = `Dewpoint: ${dewpoint}°C`;
    LastUpdatedField.innerText = `Last Updated: ${last_updated}`;
}

// Handle form submission
function searchForLocation(e) {
    e.preventDefault();

    const target = searchField.value.trim();
    if (target === "") {
        alert("Please enter a valid location.");
        return;
    }

    fetchResults(target);
}

// Add event listener to the form
form.addEventListener('submit', searchForLocation);

// Fetch default location weather
fetchResults(targetLocation);

// Theme toggle functionality
const themeToggleButton = document.getElementById("theme-toggle");
themeToggleButton.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
    document.body.classList.toggle("dark-theme");
});

// Toggle weather details visibility
function showDetails() {
    const details = document.getElementById('weather-details');

    if (details.style.display === 'none' || details.style.display === '') {
        details.style.display = 'block';
    } else {
        details.style.display = 'none';
    }
}
