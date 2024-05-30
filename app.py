from flask import Flask, request
from flask_caching import Cache
import asyncio
import aiohttp

app = Flask(__name__)
cache = Cache(app, config={'CACHE_TYPE': 'simple'})

def batch_api_calls(data_list):
    batched_response = call_external_api_with_batch(data_list)
    return process_batch_response(batched_response)

@app.route('/some-data')
@cache.cached(timeout=50)
def get_some_data():
    result = expensive_api_call()
    return result

def expensive_api_call():
    return 'Data from API'

async def fetch(session, url):
    async with session.get(url) as response:
        return await response.json()

async def fetch_all(urls):
    async with aiohttp.ClientSession() as session:
        tasks = [fetch(session, url) for url in urls]
        return await asyncio.gather(*tasks)

@app.route('/fetch-data')
def get_data():
    urls = ["http://example.com/api1", "http://example.com/api2"]
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    results = loop.run_until_complete(fetch_all(urls))
    return str(results)

BOOK_DATABASE = [
    {"id": 1, "title": "The Great Gatsby", "author": "F. Scott Fitzgerald"},
    {"id": 2, "title": "Moby Dick", "author": "Herman Melville"},
]

def search_in_database(title):
    return [book for book in BOOK_DATABASE if title.lower() in book["title"].lower()]

@app.route('/search')
@cache.cached(timeout=100, key_prefix='search_book')
def search_book_by_title():
    title = request.args.get('title', '')
    if not title:
        return "Please provide a book title.", 400
    results = search_in_database(title)
    if results:
        return {"success": True, "books": results}, 200
    else:
        return {"success": False, "message": "No books found."}, 404

if __name__ == "__main__":
    app.run(debug=True)