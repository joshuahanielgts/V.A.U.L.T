import streamlit as st
from transformers import AutoTokenizer, AutoModelForSequenceClassification
from newspaper import Article

# Model and tokenizer
model_name = "mrm8488/distilroberta-finetuned-financial-news-sentiment-analysis"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(model_name)

# Setting the page title
st.title("Financial News Sentiment Analysis")

# Input option: Text or URL
input_option = st.radio("Choose input type:", ["Text Input", "URL Input"])

if input_option == "Text Input":
    text_input = st.text_area("Enter Financial News:", "DEMO : Tesla stock is soaring after record-breaking earnings.")
else:
    url_input = st.text_input("Enter URL to scrape headline:")
    if url_input:
        try:
            # Scrape the headline from the URL
            article = Article(url_input)
            article.download()
            article.parse()
            text_input = article.title  # Use the article's title as the headline
            st.success(f"Scraped Headline: {text_input}")
        except Exception as e:
            st.error(f"Failed to extract headline: {e}")
            text_input = ""

# Function to perform sentiment analysis
def predict_sentiment(text):
    inputs = tokenizer(text, return_tensors="pt", max_length=512, truncation=True)
    outputs = model(**inputs)
    sentiment_class = outputs.logits.argmax(dim=1).item()
    sentiment_mapping = {0: 'Negative', 1: 'Neutral', 2: 'Positive'}
    predicted_sentiment = sentiment_mapping.get(sentiment_class, 'Unknown')
    return predicted_sentiment, outputs.logits.softmax(dim=1)[0].tolist()

# Button to trigger sentiment analysis
if st.button("Analyze Sentiment"):
    # Checking if the input text is not empty
    if text_input and text_input.strip():
        # Showing loading spinner while processing
        with st.spinner("Analyzing sentiment..."):
            sentiment, confidence_scores = predict_sentiment(text_input)

            # Considering a threshold for sentiment prediction
            threshold = 0.5

            # Changing the success message background color based on sentiment and threshold
            if sentiment == 'Positive' and confidence_scores[2] > threshold:
                st.success(f"Sentiment: {sentiment} (Confidence: {confidence_scores[2]:.3f})")
            elif sentiment == 'Negative' and confidence_scores[0] > threshold:
                st.error(f"Sentiment: {sentiment} (Confidence: {confidence_scores[0]:.3f})")
            elif sentiment == 'Neutral' and confidence_scores[1] > threshold:
                st.info(f"Sentiment: {sentiment} (Confidence: {confidence_scores[1]:.3f})")
            else:
                st.warning("Low confidence, or sentiment not above threshold. Please try again.")
    else:
        st.warning("Please enter some valid text for sentiment analysis.")

# Optional: Displaying the raw sentiment scores
if st.checkbox("Show Raw Sentiment Scores"):
    if text_input and text_input.strip():
        _, raw_scores = predict_sentiment(text_input)
        st.info(f"Raw Sentiment Scores: \n Negative : {raw_scores[0]} \n Positive : {raw_scores[2]} \n Neutral : {raw_scores[1]}")