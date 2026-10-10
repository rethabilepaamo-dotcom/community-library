import { createContext, useContext, useEffect, useMemo } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { createId } from "../utils/helpers";
import { seedBooks, seedUsers } from "../utils/seedData";

const LibraryContext = createContext(null);

export function LibraryProvider({ children }) {
  const [books, setBooks] = useLocalStorage("library_books", seedBooks);
  const [users, setUsers] = useLocalStorage("library_users_v2", seedUsers);
  const [transactions, setTransactions] = useLocalStorage("library_transactions", []);
  const [session, setSession] = useLocalStorage("library_session_v2", null);

  // The logged-in user is always read from the users list, so a role change
  // is picked up straight away and a deleted account is logged out.
  const currentUser = useMemo(() => {
    if (!session) return null;
    const user = users.find((u) => u.id === session.id);
    return user ? { id: user.id, name: user.name, role: user.role } : null;
  }, [session, users]);

  useEffect(() => {
    if (session && !currentUser) setSession(null);
  }, [session, currentUser, setSession]);

  /* ---------- AUTH ---------- */

  function login(membershipId, password) {
    const user = users.find(
      (u) => u.membershipId === membershipId && u.password === password
    );
    if (!user) return false;
    setSession({ id: user.id, name: user.name, role: user.role });
    return true;
  }

  function logout() {
    setSession(null);
  }

  /* ---------- BOOKS ---------- */

  function isbnTaken(isbn, ignoreId) {
    return books.some((b) => b.isbn === isbn && b.id !== ignoreId);
  }

  function addBook(data) {
    if (isbnTaken(data.isbn)) {
      return { error: "A book with this ISBN already exists." };
    }
    setBooks((prev) => [...prev, { id: createId(), ...data }]);
    return { ok: true };
  }

  function updateBook(id, data) {
    if (isbnTaken(data.isbn, id)) {
      return { error: "Another book already uses this ISBN." };
    }
    setBooks((prev) => prev.map((b) => (b.id === id ? { ...b, ...data } : b)));
    return { ok: true };
  }

  function deleteBook(id) {
    setBooks((prev) => prev.filter((b) => b.id !== id));
  }

  /* ---------- TRANSACTIONS ---------- */

  function recordTransaction({ bookId, type, quantity }) {
    const book = books.find((b) => b.id === bookId);

    if (!book) return { error: "Please select a book." };

    if (type === "borrow" && book.quantity < quantity) {
      return { error: `Not enough stock. Only ${book.quantity} available.` };
    }

    const change = type === "add" ? quantity : -quantity;

    setBooks((prev) =>
      prev.map((b) => (b.id === bookId ? { ...b, quantity: b.quantity + change } : b))
    );

    setTransactions((prev) => [
      {
        id: createId(),
        bookId,
        bookTitle: book.title,
        type,
        quantity,
        performedBy: currentUser ? currentUser.name : "",
        date: new Date().toLocaleString(),
      },
      ...prev,
    ]);

    return {
      ok: true,
      message:
        type === "add"
          ? `Added ${quantity} copy(ies) of "${book.title}".`
          : `Deducted ${quantity} copy(ies) of "${book.title}".`,
    };
  }

  /* ---------- USERS ---------- */

  function membershipTaken(membershipId, ignoreId) {
    return users.some((u) => u.membershipId === membershipId && u.id !== ignoreId);
  }

  function isLastAdmin(user) {
    return user && user.role === "Admin" && users.filter((u) => u.role === "Admin").length === 1;
  }

  function addUser(data) {
    if (membershipTaken(data.membershipId)) {
      return { error: "Membership ID already exists." };
    }
    setUsers((prev) => [...prev, { id: createId(), ...data }]);
    return { ok: true };
  }

  function updateUser(id, data) {
    if (membershipTaken(data.membershipId, id)) {
      return { error: "Membership ID already exists." };
    }

    const target = users.find((u) => u.id === id);
    if (isLastAdmin(target) && data.role !== "Admin") {
      return { error: "At least one Admin account must remain." };
    }

    setUsers((prev) =>
      prev.map((u) => {
        if (u.id !== id) return u;
        const { password, ...rest } = data;
        // an empty password field means "keep the current password"
        return { ...u, ...rest, ...(password ? { password } : {}) };
      })
    );
    return { ok: true };
  }

  function deleteUser(id) {
    if (currentUser && currentUser.id === id) {
      return { error: "You cannot delete the currently logged-in account." };
    }
    if (isLastAdmin(users.find((u) => u.id === id))) {
      return { error: "At least one Admin account must remain." };
    }
    setUsers((prev) => prev.filter((u) => u.id !== id));
    return { ok: true };
  }

  const value = {
    books,
    users,
    transactions,
    currentUser,
    login,
    logout,
    addBook,
    updateBook,
    deleteBook,
    recordTransaction,
    addUser,
    updateUser,
    deleteUser,
  };

  return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>;
}

export function useLibrary() {
  const context = useContext(LibraryContext);
  if (!context) throw new Error("useLibrary must be used inside <LibraryProvider>");
  return context;
}
