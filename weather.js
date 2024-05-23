document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('weatherForm');
    const result = document.getElementById('weatherResult');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const city = document.getElementById('city').value;

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f1b4891bcb14f1eb1711ca8f54a6ce99`)
            .then(response => response.json())
            .then(data => {
                const weatherDescription = data.weather[0].description;
                const temperature = data.main.temp;
                result.textContent = `Current weather in ${city}: ${weatherDescription}, ${temperature}°C`;
            })
            .catch(error => {
                result.textContent = 'Error fetching weather data.';
            });
    });
});
