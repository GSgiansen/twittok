# Generate sentiment analysis for a given text
# to run, first run source pyenv/bin/activate in the home directory
# to stop runnning run pyenv/bin/deactivate

import nltk
from nltk.sentiment import SentimentIntensityAnalyzer
import ssl

try:
    _create_unverified_https_context = ssl._create_unverified_context
except AttributeError:
    pass
else:
    ssl._create_default_https_context = _create_unverified_https_context

nltk.download('vader_lexicon')
sid = SentimentIntensityAnalyzer()

def sentiment_analysis(text):
    scores = sid.polarity_scores(text)
    return scores

def test():
    text = "this app is disgusting."
    print(sentiment_analysis(text))

test()