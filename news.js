document.addEventListener('DOMContentLoaded', () => {
    const newsContainer = document.getElementById('newsContainer');
    const newsSearchForm = document.getElementById('newsSearchForm');
    const newsSearchInput = document.getElementById('newsSearch');
    let page = 1;
    const pageSize = 12;
    let query = 'travel';
    let loading = false;

    function fetchNews(query, page) {
        loading = true;
        fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=c63a21b8b9904658aa346bc85f639417&page=${page}&pageSize=${pageSize}`)
            .then(response => response.json())
            .then(data => {
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
                    loading = false;
                } else {
                    newsContainer.textContent = 'Failed to fetch news articles.';
                    loading = false;
                }
            })
            .catch(error => {
                newsContainer.textContent = 'Error fetching news articles: ' + error;
                loading = false;
            });
    }

    // Initial fetch of travel news
    fetchNews(query, page);

    // Handle news search form submission
    newsSearchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        query = newsSearchInput.value.trim();
        if (query) {
            page = 1;
            newsContainer.innerHTML = ''; // Clear previous results
            fetchNews(query, page);
        }
    });

    // Infinite scroll
    window.addEventListener('scroll', () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !loading) {
            page++;
            fetchNews(query, page);
        }
    });
});
