from flask import Flask

from flask_cors import CORS

from signup import app as signup_app
from vehical import app as vehicle_app
from login import app as login_app 
from forgotpassword import app as forgot_app
from soft_delete import app as soft_delete_app

app = Flask(__name__)
CORS(app)
app.register_blueprint(signup_app)
app.register_blueprint(vehicle_app)
app.register_blueprint(login_app)
app.register_blueprint(forgot_app)
app.register_blueprint(soft_delete_app)

if __name__ == '__main__':
    app.run(debug=True,port=5001)
