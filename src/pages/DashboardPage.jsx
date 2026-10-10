import BookTable from "../components/BookTable";
import StatCards from "../components/StatCards";
import { useLibrary } from "../context/LibraryContext";
import { isLowStock } from "../utils/helpers";

export default function DashboardPage() {
  const { books, users } = useLibrary();

  const totalCopies = books.reduce((sum, book) => sum + Number(book.quantity), 0);
  const lowStock = books.filter(isLowStock).length;

  return (
    <>
      <StatCards
        items={[
          { label: "Total Titles", value: books.length },
          { label: "Total Copies", value: totalCopies },
          { label: "Low Stock", value: lowStock },
          { label: "Total Users", value: users.length },
        ]}
      />

      <div className="panel">
        <h2>Current Book Availability</h2>
        <BookTable books={books} />
      </div>
    </>
  );
}
