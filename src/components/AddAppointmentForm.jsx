import { useState } from "react";

export default function AddAppointmentForm({ onAdd }) {
  const [form, setForm] = useState({
    petName: "",
    ownerName: "",
    date: "",
    time: "",
    notes: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.petName || !form.ownerName || !form.date || !form.time) return;
    onAdd({ ...form, id: Date.now() });
    setForm({ petName: "", ownerName: "", date: "", time: "", notes: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded mb-4">
      <input
        name="petName"
        value={form.petName}
        onChange={handleChange}
        placeholder="Pet Name"
        className="w-full mb-2 p-2 border rounded"
        required
      />
      <input
        name="ownerName"
        value={form.ownerName}
        onChange={handleChange}
        placeholder="Owner Name"
        className="w-full mb-2 p-2 border rounded"
        required
      />
      <input
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
        className="w-full mb-2 p-2 border rounded"
        required
      />
      <input
        name="time"
        type="time"
        value={form.time}
        onChange={handleChange}
        className="w-full mb-2 p-2 border rounded"
        required
      />
      <textarea
        name="notes"
        value={form.notes}
        onChange={handleChange}
        placeholder="Notes"
        className="w-full mb-2 p-2 border rounded"
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
        Add Appointment
      </button>
    </form>
  );
}
