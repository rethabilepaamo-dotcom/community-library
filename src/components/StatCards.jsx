export default function StatCards({ items }) {
  return (
    <div className="cards">
      {items.map((item) => (
        <div className="card" key={item.label}>
          <small>{item.label}</small>
          <strong>{item.value}</strong>
        </div>
      ))}
    </div>
  );
}
