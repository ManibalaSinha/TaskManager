export default function AppointmentList({ appointments, onDelete }) {
  if (appointments.length === 0) return <p>No appointments found.</p>;

  return (
    <ul className="space-y-2">
      {appointments.map((apt) => (
        <li key={apt.id} className="p-4 border rounded shadow-sm">
          <strong>{apt.name}</strong> - {apt.date} at {apt.time}
          <p>{apt.notes}</p>
          <button onClick={() => onDelete(apt.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
