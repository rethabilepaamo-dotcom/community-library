import { useEffect, useState } from "react";
import FormField from "./FormField";

export default function TransactionForm({ books, onSubmit }) {
  const [values, setValues] = useState({ bookId: "", type: "add", quantity: "1" });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ text: "", error: false });

  // hide the success message after a few seconds
  useEffect(() => {
    if (!message.text || message.error) return undefined;
    const timer = setTimeout(() => setMessage({ text: "", error: false }), 4000);
    return () => clearTimeout(timer);
  }, [message]);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newErrors = {};
    if (!values.bookId) newErrors.bookId = "Please select a book.";
    const quantity = Number(values.quantity);
    if (!Number.isInteger(quantity) || quantity < 1) {
      newErrors.quantity = "Quantity must be a whole number, 1 or more.";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const result = onSubmit({ bookId: values.bookId, type: values.type, quantity });

    if (result.error) {
      setMessage({ text: result.error, error: true });
      return;
    }

    setMessage({ text: result.message, error: false });
    setValues((prev) => ({ ...prev, quantity: "1" }));
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="form-grid">
        <FormField as="select" label="Book" id="bookId" name="bookId" value={values.bookId} onChange={handleChange} error={errors.bookId}>
          <option value="">Select a book</option>
          {books.map((book) => (
            <option key={book.id} value={book.id}>
              {book.title} - Stock: {book.quantity}
            </option>
          ))}
        </FormField>

        <FormField as="select" label="Transaction Type" id="type" name="type" value={values.type} onChange={handleChange}>
          <option value="add">Add Stock</option>
          <option value="borrow">Deduct Stock / Borrow</option>
        </FormField>

        <FormField
          label="Quantity"
          id="quantity"
          name="quantity"
          type="number"
          min="1"
          value={values.quantity}
          onChange={handleChange}
          error={errors.quantity}
        />
      </div>

      <button type="submit" className="primary">
        Record Transaction
      </button>

      {message.text && (
        <div className={message.error ? "message" : "message info"}>{message.text}</div>
      )}
    </form>
  );
}
