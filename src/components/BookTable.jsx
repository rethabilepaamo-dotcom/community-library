import { isLowStock } from "../utils/helpers";

export default function BookTable({ books, onEdit, onDelete }) {
  const showActions = Boolean(onEdit || onDelete);

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>ISBN</th>
            <th>Quantity</th>
            {showActions && <th>Actions</th>}
          </tr>
        </thead>

        <tbody>
          {books.length === 0 && (
            <tr>
              <td colSpan={showActions ? 6 : 5} className="empty">
                No books yet.
              </td>
            </tr>
          )}

          {books.map((book) => {
            const low = isLowStock(book);

            return (
              <tr key={book.id} className={low ? "low-stock" : ""}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td>{book.isbn}</td>
                <td>
                  <span className={low ? "badge low" : "badge"}>{book.quantity}</span>
                </td>

                {showActions && (
                  <td className="actions">
                    <button className="warning" onClick={() => onEdit(book)}>
                      Update
                    </button>
                    <button className="danger" onClick={() => onDelete(book)}>
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
