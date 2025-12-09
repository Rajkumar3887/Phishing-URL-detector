🔐 URL-Based Phishing Detector (AI + ML)

A machine learning–powered phishing URL detection system that classifies website links as safe or malicious. The model analyzes URL patterns, extracts features, and predicts threat levels in real time using a Flask API and a modern UI.

🚀 Features

🔍 Real-time URL scanning
🤖 ML models: Logistic Regression, Multinomial Naive Bayes
🧠 TF-IDF vectorizer for URL text analysis
⚠️ Threat classification: Safe / Suspicious / Phishing
🌐 Flask backend for predictions
💻 Clean UI for scanning URLs
📁 Includes trained models (phishing.pkl, vectorizer.pkl)
📂 Project Structure
project/
│── app.py
│── requirements.txt
│── static/
│── templates/
│── models/
│     ├── phishing.pkl
│     └── vectorizer.pkl
│── utils/
│── README.md

🧠 ML Model Overview
The detector is trained on thousands of URLs with features such as:
URL length
Presence of HTTPS
Digits & special characters
Suspicious keywords
Domain patterns
Tokenized URL text (TF-IDF)
Algorithms used:
Logistic Regression
Multinomial Naive Bayes

🛠️ Installation
git clone <your-repo-url>
cd project
pip install -r requirements.txt
python app.py


Visit the app at:
👉 http://127.0.0.1:5000
💡 How It Works
User enters a URL
URL is vectorized using TF-IDF
ML model predicts:
safe
malicious / phishing
Result shown with icon + risk details
🖼️ Screenshots
(Add your UI screenshots here)

📈 Future Enhancements
🔐 Deep learning model (LSTM/BERT)
🌍 Browser extension
🛡️ Live threat database integration
📊 Detailed risk dashboard

🤝 Contributing
Pull requests are welcome!
Feel free to open issues for suggestions or bug reports.

⭐ Show Some Support
If you like this project, give it a star ⭐ on GitHub!
