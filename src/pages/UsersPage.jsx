import { useState } from "react";
import UserForm from "../components/UserForm";
import UserTable from "../components/UserTable";
import { useLibrary } from "../context/LibraryContext";

export default function UsersPage() {
  const { users, currentUser, addUser, updateUser, deleteUser } = useLibrary();
  const [editingUser, setEditingUser] = useState(null);

  const isAdmin = currentUser.role === "Admin";

  // non-admins can see the list but not change it
  if (!isAdmin) {
    return (
      <div className="panel">
        <h2>User List</h2>
        <div className="message info">Only administrators can add, update or delete users.</div>
        <UserTable users={users} />
      </div>
    );
  }

  function handleSave(data) {
    if (editingUser) {
      const result = updateUser(editingUser.id, data);
      if (!result.error) setEditingUser(null);
      return result;
    }
    return addUser(data);
  }

  function handleEdit(user) {
    setEditingUser(user);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleDelete(user) {
    if (!window.confirm(`Delete ${user.name}?`)) return;
    const result = deleteUser(user.id);
    if (result.error) window.alert(result.error);
    else if (editingUser && editingUser.id === user.id) setEditingUser(null);
  }

  return (
    <>
      <div className="panel">
        <h2>{editingUser ? "Update User" : "Add New User"}</h2>
        <UserForm
          key={editingUser ? editingUser.id : "new"}
          editingUser={editingUser}
          onSubmit={handleSave}
          onCancel={() => setEditingUser(null)}
        />
      </div>

      <div className="panel">
        <h2>User List</h2>
        <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </>
  );
}
