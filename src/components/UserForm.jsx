import { useState } from "react";
import FormField from "./FormField";

const roles = ["Member", "Librarian", "Admin"];
const emptyValues = { name: "", membershipId: "", role: "Member", password: "" };

function validate(values, isEditing) {
  const errors = {};

  if (!values.name.trim()) errors.name = "Name is required.";
  if (!values.membershipId.trim()) errors.membershipId = "Membership ID is required.";

  if (!isEditing && !values.password) errors.password = "Password is required.";
  else if (values.password && values.password.length < 4) {
    errors.password = "Password must be at least 4 characters.";
  }

  return errors;
}

// The parent gives this form a `key`, so switching users resets its state.
export default function UserForm({ editingUser, onSubmit, onCancel }) {
  const [values, setValues] = useState(
    editingUser
      ? {
          name: editingUser.name,
          membershipId: editingUser.membershipId,
          role: editingUser.role,
          password: "",
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

    const newErrors = validate(values, Boolean(editingUser));
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const result = onSubmit({
      name: values.name.trim(),
      membershipId: values.membershipId.trim(),
      role: values.role,
      password: values.password,
    });

    if (result && result.error) {
      setFormError(result.error);
      return;
    }

    if (!editingUser) setValues(emptyValues);
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="form-grid">
        <FormField label="Name" id="name" name="name" value={values.name} onChange={handleChange} error={errors.name} />
        <FormField label="Membership ID" id="membershipId" name="membershipId" value={values.membershipId} onChange={handleChange} error={errors.membershipId} />

        <FormField as="select" label="Role" id="role" name="role" value={values.role} onChange={handleChange}>
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </FormField>

        <FormField
          label={editingUser ? "New Password (leave blank to keep)" : "Password"}
          id="password"
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
        />
      </div>

      <div className="actions">
        <button type="submit" className="primary">
          {editingUser ? "Update User" : "Add User"}
        </button>

        {editingUser && (
          <button type="button" className="secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>

      {formError && <div className="message">{formError}</div>}
    </form>
  );
}
