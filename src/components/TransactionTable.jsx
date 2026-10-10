export default function TransactionTable({ transactions }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Book</th>
            <th>Type</th>
            <th>Quantity</th>
            <th>Recorded By</th>
          </tr>
        </thead>

        <tbody>
          {transactions.length === 0 && (
            <tr>
              <td colSpan="5" className="empty">
                No transactions recorded yet.
              </td>
            </tr>
          )}

          {transactions.map((t) => (
            <tr key={t.id}>
              <td>{t.date}</td>
              <td>{t.bookTitle}</td>
              <td>{t.type === "add" ? "Add Stock" : "Borrow / Deduct"}</td>
              <td>{t.quantity}</td>
              <td>{t.performedBy || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
