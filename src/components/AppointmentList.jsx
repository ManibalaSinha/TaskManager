import AppointmentItem from "./AppointmentItem";

export default function AppointmentList({ appointments, onDelete }) {
  if (appointments.length === 0)
    return <p className="text-gray-500 mt-4">No appointments found.</p>;

  return (
    <ul className="space-y-2">
      {appointments.map((apt) => (
        <AppointmentItem key={apt.id} apt={apt} onDelete={onDelete} />
      ))}
    </ul>
  );
}
