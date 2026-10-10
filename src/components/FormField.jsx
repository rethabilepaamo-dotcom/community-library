// Label + input/select + validation message, reused by every form.
export default function FormField({ label, id, error, as = "input", children, ...props }) {
  const className = error ? "invalid" : undefined;

  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>

      {as === "select" ? (
        <select id={id} className={className} {...props}>
          {children}
        </select>
      ) : (
        <input id={id} className={className} {...props} />
      )}

      {error && <div className="field-error">{error}</div>}
    </div>
  );
}
