import TransactionForm from "../components/TransactionForm";
import TransactionTable from "../components/TransactionTable";
import { useLibrary } from "../context/LibraryContext";

export default function TransactionsPage() {
  const { books, transactions, recordTransaction } = useLibrary();

  return (
    <>
      <div className="panel">
        <h2>Stock Transaction</h2>
        <TransactionForm books={books} onSubmit={recordTransaction} />
      </div>

      <div className="panel">
        <h2>Transaction History</h2>
        <TransactionTable transactions={transactions} />
      </div>
    </>
  );
}
