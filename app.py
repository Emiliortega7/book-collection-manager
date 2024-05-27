from flask import Flask
from dotenv import load_dotenv
import os
load_dotenv()
app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
from routes import *
if __name__ == '__main__':
    port = os.getenv('PORT', 5000)
    app.run(host='0.0.0.0', port=port, debug=True)