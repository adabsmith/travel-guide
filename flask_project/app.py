from flask import Flask, request, jsonify, render_template
import requests
import nltk
from nltk.sentiment import SentimentIntensityAnalyzer

nltk.download('vader_lexicon')

app = Flask(__name__)

WEATHER_API_KEY = 'f1b4891bcb14f1eb1711ca8f54a6ce99'
NEWS_API_KEY = 'c63a21b8b9904658aa346bc85f639417'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/safety-info')
def get_safety_info():
    country = request.args.get('country')
    weather, is_good_weather = get_weather_info(country)
    news, is_negative_news = get_news_info(country)
    return jsonify({'weather': weather, 'is_good_weather': is_good_weather, 'news': news, 'is_negative_news': is_negative_news})

def get_weather_info(country):
    url = f"http://api.openweathermap.org/data/2.5/weather?q={country}&appid={WEATHER_API_KEY}"
    response = requests.get(url)
    data = response.json()
    temp_celsius = data['main']['temp'] - 273.15  # Convert from Kelvin to Celsius
    weather_description = data['weather'][0]['description'].lower()

    # List of good weather conditions
    good_weather_conditions = ['clear sky', 'few clouds', 'scattered clouds', 'broken clouds', 'light rain']

    is_good_weather = any(condition in weather_description for condition in good_weather_conditions)
    
    weather_info = f"Weather in {country}: {weather_description}, temperature: {temp_celsius:.2f}°C"
    return weather_info, is_good_weather

def get_news_info(country):
    url = f"https://newsapi.org/v2/top-headlines?q={country}&apiKey={NEWS_API_KEY}"
    response = requests.get(url)
    data = response.json()
    articles = [article['title'] for article in data['articles']]
    
    sia = SentimentIntensityAnalyzer()
    sentiment_scores = [sia.polarity_scores(article)['compound'] for article in articles]
    
    negative_threshold = -0.1
    is_negative = any(score <= negative_threshold for score in sentiment_scores)
    
    return articles, is_negative

if __name__ == '__main__':
    app.run(debug=True)
