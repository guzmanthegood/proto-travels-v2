// src/resolvers/mutations/index.ts
const books = [
  { title: "The Awakening", author: "Kate Chopin" },
  { title: "City of Glass", author: "Paul Auster" },
];

export default {
  addBook: (_: any, { title, author }: { title: string; author: string }) => {
    const newBook = { title, author };
    books.push(newBook);
    return newBook;
  },
};
