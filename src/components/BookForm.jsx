import { useState } from "react";
import FormField from "./FormField";

const emptyValues = { title: "", author: "", genre: "", isbn: "", quantity: "1" };

function validate(values) {
  const errors = {};

  if (!values.title.trim()) errors.title = "Title is required.";
  if (!values.author.trim()) errors.author = "Author is required.";
  if (!values.genre.trim()) errors.genre = "Genre is required.";

  const isbn = values.isbn.trim().replace(/-/g, "");
  if (!isbn) errors.isbn = "ISBN is required.";
  else if (!/^\d{10}(\d{3})?$/.test(isbn)) errors.isbn = "ISBN must be 10 or 13 digits.";

  const quantity = Number(values.quantity);
  if (values.quantity === "") errors.quantity = "Quantity is required.";
  else if (!Number.isInteger(quantity) || quantity < 0) {
    errors.quantity = "Quantity must be a whole number, 0 or more.";
  }

  return errors;
}

// onSubmit(data) should return { error } when the save is rejected.
// The parent gives this form a `key`, so switching books resets its state.
export default function BookForm({ editingBook, onSubmit, onCancel }) {
  const [values, setValues] = useState(
    editingBook
      ? {
          title: editingBook.title,
          author: editingBook.author,
          genre: editingBook.genre,
          isbn: editingBook.isbn,
          quantity: String(editingBook.quantity),
        }
      : emptyValues
  );
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setFormError("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newErrors = validate(values);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const result = onSubmit({
      title: values.title.trim(),
      author: values.author.trim(),
      genre: values.genre.trim(),
      isbn: values.isbn.trim().replace(/-/g, ""),
      quantity: Number(values.quantity),
    });

    if (result && result.error) {
      setFormError(result.error);
      return;
    }

    if (!editingBook) setValues(emptyValues);
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="form-grid">
        <FormField label="Title" id="title" name="title" value={values.title} onChange={handleChange} error={errors.title} />
        <FormField label="Author" id="author" name="author" value={values.author} onChange={handleChange} error={errors.author} />
        <FormField label="Genre" id="genre" name="genre" value={values.genre} onChange={handleChange} error={errors.genre} />
        <FormField label="ISBN" id="isbn" name="isbn" value={values.isbn} onChange={handleChange} error={errors.isbn} />
        <FormField
          label={editingBook ? "Quantity" : "Initial Quantity"}
          id="quantity"
          name="quantity"
          type="number"
          min="0"
          value={values.quantity}
          onChange={handleChange}
          error={errors.quantity}
        />
      </div>

      <div className="actions">
        <button type="submit" className="primary">
          {editingBook ? "Update Book" : "Add Book"}
        </button>

        {editingBook && (
          <button type="button" className="secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>

      {formError && <div className="message">{formError}</div>}
    </form>
  );
}
