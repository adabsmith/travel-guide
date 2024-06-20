document.addEventListener('DOMContentLoaded', () => {
    const timezoneCardsContainer = document.getElementById('timezoneCardsContainer');
    const form = document.getElementById('timezoneForm');
    const result = document.getElementById('timezoneResult');

    const apiKey = '37c476750aec4e2aaf5eb1d6cbe39d0b';

    // Pre-defined major cities
    const majorCities = ['London', 'Tokyo', 'Sydney'];
    majorCities.forEach(city => {
        fetch(`https://timezone.abstractapi.com/v1/current_time/?api_key=${apiKey}&location=${encodeURIComponent(city)}`)
            .then(response => response.json())
            .then(data => {
                createTimezoneCard(data);
            })
            .catch(error => {
                console.error('Error fetching time data:', error);
            });
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const city = document.getElementById('city').value;

        fetch(`https://timezone.abstractapi.com/v1/current_time/?api_key=${apiKey}&location=${encodeURIComponent(city)}`)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    result.textContent = 'Error fetching time data. Please check the city name.';
                } else {
                    result.innerHTML = ''; // Clear previous results
                    createTimezoneCard(data);
                }
            })
            .catch(error => {
                result.textContent = 'Error fetching time data.';
                console.error('Error fetching time data:', error);
            });
    });

    function createTimezoneCard(data) {
        const card = document.createElement('div');
        card.classList.add('timezone-card');

        const cityElement = document.createElement('h3');
        cityElement.textContent = data.timezone_location;
        card.appendChild(cityElement);

        const time = document.createElement('div');
        time.classList.add('timezone-info');
        
        const icon = document.createElement('div');
        icon.classList.add('timezone-icon');
        icon.textContent = '🕒';
        time.appendChild(icon);

        const duration = document.createElement('div');
        duration.classList.add('timezone-duration');
        duration.textContent = data.datetime;
        time.appendChild(duration);

        card.appendChild(time);
        timezoneCardsContainer.appendChild(card);
    }
});
