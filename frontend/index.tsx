// Debounce function example
function debounce(fn: Function, delay: number) {
  let timeoutID: number | null = null;
  return function (...args: any) {
    if (timeoutID) {
      clearTimeout(timeoutID);
    }
    timeoutID = window.setTimeout(() => fn(...args), delay);
  };
}
```

```typescript
// Throttle function example
function throttle(fn: Function, limit: number) {
  let inThrottle: boolean;
  return function (...args: any) {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
```

```typescript
// Basic Caching Example
const cache = {};

function getCachedData(url: string) {
  if (cache[url]) {
    return Promise.resolve(cache[url]);
  } else {
    return fetch(url).then(response => response.json()).then(data => {
      cache[url] = data;
      return data;
    });
  }
}
```

```typescript
import React, { useState, useEffect } from 'react';

const useDebouncedEffect = (fn: () => void, delay: number, deps: any[]) => {
  useEffect(() => {
    const handler = setTimeout(() => fn(), delay);

    return () => clearTimeout(handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, delay]);
};

const SearchBooks = () => {
  const [query, setQuery] = useState('');

  useDebouncedEffect(() => {
    // Assume fetchBooks is a function that fetches books from an API
    fetchBooks(query).then(books => console.log(books));
  }, 500, [query]);

  return (
    <input
      type="text"
      value={query}
      onChange={e => setQuery(e.target value)}
      placeholder="Search books..."
    />
  );
};