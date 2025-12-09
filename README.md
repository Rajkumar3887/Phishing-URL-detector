***

# AI-Based Phishing Email Detector

**A smart, presentation-ready Flask web application that detects phishing, spam, and malicious email content using advanced NLP + Machine Learning.**  
Built with Python, Flask, scikit-learn, TF-IDF vectorization, and a custom-trained classifier pipeline. Designed for easy local testing, demonstration, and deployment.

***

## 🖼️ Screenshots

Below are sample UI previews of the application in action.

### 🔹 Screenshot 1 — Home Page
![Home Page](static/screenshots/screenshot1.png)

### 🔹 Screenshot 2 — Detection Result Output
![Result Output](static/screenshots/screenshot2.png)

### 🔹 Screenshot 3 — Detection Result Output
![Result Output](static/screenshots/screenshot3.png)

***

## AI Model Highlights

### 🚀 AI Model Overview

This project uses a robust machine learning pipeline built using advanced Natural Language Processing (NLP) techniques to detect phishing, scam, and spam patterns—even sophisticated social-engineering attacks.

The model analyzes text using:

- **TF-IDF Vectorization**: Learns important keywords, term frequency patterns, and context.  
- **Custom NLP Feature Extraction**: Identifies suspicious words such as *verify, urgent, account, alert*, financial scam keywords, and embedded URLs.  
- **Optimized Classifier Pipeline**: Uses Logistic Regression and complementary models with tuned hyperparameters, balanced classes, and calibrated probability scores.

### 🎯 Model Performance (Test Summary)

- Accuracy: ~96–98%  
- High Precision: Prevents false phishing alerts  
- High Recall: Detects hidden and cleverly written phishing attempts  
- ROC AUC: ~0.97–0.99  

Model performance is comparable to entry-level industry spam/phishing filters found in common email systems.

### 🧠 What Makes This Model Special?

- **Explainability Layer** highlights suspicious words, URLs, and patterns found in the message.  
- **Phishing Probability Score** gives detailed confidence levels (e.g., *“Phishing Probability: 92% — High Risk”*).  
- **Supports Any Message Type** including emails, SMS, WhatsApp messages, fake OTPs, job scams, bank alerts, and social media scam texts.  
- **Fast, Lightweight, No GPU Needed** — runs instantly on laptops.  
- **Ideal for Projects & Real Use** — perfect for cybersecurity demos, college projects, and portfolio showcases.

***

## Quick Demo (Local Setup)

1. Clone the repository and enter the directory.
2. Create and activate a virtual environment:

```bash
python -m venv venv
# Windows (PowerShell)
.\venv\Scripts\Activate
# macOS / Linux
source venv/bin/activate
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Run the Flask application:

```bash
python app.py
```

5. Open the browser and visit:  
**http://127.0.0.1:5000**

***

## Project Structure (Key Files)

```
Phishing_Email_Detector/
├─ app.py                     # Flask web application
├─ train_model.py             # Script to retrain / improve model
├─ phishing_model.joblib      # Trained ML model
├─ vectorizer.joblib          # TF-IDF vectorizer
├─ requirements.txt           # Dependencies
├─ README.md                  # Project documentation
├─ templates/
│  ├─ index.html              # Input page UI
│  └─ result.html             # Output/result display
├─ static/
│  └─ screenshots/
│     ├─ screenshot1.png      # Added screenshot 1
│     ├─ screenshot2.png      # Added screenshot 2
│     └─ screenshot3.png      # Added screenshot 3
│  └─ CSS/
│     └─ style.css            # Custom UI theme
└─ logs/
   └─ predictions.csv         # Saved predictions (optional)
```

***

## Retraining or Improving the Model

To retrain:

```bash
python train_model.py
```

- Saves the updated model as `phishing_model.joblib`.  
- If any pickling issues occur, save the vectorizer and model separately.  
- Make sure both model files remain in the project root for Flask to load them.

***

## How the Web App Works (Brief)

- `index.html` — user enters email/message text.  
- Sends the text to `/predict` in `app.py`.  
- The message is cleaned, vectorized, and passed to the ML model.  
- Output shows:
  - Phishing or Legitimate status  
  - Probability score  
  - Highlighted suspicious keywords  
  - Extracted URLs  
- Optionally logs results in `logs/predictions.csv`.

***

## Deployment Options

Supports easy deployment on:

- **Render**
- **Railway**
- **Vercel (via serverless)**
- **Heroku (if enabled)**

For deployment, include a **Procfile**:

```
web: gunicorn app:app
```

Push to GitHub, connect to the platform, and deploy.

***

## Tips & Troubleshooting

- Add `venv/` to `.gitignore`.  
- Ensure CSS file is correctly linked:

```html
<link rel="stylesheet" href="{{ url_for('static', filename='CSS/style.css') }}">
```

- Avoid lambdas in models to prevent pickling issues.  
- Exclude model files if you want private models on GitHub.

***

## Usage Examples (Test Inputs)

### Phishing Example

```
Subject: Alert! Unusual Login Attempt

Your account will be locked. Verify your identity immediately:
http://secure-auth-user.com/login
```

### Legitimate Example

```
Subject: Meeting Reminder

This is a reminder for tomorrow's project discussion at 11 AM.
```

***

## Credits & License

**Developed by Raj**  
A portfolio-ready cybersecurity and machine learning project.

***
