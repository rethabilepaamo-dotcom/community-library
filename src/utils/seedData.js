import { createId } from "./helpers";

export const seedUsers = [
  {
    id: createId(),
    name: "System Administrator",
    membershipId: "retha1234",
    role: "Admin",
    password: "123456",
  },
  {
    id: createId(),
    name: "Main Librarian",
    membershipId: "LIB001",
    role: "Librarian",
    password: "lib123",
  },
];

export const seedBooks = [
  {
    id: createId(),
    title: "Things Fall Apart",
    author: "Chinua Achebe",
    genre: "Fiction",
    isbn: "9780385474542",
    quantity: 4,
  },
  {
    id: createId(),
    title: "The Alchemist",
    author: "Paulo Coelho",
    genre: "Novel",
    isbn: "9780061122415",
    quantity: 1,
  },
];
