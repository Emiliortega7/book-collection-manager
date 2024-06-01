from flask import Flask, request, jsonify
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

books = {}

# Utility Functions
def book_exists(book_id):
    return book_id in books

def add_book_to_collection(book_id, data):
    books[book_id] = data

def update_book_in_collection(book_id, data):
    books[book_id].update(data)

def delete_book_from_collection(book_id):
    del books[book_id]

def find_books_by_title(title_query):
    return [book for book in books.values() if book.get('title', '').lower() == title_query.lower()]

# Route Handlers
@app.route('/books/<book_id>', methods=['GET'])
def get_book(book_id):
    if book_exists(book_id):
        return jsonify(books[book_id]), 200
    else:
        return jsonify({"error": "Book not found"}), 404

@app.route('/books', methods=['POST'])
def add_book():
    data = request.json
    book_id = data.get('id')
    
    if book_exists(book_id):
        return jsonify({"error": "Book already exists"}), 400
    
    add_book_to_collection(book_id, data)
    return jsonify({"message": "Book added successfully."}), 201

@app.route('/books/<book_id>', methods=['PUT'])
def update_book(book_id):
    if book_exists(book_id):
        data = request.json
        update_book_in_collection(book_id, data)
        return jsonify({"message": "Book updated successfully."}), 200
    else:
        return jsonify({"error": "Book not found"}), 404

@app.route('/books/<book_id>', methods=['DELETE'])
def delete_book(book_id):
    if book_exists(book_id):
        delete_book_from_collection(book_id)
        return jsonify({"message": "Book deleted successfully."}), 200
    else:
        return jsonify({"error": "Book not found"}), 404

@app.route('/books/search', methods=['GET'])
def search_books():
    query_title = request.args.get('title', '') 
    matching_books = find_books_by_title(query_title)

    if matching_books:
        return jsonify(matching_books), 200
    else:
        return jsonify({"error": "No books found matching the search criteria"}), 404

if __name__ == '__main__':
    port = os.getenv('FLASK_PORT', 5000)
    app.run(host='0.0.0.0', port=int(port))