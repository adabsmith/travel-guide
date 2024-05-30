document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('weatherForm');
    const result = document.getElementById('weatherResult');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const city = document.getElementById('city').value;

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f1b4891bcb14f1eb1711ca8f54a6ce99`)
            .then(response => response.json())
            .then(data => {
                const tempCelsius = (data.main.temp - 273.15).toFixed(1); // Convert from Kelvin to Celsius
                const weather = data.weather[0].description;
                const date = new Date(data.dt * 1000);
                const day = date.toLocaleString('en-US', { weekday: 'long' });
                const time = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

                result.innerHTML = `
                    <div class="weather-info">
                        <div class="weather-location">${data.name}, ${data.sys.country}</div>
                        <div class="weather-icon"><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${weather}"></div>
                        <div class="weather-temp">${tempCelsius} °C</div>
                        <div class="weather-date">${day}, ${date.toLocaleDateString()}</div>
                        <div class="weather-time">${time}</div>
                    </div>
                `;
            })
            .catch(error => {
                result.textContent = 'Error fetching weather data: ' + error;
            });
    });
});
