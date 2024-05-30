document.addEventListener('DOMContentLoaded', () => {
    const newsContainer = document.getElementById('newsContainer');
    const newsSearchForm = document.getElementById('newsSearchForm');
    const newsSearchInput = document.getElementById('newsSearch');

    function fetchNews(query = 'travel') {
        fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=c63a21b8b9904658aa346bc85f639417`)
            .then(response => response.json())
            .then(data => {
                newsContainer.innerHTML = ''; // Clear previous results
                if (data.status === 'ok') {
                    const articles = data.articles;
                    articles.forEach(article => {
                        const articleElement = document.createElement('div');
                        articleElement.classList.add('news-card');

                        const title = document.createElement('h3');
                        title.textContent = article.title;
                        articleElement.appendChild(title);

                        if (article.urlToImage) {
                            const image = document.createElement('img');
                            image.src = article.urlToImage;
                            image.alt = article.title;
                            articleElement.appendChild(image);
                        }

                        const description = document.createElement('p');
                        description.textContent = article.description;
                        articleElement.appendChild(description);

                        const link = document.createElement('a');
                        link.href = article.url;
                        link.textContent = 'Read more';
                        link.target = '_blank';
                        articleElement.appendChild(link);

                        newsContainer.appendChild(articleElement);
                    });
                } else {
                    newsContainer.textContent = 'Failed to fetch news articles.';
                }
            })
            .catch(error => {
                newsContainer.textContent = 'Error fetching news articles: ' + error;
            });
    }

    // Initial fetch of travel news
    fetchNews();

    // Handle news search form submission
    newsSearchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const query = newsSearchInput.value.trim();
        if (query) {
            fetchNews(query);
        }
    });
});
