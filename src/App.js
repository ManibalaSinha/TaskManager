import AddAppointmentForm from "./components/AddAppointmentForm";

import AppointmentList from "./components/AppointmentList";

function App() {
  return (
    <div className="App">
      <h1>Appointment Dashboard</h1>
      <AddAppointmentForm />
      <AppointmentList />
    </div>
  );
}

export default App;
