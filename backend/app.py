from flask import Flask, request, jsonify
from flask_cors import CORS
import stripe
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)  # enable CORS for all routes

tasks = []  # In-memory task storage

@app.route("/", methods=["GET"])
def home():
    return "Flask backend is running "

# Stripe setup
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

@app.route("/tasks", methods=["GET"])
def get_tasks():
    return jsonify(tasks)

@app.route("/tasks", methods=["POST"])
def add_task():
    data = request.json
    new_task = {"id": len(tasks) + 1, "title": data["title"], "completed": False}
    tasks.append(new_task)
    return jsonify(new_task), 201

@app.route("/tasks/<int:task_id>", methods=["PUT"])
def toggle_task(task_id):
    for task in tasks:
        if task["id"] == task_id:
            task["completed"] = not task["completed"]
            return jsonify(task)
    return jsonify({"error": "Task not found"}), 404

@app.route("/tasks/<int:task_id>", methods=["DELETE"])
def delete_task(task_id):
    global tasks
    tasks = [t for t in tasks if t["id"] != task_id]
    return "", 204

@app.route("/create-checkout-session", methods=["POST"])
def create_checkout_session():
    try:
        session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            line_items=[{
                "price_data": {
                    "currency": "usd",
                    "product_data": {
                        "name": "TaskManager Premium",
                    },
                    "unit_amount": 500,  # $5.00
                },
                "quantity": 1,
            }],
            mode="payment",
            success_url="http://localhost:3000/success",
            cancel_url="http://localhost:3000/cancel",
        )
        return jsonify({"id": session.id})
    except Exception as e:
        return jsonify(error=str(e)), 400

@app.route("/webhook", methods=["POST"])
def stripe_webhook():
    payload = request.data
    sig_header = request.headers.get("Stripe-Signature")
    endpoint_secret = os.getenv("STRIPE_WEBHOOK_SECRET")

    try:
        event = stripe.Webhook.construct_event(payload, sig_header, endpoint_secret)
    except stripe.error.SignatureVerificationError:
        return "Invalid signature", 400

    if event["type"] == "checkout.session.completed":
        session = event["data"]["object"]
        print("✅ Payment successful:", session)

    return "OK", 200

if __name__ == "__main__":
    app.run(port=5000, debug=True)
