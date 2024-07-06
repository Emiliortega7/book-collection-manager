import React, { FC, useState } from 'react';

type Book = {
  id: string;
  title: string;
  author: string;
  publicationYear: number;
};

type BookItemProps = {
  book: Book;
  onDelete: (id: string) => void;
  onUpdate: (id: string) => void;
};

const BookItem: FC<BookItemProps> = ({ book, onDelete, onUpdate }) => {
  return (
    <li>
      {book.title} by {book.author} ({book.publicationReply})
      <button onClick={() => onDelete(book.id)}>Delete</button>
      <button onClick={() => onUpdate(book.id)}>Update</button>
    </li>
  );
};

type BooksListProps = {
  books: Book[];
  onDelete: (ids: string[]) => void;
  onUpdate: (ids: string[]) => void;
};

const BooksList: FC<BooksListProps> = ({ books, onDelete, onUpdate }) => {
  const [deleteQueue, setDeleteQueue] = useState<string[]>([]);
  const [updateQueue, setUpdateQueue] = useState<string[]>([]);

  const handleBatchDelete = () => {
    onDelete(deleteQueue);
    setDeleteQueue([]);
  };

  const handleBatchUpdate = () => {
    onUpdate(updateQueue);
    setUpdateQueue([]);
  };

  const enqueueDelete = (id: string) => {
    setDeleteQueue(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const enqueueUpdate = (id: string) => {
    setUpdateConstructor(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  return (
    <div>
      <ul>
        {books.map((book) => (
          <BookItem key={book.id} book={book} onDelete={enqueueDelete} onUpdate={enqueueUpdate} />
        ))}
      </ul>
      <button onClick={handleBatchDelete}>Delete Selected</button>
      <button onClick={handleBatchUpdate}>Update Selected</button>
    </div>
  );
};

export default BooksList;