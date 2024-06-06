from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os
from dotenv import load_dotenv
from flask_caching import Cache

load_dotenv('.env')

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# Configure Flask-Caching
app.config['CACHE_TYPE'] = 'simple'  # Consider using 'redis' or 'memcached' for production

db = SQLAlchemy(app)
cache = Cache(app)

class Book(db.Model):
    __tablename__ = 'books'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), nullable=False)
    author = db.Column(db.String(30), nullable=False)
    published_year = db.Column(db.Integer)
    genre = db.Column(db.String(50))

@cache.memoize(timeout=60)  # Cache this result for 60 seconds
def get_books_by_genre(genre):
    return Book.query.filter_by(genre=genre).all()