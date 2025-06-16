import { useState } from "react";

export default function AddAppointmentForm({ onAdd }) {
  const [form, setForm] = useState({
    name: "",
    date: "",
    time: "",
    notes: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, date, time } = form;

    // Simple validation
    if (!name || !date || !time) {
      setError("All fields except notes are required.");
      return;
    }

    setError("");
    onAdd({ ...form, id: Date.now() });

    // Reset form
    setForm({
      name: "",
      date: "",
      time: "",
      notes: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border rounded mb-4 bg-white shadow"
    >
      {error && <p className="text-red-600 mb-2">{error}</p>}

      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Owner's Name"
        className="block w-full mb-2 p-2 border rounded"
        required
      />

      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        className="block w-full mb-2 p-2 border rounded"
        required
      />

      <input
        type="time"
        name="time"
        value={form.time}
        onChange={handleChange}
        className="block w-full mb-2 p-2 border rounded"
        required
      />

      <textarea
        name="notes"
        value={form.notes}
        onChange={handleChange}
        placeholder="Appointment Notes (optional)"
        className="block w-full mb-2 p-2 border rounded"
      ></textarea>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Appointment
      </button>
    </form>
  );
}
