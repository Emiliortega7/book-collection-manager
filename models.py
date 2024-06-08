from flask import Flask, jsonify
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


@app.errorhandler(404)
def resource_not_found(e):
    return jsonify(error=str(e)), 404


@app.errorhandler(500)
def internal_error(e):
    return jsonify(error=str(e)), 500


@cache.memoize(timeout=60)  # Cache this result for 60 seconds
def get_books_by_genre(genre):
    try:
        books = Book.query.filter_by(genre=genre).all()
        if books:
            return books
        else:
            return "No books found for the specified genre.", 404
    except Exception as e:
        app.logger.error('Error fetching books by genre: %s', e)
        return f"An error occurred while processing your request: {str(e)}", 500


if __name__ == '__main__':
    db.create_all()  # Creates all tables according to the defined models, if they don't exist.
    app.run(debug=True)