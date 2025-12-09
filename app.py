from flask import Flask, render_template, request, jsonify
import pickle

app = Flask(__name__)

# --- LOAD MODELS ---
print("Loading models...")
try:
    vector = pickle.load(open("vectorizer.pkl", "rb"))
    model = pickle.load(open("phishing.pkl", "rb"))
    print("Models loaded successfully!")
except Exception as e:
    print(f"ERROR LOADING MODELS: {e}")

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/scan", methods=["POST"])
def scan():
    data = request.get_json()
    url = data['url']

    print(f"\n--- NEW SCAN ---")
    print(f"Input URL: {url}")

    try:
        # --- UPDATED LOGIC: ONLY HTTPS IS SAFE ---
        # We now ONLY check for "https". "www" will fall through to the model.
        if url.startswith("https"):
            print("Force Safe: URL contains https.")
            status = "safe"
            title = "SAFE WEBSITE"
            msg = "Verified Secure Protocol (HTTPS)"
            icon = '<i class="fas fa-check-circle" style="color: #3DFF3D;"></i>'
            prediction_label = "Hardcoded Safe"
            
        else:
            # --- MODEL LOGIC ---
            # Any URL that does NOT start with 'https' comes here.
            obj = vector.transform([url])
            prediction = model.predict(obj)[0]
            prediction_label = str(prediction)
            
            print(f"Model Prediction: '{prediction}'") 

            if prediction == 'bad' or prediction == 'phishing' or prediction == 1:
                status = "danger"
                title = "THREAT DETECTED"
                msg = f"Model flagged this as: {prediction}"
                icon = '<i class="fas fa-exclamation-triangle" style="color: #ff0000;"></i>'
            else:
                status = "safe"
                title = "SAFE WEBSITE"
                msg = f"Model believes this is: {prediction}"
                icon = '<i class="fas fa-check-circle" style="color: #3DFF3D;"></i>'

        response = {
            "status": status,
            "title": title,
            "message": msg,
            "icon": icon,
            "details": {
                "Prediction Source": prediction_label,
                "URL Length": len(url)
            }
        }

    except Exception as e:
        print(f"ERROR DURING PREDICTION: {e}")
        response = {
            "status": "warning",
            "title": "ERROR",
            "message": "Could not scan URL.",
            "icon": '<i class="fas fa-bug" style="color: orange;"></i>',
            "details": {"Error": str(e)}
        }

    return jsonify(response)

if __name__ == "__main__":
    app.run(debug=True)