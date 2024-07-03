import React, { FC } from 'react';

type Book = {
  id: string;
  title: string;
  author: string;
  publicationYear: number;
};

type BooksListProps = {
  books: Book[];
  onDelete: (id: string) => void;
  onUpdate: (id: string) => void;
};

const BookItem: FC<{ book: Book; onDelete: (id: string) => void; onUpdate: (id: string) => void; }> = ({ book, onDelete, onUpdate }) => {
  return (
    <li>
      {book.title} by {book.author}, published in {book.publicationYear}
      <button onClick={() => onUpdate(book.id)}>Update</button>
      <button onClick={() => onDelete(book.id)}>Delete</button>
    </li>
  );
};

const BooksList: FC<BooksListProps> = ({ books, onDelete, onUpdate }) => {
  return (
    <ul>
      {books.map((book) => (
        <BookItem key={book.id} book={book} onDelete={onDelete} onUpdate={onUpdate} />
      ))}
    </ul>
  );
};

export default BooksList;