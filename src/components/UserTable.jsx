export default function UserTable({ users, onEdit, onDelete }) {
  const showActions = Boolean(onEdit || onDelete);

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Membership ID</th>
            <th>Role</th>
            {showActions && <th>Actions</th>}
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.membershipId}</td>
              <td>{user.role}</td>

              {showActions && (
                <td className="actions">
                  <button className="warning" onClick={() => onEdit(user)}>
                    Update
                  </button>
                  <button className="danger" onClick={() => onDelete(user)}>
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
