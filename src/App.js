import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Success from "./Success";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import FilterBar from "./components/FilterBar";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  // Fetch tasks from Flask backend when app loads
  useEffect(() => {
    fetch("http://127.0.0.1:5000/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Error fetching tasks:", err));
  }, []);

  // Add new task
  const handleAdd = (task) => {
    fetch("http://127.0.0.1:5000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    })
      .then((res) => res.json())
      .then((newTask) => setTasks([...tasks, newTask]));
  };

  // Toggle task
  const handleToggle = (id) => {
    fetch(`http://127.0.0.1:5000/tasks/${id}`, { method: "PUT" })
      .then((res) => res.json())
      .then((updated) =>
        setTasks(tasks.map((t) => (t.id === id ? updated : t)))
      );
  };

// Delete task
  const handleDelete = (id) => {
    fetch(`http://127.0.0.1:5000/tasks/${id}`, { method: "DELETE" })
      .then(() => setTasks(tasks.filter((t) => t.id !== id)));
  };

  const filteredTasks = tasks.filter((task) =>
    filter === "completed"
      ? task.completed
      : filter === "incomplete"
        ? !task.completed
        : true
  );

  fetch("http://127.0.0.1:8000/create-checkout-session", { method: "POST" })
  .then((res) => res.json())
  .then((data) => {
    const stripe = window.Stripe("pk_test_*************");
    stripe.redirectToCheckout({ sessionId: data.id });
  });

  return (
    <Router>
      <Routes>
        {/* Main Task Manager page */}
        <Route
          path="/"
          element={
            <div className="max-w-2xl mx-auto p-4">
              <h1 className="text-2xl font-bold mb-4">📝 Task Manager</h1>
              <TaskForm onAdd={handleAdd} />
              <FilterBar filter={filter} setFilter={setFilter} />
              <TaskList
                tasks={filteredTasks}
                onToggle={handleToggle}
                onDelete={handleDelete}
              />
            </div>
          }
        />
        {/* Payment success page */}
        <Route path="/success" element={<Success />} />
        {/* Payment cancel page */}
        <Route path="/cancel" element={<Cancel />} />
      </Routes>
    </Router>
  );
}

