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

const AddBookForm: React.FC<{ onAdd: (book: Omit<Book, 'id'>) => void }> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ title, author });
    setTitle('');
    setAuthor('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
      <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author" required />
      <button type="submit">Add Book</button>
    </form>
  );
};

const BookManager: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    // Simulate fetching the initial books list
    const initialBooks: Book[] = [
      { id: 1, title: 'Book One', author: 'Author One' },
      { id: 2, title: 'Book Two', author: 'Author Two' },
    ];
    setBooks(initialBooks);
  }, []);

  const addBook = (bookData: Omit<Book, 'id'>) => {
    const newBook: Book = { id: Math.random(), ...bookData }; // Simple id generation for example
    setBooks([...books, newBook]);
  };

  const updateBook = (id: number, updatedBook: Omit<Book, 'id'>) => {
    setBooks(books.map((book) => (book.id === id ? { ...book, ...updatedBook } : book)));
  };

  // Environment variables usage example
  // console.log(process.env.REACT_APP_API_URL);

  return (
    <div>
      <h1>Book Collection Manager</h1>
      <BookList books={books} />
      <AddBookForm onAdd={addBook} />
    </div>
  );
};

export default BookManager;