import React, { useState, useEffect } from "react";
import AddAppointmentForm from "./components/AddAppointmentForm";

export default function AppointmentTracker() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

  // Fetch appointments on load
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch("http://localhost:5000/appointments");
        if (!res.ok) throw new Error("Failed to fetch appointments");
        const data = await res.json();
        setAppointments(data);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // Callback when a new appointment is added
  const handleAddAppointment = (newAppointment) => {
    setAppointments((prev) => [...prev, newAppointment]);
  };

  return (
    <div>
      <h1>Appointment Tracker</h1>
      <AddAppointmentForm onAdd={handleAddAppointment} />

      <hr />

      <h2>All Appointments</h2>
      {loading && <p>Loading...</p>}
      {fetchError && <p style={{ color: "red" }}>{fetchError}</p>}
      {!loading && appointments.length === 0 && <p>No appointments yet.</p>}

      <ul>
        {appointments.map((appt) => (
          <li key={appt.id}>
            <strong>{appt.name}</strong> — {appt.date} at {appt.time}
            {appt.notes && <> | Notes: {appt.notes}</>}
          </li>
        ))}
      </ul>
    </div>
  );
}
