import React, { useState, FormEvent } from 'react';

interface AddBookProps {
  addBook: (title: string, author: string, publicationYear: string) => void;
}

const AddBook: React.FC<AddBookProps> = ({ addBook }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
 const [publicationYear, setPublicationYear] = useState('');
  const [error, setError] = useState('');

  const isValidYear = (year: string) => {