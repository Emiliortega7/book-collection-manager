import React, { useState, useEffect } from 'react';

interface Book {
  id: number;
  title: string;
  author: string;
}

const BookList: React.FC<{ books: Book[] }> = ({ books }) => (
  <div>
    {books.map((book) => (
      <div key={book.id}>
        {book.title} by {book.author}
      </div>
    ))}
  </div>
);

const AddBookForm: React.FC<{ onAddBook: (bookDetails: Omit<Book, 'id'>) => void, onError: (error: string) => void }> = ({ onAddBook, onError }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      onAddBook({ title, author });
      setTitle('');
      setAuthor('');
    } catch (error) {
      onError('Failed to add book. Please try again.');
      console.error('Add book error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
      <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author" required />
      <button type="submit">Add Book</button>
    </form>
  );
};

const BookCollectionManager: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      // Imagine this could be fetching data from an API and hence can fail
      const initialBooks: Book[] = [
        { id: 1, title: 'Book One', author: 'Author One' },
        { id: 2, title: 'Book Two', author: 'Author Two' },
      ];
      setBooks(initialBooks);
    } catch (error) {
      setError('Failed to load book data.');
      console.error('Load initial books error:', error);
    }
  }, []);

  const addBook = (bookDetails: Omit<Book, 'id'>) => {
    try {
      const newBookId = new Date().getTime(); // A simplistic approach to generate a unique ID
      const newBookWithId: Book = { id: newBookId, ...bookDetails };
      setBooks([...books, newBookWithId]);
    } catch (error) {
    setError('Failed to add a new book.');
    console.error('Add book error:', error);
    }
  };

  return (
    <div>
      <h1>Manage Your Book Collection</h1>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <BookList books={books} />
      <AddBookForm onAddBook={addBook} onError={setError} />
    </div>
  );
};

export default BookCollectionManager;