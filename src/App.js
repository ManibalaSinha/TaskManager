import { useState, useEffect } from "react";
import AddAppointmentForm from "./components/AddAppointmentForm";
import AppointmentList from "./components/AppointmentList";

export default function App() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("appointments");
    if (saved) setAppointments(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }, [appointments]);

  const handleAdd = (appointment) => {
    setAppointments([...appointments, appointment]);
  };

  const handleDelete = (id) => {
    setAppointments(appointments.filter((item) => item.id !== id));
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Appointments Dashboard</h1>
      <AddAppointmentForm onAdd={handleAdd} />
      <AppointmentList appointments={appointments} onDelete={handleDelete} />
    </div>
  );
}
