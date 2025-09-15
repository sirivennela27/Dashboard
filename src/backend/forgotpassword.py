from flask import Blueprint, request, jsonify
from datetime import datetime, timedelta
from conndb import get_conn
import uuid


from werkzeug.security import generate_password_hash

app = Blueprint('forgot_app', __name__)

@app.post('/api/forgot-password')
def forgot_password():
    data = request.get_json()
    email = data.get('email')

    if not email:
        return jsonify({'message': 'Email is required'}), 400

    conn = get_conn()
    cursor = conn.cursor()

    user = cursor.execute("SELECT * FROM users WHERE email = ?", (email,)).fetchone()
    if not user:
        conn.close()
        return jsonify({"message": 'Email not found'}), 404

    reset_token = str(uuid.uuid4())
    expiry_time = datetime.now() + timedelta(hours=1)

    cursor.execute(
        '''INSERT INTO reset_token (email, token, expiry) VALUES (?, ?, ?)''',
        (email, reset_token, expiry_time)
    )

    conn.commit()
    conn.close()

    print(f"Reset link: http://localhost:5173/reset-password?token={reset_token}")
    return jsonify({'message': 'Password reset link sent to the email'}), 200 



@app.post('/api/reset-password')
def reset_password():
    data = request.get_json()
    token = data.get('token')
    new_password = data.get('new_password')

    if not token or not new_password:
        return jsonify({'message': 'Token and new password required'}), 400

    conn = get_conn()
    cursor = conn.cursor()

    row = cursor.execute("SELECT email, expiry FROM reset_token WHERE token = ?", (token,)).fetchone()
    if not row:
        conn.close()
        return jsonify({'message': 'Invalid token'}), 404

    email, expiry = row
    if datetime.now() > datetime.fromisoformat(expiry):
        conn.close()
        return jsonify({'message': 'Token expired'}), 403

    hashed_password = generate_password_hash(new_password)
    cursor.execute("UPDATE users SET password = ? WHERE email = ?", (hashed_password, email))
    cursor.execute("DELETE FROM reset_token WHERE token = ?", (token,))

    conn.commit()
    conn.close()

    return jsonify({'message': 'Password reset successful'}), 200

