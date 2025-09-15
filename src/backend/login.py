from flask import Blueprint, request, jsonify
from werkzeug.security import check_password_hash
from conndb import get_conn

app = Blueprint('login_app', __name__)

@app.post('/api/login')
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    conn = get_conn()
    user = conn.execute("SELECT * FROM users WHERE username=?", (username,)).fetchone()
    conn.close()

    if user and check_password_hash(user["password"], password):
        return jsonify({"message": "Login successful"}), 200
       
    else:
        return jsonify({"message": "Invalid credentials"}), 401
