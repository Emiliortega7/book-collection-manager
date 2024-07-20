import React, { useState } from 'react';

interface BookFormProps {
  onAddBook: (title: string, author: string, yearPublished: string, rating: number) => void;
}

const BookForm: React.FC<BookFormProps> = ({ onAddBook }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [yearPublished, setYearPublished] = useState('');
  const [rating, setRating] = useState(0);
  const [formError, setFormError] = useState('');

  const isValidPublicationYear = (year: string) => {
    const currentYear = new Date().getFullYear();
    return !isNaN(Number(year)) && Number(year) > 0 && Number(year) <= currentYear;
  }

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title || !author || !yearPublished) {
      setFormError('All fields are required');
      return;
    }

    if (!isValidPublicationYear(yearPublished)) {
      setFormError('Please enter a valid publication year');
      return;
    }

    if (rating < 1 || rating > 5) {
      setFormError('Rating must be between 1 and 5');
      return;
    }

    onAddBook(title, author, yearPublished, rating);
    setTitle('');
    setAuthor('');
    setYearPublished('');
    setRating(0);
    setFormError('');
  };

  return (
    <form onSubmit={handleFormSubmit}>
      {formError && <p className="error">{formError}</p>}
      <div>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="author">Author</label>
        <input
          id="author"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="yearPublished">Publication Year</label>
        <input
          id="yearPublished"
          type="text"
          value={yearPublished}
          onChange={(e) => setYearPublished(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="rating">Rating (1-5)</label>
        <input
          id="rating"
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(parseInt(e.target.value, 10))}
        />
      </div>
      <button type="submit">Add Book</button>
    </form>
  );
};

export default BookForm;