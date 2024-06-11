from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
import os
from dotenv import load_dotenv
from flask_caching import Cache

load_dotenv('.env')

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Configure caching for the application
app.config['CACHE_TYPE'] = 'simple'  # For production use, consider 'redis' or 'memcached'

db = SQLAlchemy(app)
cache_service = Cache(app)  # Renamed for clarity

class Book(db.Model):
    __tablename__ = 'books'
    book_id = db.Column(db.Integer, primary_key=True)  # Changed for clarity
    title = db.Column(db.String(80), nullable=False)
    author = db.Column(db.String(30), nullable=False)
    published_year = db.Column(db.Integer)
    genre = db.Column(db.String(50))

@app.errorhandler(404)
def not_found_error_handler(error):
    return jsonify(error=str(error)), 404

@app.errorhandler(500)
def internal_server_error_handler(error):
    return jsonify(error=str(error)), 500

@cache_service.memoize(timeout=60)  # Cache the result for 60 seconds
def fetch_books_by_genre(genre):
    """Fetches books by their genre from the database."""
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
    db.create_all()  # Create database tables based on models if they do not exist.
    app.run(debug=True)