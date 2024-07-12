import React, { useState, FormEvent } from 'react';

interface AddBookProps {
  addBook: (title: string, author: string, publicationYear: string) => void;
}

const AddBook: React.FC<AddProfileBookProps> = ({ addBook }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publicationYear, setPublicationYear] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    addBook(title, author, publicationYear);
    setTitle('');
    setAuthor('');
    setPublicationYear('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="author">Author:</label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="publicationYear">Publication Year:</label>
        <input
          type="text"
          id="publicationYear"
          value={publicationYear}
          onChange={(e) => setPublicationYear(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Book</button>
    </form>
  );
};

export default AddBook;