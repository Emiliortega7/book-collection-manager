from flask import Flask, request, jsonify
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

book_collection = {}  # Changed from 'books' for clarity

# Utility Functions
def does_book_exist(book_id):
    return book_id in book_collection

def add_book(book_id, book_details):
    book_collection[book_id] = book_details

def update_book_details(book_id, new_details):
    book_collection[book_id].update(new_details)

def remove_book(book_id):
    del book_collection[book_id]

def search_books_by_title(title_query):
    return [book for book in book_collection.values() if book.get('title', '').lower() == title_query.lower()]

# Route Handlers
@app.route('/books/<book_id>', methods=['GET'])
def get_book_details(book_id):
    if does_book_exist(book_id):
        return jsonify(book_collection[book_id]), 200
    else:
        return jsonify({"error": "Book not found"}), 404

@app.route('/books', methods=['POST'])
def create_book():
    book_details = request.json
    book_id = book_details.get('id')
    
    if does_book_exist(book_id):
        return jsonify({"error": "Book already exists"}), 400
    
    add_book(book_id, book_details)
    return jsonify({"message": "Book added successfully."}), 201

@app.route('/books/<book_id>', methods=['PUT'])
def modify_book(book_id):
    if does_book_exist(book_id):
        new_details = request.json
        update_book_details(book_id, new_details)
        return jsonify({"message": "Book updated successfully."}), 200
    else:
        return jsonify({"error": "Book not found"}), 404

@app.route('/books/<book_id>', methods=['DELETE'])
def delete_book_entry(book_id):
    if does_book_exist(book_id):
        remove_book(book_id)
        return jsonify({"message": "Book deleted successfully."}), 200
    else:
        return jsonify({"error": "Book not found"}), 404

@app.route('/books/search', methods=['GET'])
def find_books():
    query_title = request.args.get('title', '') 
    matching_books = search_books_by_title(query_title)

    if matching_books:
        return jsonify(matching_books), 200
    else:
        return jsonify({"error": "No books found matching the search criteria"}), 404

if __name__ == '__main__':
    port = os.getenv('FLASK_PORT', 5000)
    app.run(host='0.0.0.0', port=int(port))