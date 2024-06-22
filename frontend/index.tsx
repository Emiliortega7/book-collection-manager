interface Cache {
  [key: string]: any;
}

const cache: Cache = {};

async function getCachedData(url: string) {
  if (cache[url]) {
    console.log("Returning cached data for URL:", url); // Helpful for debugging
    return Promise.resolve(cache[url]);
  } else {
    const response = await fetch(url);
    const data = await response.json();
    cache[url] = data; // Cache the newly fetched data
    return data;
  }
}

import React, { useState, useEffect } from 'react';

const useDebouncedEffect = (fn: () => void, delay: number, deps: any[]) => {
  useEffect(() => {
    const handler = setTimeout(() => fn(), delay);

    return () => clearTimeout(handler);
  }, [...deps, delay]); 
};

const SearchBooks = () => {
  const [query, setQuery] = useState('');

  useDebouncedEffect(() => {
    if (!query.trim()) return;

    getCachedData('https://api.example.com/books?search=' + query)
      .then(books => console.log(books))
      .catch(error => console.error("Failed to fetch books:", error)); // Always good to handle potential errors
  }, 500, [query]);

  return (
    <input
      type="text"
      value={query}
      onChange={e => setQuery(e.target.value)}
      placeholder="Search books..."
    />
  );
};

export default SearchAAABooks;