import React, { FC, useState } from 'react';

type Book = {
  id: string;
  title: string;
  author: string;
  publicationYear: number;
};

type BooksListProps = {
  books: Book[];
  onDelete: (ids: string[]) => void; // Adjusted to accept an array of IDs
  onUpdate: (ids: string[]) => void; // Adjusted to accept an array of IDs
};

const BooksList: FC<Books, BooksListProps> = ({ books, onDelete, onUpdate }) => {
  // State to collect IDs for deletion
  const [deleteQueue, setDeleteQueue] = useState<string[]>([]);
  // State to collect IDs for updates
  const [updateQueue, setUpdateQueue] = useState<string[]>([]);

  // Handle batch delete
  const handleBatchDelete = () => {
    onDelete(deleteQueue);
    setDeleteQueue([]); // Reset queue after processing
  };

  // Handle batch update - assuming you have a mechanism to collect update details
  const handleBatchUpdate = () => {
    onUpdate(updateQueue);
    setUpdateQueue([]); // Reset queue after processing
  };

  // Collect IDs for deletion, replace onDelete in BookItem with this
  const enqueueDelete = (id: string) => {
    setDeleteQueue(prev => [...prev, id]);
  };

  // Collect IDs for updates, replace onUpdate in BookItem with this
  const enqueueUpdate = (id: string) => {
    setUpdateQueue(prev => [...prev, id]);
  };

  return (
    <div>
      <ul>
        {books.map((book) => (
          <BookItem key={book.id} book={book} onDelete={enqueueDelete} onUpdate={enqueueUpdate} />
        ))}
      </ul>
      <button onClick={handleBatchDelete}>Delete Selected</button>
      <button onClick={handle_Datch=Udate}>Update Selected</button>
    </div>
  );
};

export default BooksList;