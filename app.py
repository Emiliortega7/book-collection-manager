from flask import Flask, request, jsonify
from flask_caching import Cache
import asyncio
import aiohttp

app = Flask(__name__)
cache = Cache(app, config={'CACHE_TYPE': 'simple'})

def call_external_api_with_batch(data_list):
    return []

def process_batch_response(batched_response):
    return batched_response

def batch_api_calls(data_list):
    try:
        batched_response = call_external_api_with_batch(data_list)
        return process_batch_response(batched_response)
    except Exception as e:
        print(f"Error calling external API in batch: {e}")
        return []

@app.route('/some-data')
@cache.cached(timeout=50)
def get_some_data():
    try:
        result = expensive_api_call()
        return result
    except Exception as e:
        return jsonify(error=str(e)), 500

def expensive_api_call():
    try:
        return 'Data from API'
    except Exception as e:
        raise Exception(f"Failed to retrieve data from the expensive API: {e}")

async def fetch(session, url):
    try:
        async with session.get(url) as response:
            return await response.json()
    except Exception as e:
        return {"error": f"Failed to fetch URL {url}: {str(e)}"}

async def fetch_all(urls):
    try:
        async with aiohttp.ClientSession() as session:
            tasks = [fetch(session, url) for url in urls]
            return await asyncio.gather(*tasks)
    except Exception as e:
        print(f"Error fetching data from URLs: {e}")
        return []

@app.route('/fetch-data')
def get_data():
    urls = ["http://example.com/api1", "http://example.com/api2"]
    try:
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        results = loop.run_until_complete(fetch_all(urls))
        return jsonify(results)
    except Exception as e:
        return jsonify(error=str(e)), 500

BOOK_DATABASE = [
    {"id": 1, "title": "The Great Gatsby", "author": "F. Scott Fitzgerald"},
    {"id": 2, "title": "Moby Dick", "author": "Herman Melville"},
]

def search_in_database(title):
    try:
        return [book for book in BOOK_DATABASE if title.lower() in book["title"].lower()]
    except Exception as e:
        print(f"Error searching the database: {e}")
        return []

@app.route('/search')
@cache.cached(timeout=100, key_prefix='search_book')
def search_book_by_title():
    title = request.args.get('title', '')
    if not title:
        return "Please provide a book title.", 400
    try:
        results = search_in_database(title)
        if results:
            return jsonify({"success": True, "books": results}), 200
        else:
            return jsonify({"success": False, "message": "No books found."}), 404
    except Exception as e:
        return jsonify(error=str(e)), 500

if __name__ == "__main__":
    app.run(debug=True)