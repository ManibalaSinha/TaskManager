import React, { useState } from "react";
import AddAppointmentForm from "./components/AddAppointmentForm";

export default function App() {
  const [appointments, setAppointments] = useState([]);

  const handleAdd = (apt) => {
    setAppointments([...appointments, apt]);
  };

  return (
    <div>
      <h1>Appointments App</h1>
      <AddAppointmentForm onAdd={handleAdd} />
    </div>
  );
}
