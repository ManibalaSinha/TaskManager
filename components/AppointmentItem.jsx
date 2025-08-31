export default function AppointmentItem({ apt, onDelete }) {
  return (
    <li className="border p-4 rounded shadow-sm bg-white">
      <div className="flex justify-between">
        <h3 className="text-lg font-bold">{apt.petName}</h3>
        <button
          onClick={() => onDelete(apt.id)}
          className="text-red-500 hover:underline"
        >
          Delete
        </button>
      </div>
      <p className="text-sm text-gray-600">Owner: {apt.ownerName}</p>
      <p className="text-sm text-gray-600">
        {apt.date} at {apt.time}
      </p>
      {apt.notes && <p className="mt-2 text-sm">{apt.notes}</p>}
    </li>
  );
}
