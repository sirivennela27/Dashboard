from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash
from conndb import get_conn

app = Blueprint('signup_app', __name__)

@app.post('/api/signup')
def signup():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    email=data.get('email')
    if not username or not password or not email:
        return jsonify({'message': 'Username,password and email required'}), 400

    hashed_password = generate_password_hash(password)

    conn = get_conn()
    cursor = conn.cursor()

    # Check if user already exists
    existing_user = cursor.execute("SELECT * FROM users WHERE username = ?", (username,)).fetchall()
    if existing_user:
        conn.close()
        return jsonify({'message': 'User already exists'}), 409

    
    cursor.execute("INSERT INTO users (username, password,email) VALUES (?, ?,?)", (username, hashed_password,email))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Signup successful','username': username,'success':True}), 201
