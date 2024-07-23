import React, { useState, FormEvent } from 'react';

interface Book {
  title: string;
  author: string;
  publicationYear: number;
}

interface UpdateBookProps {
  initialBook: Book;
  updateBook: (updatedBook: Book) => void;
}

const UpdateBookForm: React.FC<UpdateBookProps> = ({ initialBook, updateBook }) => {
  const [title, setTitle] = useState(initialBook.title);
  const [author, setAuthor] = useState(initialBook.author);
  const [publicationYear, setPublicationYear] = useState(initialBook.publicationYear.toString());

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateBook({ title, author, publicationYear: parseInt(publicationYear, 10) });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Book Title</label>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      
      <div>
        <label htmlFor="author">Author</label>
        <input
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="publicationYear">Publication Year</label>
        <input
          id="publicationYear"
          type="number"
          value={publicationYear}
          onChange={(e) => setPublicationYear(e.target.value)}
          required
        />
      </div>

      <button type="submit">Update Book</button>
    </form>
  );
};

export default UpdateBookForm;