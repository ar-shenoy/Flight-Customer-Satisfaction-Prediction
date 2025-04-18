from flask import Flask, request, jsonify
import joblib
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  

model = joblib.load("models/flight_preds.pkl") 

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    
    if not data or "features" not in data:
        return jsonify({"error": "Invalid input"}), 400
    
    try:
        features = np.array(data["features"]).reshape(1, -1)
        prediction = model.predict(features)[0]
        return jsonify({"prediction": "Satisfied" if prediction == 1 else "Dissatisfied"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
