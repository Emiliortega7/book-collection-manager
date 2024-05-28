from flask import Flask, request, jsonify
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

books = {}

@app.route('/books/<book_id>', methods=['GET'])
def get_book(book_id):
    if book_id in books:
        return jsonify(books[book_id]), 200
    else:
        return jsonify({"error": "Book not found"}), 404

@app.route('/books', methods=['POST'])
def add_book():
    data = request.json
    book_id = data.get('id')
    if book_id in books:
        return jsonify({"error": "Book already exists"}), 400
    books[book_id] = data
    return jsonify({"message": "Book added successfully."}), 201

@app.route('/books/<book_id>', methods=['PUT'])
def update_book(book_id):
    if book_id in books:
        data = request.json
        books[book_id].update(data)
        return jsonify({"message": "Book updated successfully."}), 200
    else:
        return jsonify({"error": "Book not found"}), 404

@app.route('/books/<book_id>', methods=['DELETE'])
def delete_book(book_id):
    if book_id in books:
        del books[book_id]
        return jsonify({"message": "Book deleted successfully."}), 200
    else:
        return jsonify({"error": "Book not found"}), 404

if __name__ == '__main__':
    port = os.getenv('FLASK_PORT', 5000)
    app.run(host='0.0.0.0', port=int(port))