import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  books = [
    {
      id: 1,
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      publication_year: 1960,
      genre: ['Fiction', 'Classic'],
      description:
        'A classic novel depicting racial injustice in the American South.',
      cover_image: '1.jpg',
    },
    {
      id: 2,
      title: '1984',
      author: 'George Orwell',
      publication_year: 1949,
      genre: ['Dystopian', 'Science Fiction'],
      description: 'A dystopian novel portraying a totalitarian society.',
      cover_image: '2.jpg',
    },
    {
      id: 3,
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      publication_year: 1813,
      genre: ['Classic', 'Romance'],
      description:
        'A classic novel exploring themes of love, marriage, and social norms.',
      cover_image: '3.jpg',
    },
    {
      id: 4,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      publication_year: 1925,
      genre: ['Fiction', 'Classic'],
      description:
        'A tale of the American Dream, wealth, and love during the Roaring Twenties.',
      cover_image: '4.jpg',
    },
    {
      id: 5,
      title: 'Moby-Dick',
      author: 'Herman Melville',
      publication_year: 1851,
      genre: ['Fiction', 'Adventure'],
      description:
        "The epic tale of Captain Ahab's obsession with the white whale.",
      cover_image: '5.jpg',
    },
    {
      id: 6,
      title: 'The Lord of the Rings',
      author: 'J.R.R. Tolkien',
      publication_year: 1954,
      genre: ['Fantasy', 'Adventure'],
      description:
        'An epic fantasy saga about the quest to destroy the One Ring.',
      cover_image: '6.jpg',
    },
  ];

  constructor() {}
}
