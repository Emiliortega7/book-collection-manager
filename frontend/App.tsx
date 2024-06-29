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

const AddBookForm: React.FC<{ onAddBook: (bookDetails: Omit<Book, 'id'>) => void }> = ({ onAddBook }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddBook({ title, author });
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

const BookCollectionManager: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const initialBooks: Book[] = [
      { id: 1, title: 'Book One', author: 'Author One' },
      { id: 2, title: 'Book Two', author: 'Author Two' },
    ];
    setBooks(initialBooks);
  }, []);

  const addBook = (bookDetails: Omit<Book, 'id'>) => {
    const newBookWithId: Book = { id: Math.random(), ...bookDetails };
    setBooks([...books, newBookWithId]);
  };

  return (
    <div>
      <h1>Manage Your Book Collection</h1>
      <BookList books={books} />
      <AddBookForm onAddBook={addBook} />
    </div>
  );
};

export default BookCollectionManager;