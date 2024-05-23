document.addEventListener('DOMContentLoaded', () => {
    const timezones = document.getElementById('timezones');
    const form = document.getElementById('timezoneForm');
    const result = document.getElementById('timezoneResult');

    const apiKey = '3eb75b2c672c458eb10ecd09f0ee3637';

    // Pre-defined major cities
    const majorCities = ['New York', 'London', 'Tokyo', 'Sydney'];
    majorCities.forEach(city => {
        fetch(`https://timezone.abstractapi.com/v1/current_time/?api_key=${apiKey}&location=${encodeURIComponent(city)}`)
            .then(response => response.json())
            .then(data => {
                const li = document.createElement('li');
                li.textContent = `${data.timezone_location}: ${data.datetime}`;
                timezones.appendChild(li);
            })
            .catch(error => {
                console.error('Error fetching time data:', error);
            });
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const city = document.getElementById('city').value;

        fetch(`https://timezone.abstractapi.com/v1/current_time/?api_key=${apiKey}&location=london`)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    result.textContent = 'Error fetching time data. Please check the city name.';
                } else {
                    result.textContent = `Current time in ${data.timezone_location}: ${data.datetime}`;
                }
            })
            .catch(error => {
                result.textContent = 'Error fetching time data.';
                console.error('Error fetching time data:', error);
            });
    });
});
