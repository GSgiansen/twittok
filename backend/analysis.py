# Generate sentiment analysis for a given text
# to run, first run source pyenv/bin/activate in the home directory
# to stop runnning run pyenv/bin/deactivate

from flask import Flask
import nltk
from nltk.sentiment import SentimentIntensityAnalyzer
import ssl

app = Flask(__name__)

try:
    _create_unverified_https_context = ssl._create_unverified_context
except AttributeError:
    pass
else:
    ssl._create_default_https_context = _create_unverified_https_context

nltk.download('vader_lexicon')
sid = SentimentIntensityAnalyzer()

@app.route('/analysis/<text>')
def sentiment_analysis(text):
    scores = sid.polarity_scores(text)
    return scores['compound'] # compound score is the overall sentiment

if __name__ == '__main__':
    app.run()