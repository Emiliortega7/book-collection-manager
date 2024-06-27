import React, { useState, useEffect } from 'react';

interface Book {
  id: number;
  title: string;
  authorName: string;
}

const BookCollection: React.FC<{ books: Book[] }> = ({ books }) => (
  <div>
    {books.map((book) => (
      <div key={book.id}>
        {book.title} by {book.authorName}
      </div>
    ))}
  </div>
);

const NewBookForm: React.FC<{ onSaveNewBook: (bookDetails: Omit<Book, 'id'>) => void }> = ({ onSaveNewBook }) => {
  const [bookTitle, setBookTitle] = useState('');
  const [bookAuthor, setBookAuthor] = useState('');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveNewBook({ title: bookTitle, author: bookAuthor });
    setBookTitle('');
    setBookAuthor('');
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input type="text" value={bookTitle} onChange={(e) => setBookTitle(e.target.value)} placeholder="Title" required />
      <input type="text" value={bookAuthor} onChange={(e) => setBookAuthor(e.target.value)} placeholder="Author" required />
      <button type="submit">Add Book</button>
    </form>
  );
};

const BookCollectionManager: React.FC = () => {
  const [bookCollection, setBookCollection] = useState<Book[]>([]);

  useEffect(() => {
    const initialBookCollection: Book[] = [
      { id: 1, title: 'Book One', authorName: 'Author One' },
      { id: 2, title: 'Book Two', authorName: 'Author Two' },
    ];
    setBookCollection(initialBookCollection);
  }, []);

  const handleAddBook = (newBookDetails: Omit<Book, 'id'>) => {
    const newBook: Book = { id: Math.random(), ...newBookDetails };
    setBookCollection([...bookCollection, newBook]);
  };

  return (
    <div>
      <h1>Book Collection Manager</h1>
      <BookCollection books={bookCollection} />
      <NewBook<form onSubmit={handleFormSubmit}>
      <input type="text" value={bookTitle} onChange={(e) => setBookTitle(e.target.value)} placeholder="Title" required />
      <input type="text" value={bookAuthor} onChange={(e) => setBookAuthor(e.target.value)} placeholder="Author" required />
      <button type="submit">Add Book</button>
    </form>ookForm onSaveNewBook={handleAddBook} />
    </div>
  );
};

export default BookCollectionManager;