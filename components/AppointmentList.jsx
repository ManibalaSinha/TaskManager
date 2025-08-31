import { useEffect, useState } from "react";

export default function AppointmentList() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/appointments")
      .then((res) => res.json())
      .then((data) => setAppointments(data))
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    <div>
      <h2 className="text-lg font-bold">Appointments</h2>
      <ul>
        {appointments.map((apt) => (
          <li key={apt.id}>
            {apt.name} - {apt.date} @ {apt.time}
          </li>
        ))}
      </ul>
    </div>
  );
}
