import { useState } from "react";
import BookForm from "../components/BookForm";
import BookTable from "../components/BookTable";
import { useLibrary } from "../context/LibraryContext";

export default function BooksPage() {
  const { books, addBook, updateBook, deleteBook } = useLibrary();
  const [editingBook, setEditingBook] = useState(null);

  function handleSave(data) {
    if (editingBook) {
      const result = updateBook(editingBook.id, data);
      if (!result.error) setEditingBook(null);
      return result;
    }
    return addBook(data);
  }

  function handleEdit(book) {
    setEditingBook(book);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleDelete(book) {
    if (!window.confirm(`Delete ${book.title}?`)) return;
    deleteBook(book.id);
    if (editingBook && editingBook.id === book.id) setEditingBook(null);
  }

  return (
    <>
      <div className="panel">
        <h2>{editingBook ? "Update Book" : "Add New Book"}</h2>
        <BookForm
          key={editingBook ? editingBook.id : "new"}
          editingBook={editingBook}
          onSubmit={handleSave}
          onCancel={() => setEditingBook(null)}
        />
      </div>

      <div className="panel">
        <h2>Book List</h2>
        <BookTable books={books} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </>
  );
}
