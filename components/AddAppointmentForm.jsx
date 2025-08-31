import React, { useState } from "react";

export default function AddAppointmentForm({ onAdd }) {
  const [form, setForm] = useState({
    name: "",
    date: "",
    time: "",
    notes: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!form.name || !form.date || !form.time) {
      setError("Please fill out all required fields (name, date, time).");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Failed to save appointment");
      }

      const newAppointment = await response.json();

      // Optional: call onAdd callback to update parent state or list
      if (onAdd) {
        onAdd(newAppointment);
      }

      // Reset form
      setForm({
        name: "",
        date: "",
        time: "",
        notes: "",
      });
    } catch (err) {
      setError(err.message || "Error submitting form");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Appointment</h2>

      <label>
        Name*:
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Date*:
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Time*:
        <input
          type="time"
          name="time"
          value={form.time}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Notes:
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          rows="3"
        />
      </label>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Add Appointment"}
      </button>
    </form>
  );
}
