document.addEventListener('DOMContentLoaded', () => {
    const timezoneCardsContainer = document.getElementById('timezoneCardsContainer');
    const timezoneForm = document.getElementById('timezoneForm');
    const result = document.getElementById('timezoneResult');

    const apiKey = 'AIzaSyALIaDk3khAzSyl7j9FPo3OOU_JsQoiMlQ'; // Replace with your actual Google API key

    // Pre-defined major cities
    const majorCities = ['London', 'Tokyo', 'Sydney'];
    majorCities.forEach(city => {
        console.log(`Fetching time data for predefined city: ${city}`);
        fetchGeocodingData(city)
            .then(location => fetchTimeZoneData(location))
            .then(data => {
                createTimezoneCard(city, data);
            })
            .catch(error => {
                console.error(`Error fetching time data for ${city}:`, error);
            });
    });

    timezoneForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const city = 'Nigeria'

        if (!city) {
            result.textContent = 'Please enter a valid city name.';
            return;
        }

        console.log(`Fetching time data for city from form input: ${city}`);
        fetchGeocodingData(city)
            .then(location => fetchTimeZoneData(location))
            .then(data => {
                if (data.status !== 'OK') {
                    result.textContent = 'Error fetching time data. Please check the city name.';
                } else {
                    result.innerHTML = ''; // Clear previous results
                    createTimezoneCard(city, data);
                }
            })
            .catch(error => {
                result.textContent = 'Error fetching time data.';
                console.error(`Error fetching time data for ${city}:`, error);
            });
    });

    async function fetchGeocodingData(city) {
        try {
            const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(city)}&key=${apiKey}`;
            console.log(`Fetching geocoding data for ${city} with URL: ${geocodingUrl}`);
            const response = await fetch(geocodingUrl);
            const data = await response.json();
            console.log(`Geocoding data for ${city}:`, data);

            if (data.status === 'OK' && data.results.length > 0) {
                return data.results[0].geometry.location;
            } else {
                throw new Error(`Geocoding failed for ${city}`);
            }
        } catch (error) {
            console.error(`Geocoding failed for ${city}:`, error);
            throw error;
        }
    }

    async function fetchTimeZoneData(location) {
        try {
            const timestamp = Math.floor(Date.now() / 1000);
            const timeZoneUrl = `https://maps.googleapis.com/maps/api/timezone/json?location=${location.lat},${location.lng}&timestamp=${timestamp}&key=${apiKey}`;
            console.log(`Fetching time zone data for location (${location.lat}, ${location.lng}) with URL: ${timeZoneUrl}`);
            const response = await fetch(timeZoneUrl);
            const data = await response.json();
            console.log(`Time zone data for location (${location.lat}, ${location.lng}):`, data);

            return data;
        } catch (error) {
            console.error('Error fetching time zone data:', error);
            throw error;
        }
    }

    function createTimezoneCard(city, data) {
        const card = document.createElement('div');
        card.classList.add('timezone-card');

        const cityElement = document.createElement('h3');
        cityElement.textContent = city;
        card.appendChild(cityElement);

        const time = document.createElement('div');
        time.classList.add('timezone-info');
        
        const icon = document.createElement('div');
        icon.classList.add('timezone-icon');
        icon.textContent = '🕒';
        time.appendChild(icon);

        const duration = document.createElement('div');
        duration.classList.add('timezone-duration');
        const localTime = new Date((Date.now() + (data.dstOffset + data.rawOffset) * 1000)).toLocaleString();
        duration.textContent = localTime;
        time.appendChild(duration);

        card.appendChild(time);
        timezoneCardsContainer.appendChild(card);
    }
});
