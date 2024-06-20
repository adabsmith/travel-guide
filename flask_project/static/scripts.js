document.getElementById('countryForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const country = document.getElementById('country').value;
    fetchSafetyInfo(country);
});

function fetchSafetyInfo(country) {
    fetch(`/api/safety-info?country=${country}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('weatherInfo').innerHTML = `<p>${data.weather}</p>`;
            document.getElementById('newsInfo').innerHTML = data.news.map(news => `<p>${news}</p>`).join('');
            
            // Determine the background color based on positivity or negativity
            const weatherCard = document.getElementById('weatherCard');
            const newsCard = document.getElementById('newsCard');
            
            // Set weather card color
            if (data.is_good_weather) {
                weatherCard.style.background = 'linear-gradient(to right, #56ab2f, #a8e063)'; // Green
            } else {
                weatherCard.style.background = 'linear-gradient(to right, #e53935, #e35d5b)'; // Red
            }
            
            // Set news card color
            if (data.is_negative_news) {
                newsCard.style.background = 'linear-gradient(to right, #e53935, #e35d5b)'; // Red
            } else {
                newsCard.style.background = 'linear-gradient(to right, #56ab2f, #a8e063)'; // Green
            }

            // Show the results section
            document.getElementById('results').style.display = 'flex';
        })
        .catch(error => console.error('Error fetching safety info:', error));
}
