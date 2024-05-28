def batch_api_calls(data_list):
    batched_response = call_external_api_with_batch(data_list)
    return process_batch_response(batched_response)

from flask_caching import Cache

cache = Cache(config={'CACHE_TYPE': 'simple'})

@app.route('/some-data')
@cache.cached(timeout=50)
def get_some_data():
    result = expensive_api_call()
    return result

def expensive_api_call():
    return 'Data from API'

import asyncio
import aiohttp

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