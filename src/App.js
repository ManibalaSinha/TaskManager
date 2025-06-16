import { useState, useEffect } from "react";
import AddAppointmentForm from "./components/AddAppointmentForm";
import AppointmentList from "./components/AppointmentList";
import SearchBar from "./components/SearchBar";
import SortToggle from "./components/SortToggle";

export default function App() {
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("appointments");
    if (stored) setAppointments(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }, [appointments]);

  const handleAdd = (apt) => setAppointments([...appointments, apt]);

  const handleDelete = (id) =>
    setAppointments(appointments.filter((a) => a.id !== id));

  const filtered = appointments
    .filter((a) =>
      [a.name, a.owner, a.notes].some((field) =>
        field.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .sort((a, b) =>
      sortAsc
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date)
    );

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Appointments Dashboard</h1>
      <AddAppointmentForm onAdd={handleAdd} />
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <SortToggle sortAsc={sortAsc} setSortAsc={setSortAsc} />
      <AppointmentList appointments={filtered} onDelete={handleDelete} />
    </div>
  );
}
