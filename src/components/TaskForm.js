import { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [form, setForm] = useState({
    title: "",
    due: "",
    priority: "Low",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.due) return;

    onAdd({
      ...form,
      id: Date.now(),
      completed: false,
    });

    setForm({ title: "", due: "", priority: "Low" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border rounded bg-white shadow mb-4"
    >
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Task Title"
        className="block w-full p-2 border rounded mb-2"
        required
      />
      <input
        type="date"
        name="due"
        value={form.due}
        onChange={handleChange}
        className="block w-full p-2 border rounded mb-2"
        required
      />
      <select
        name="priority"
        value={form.priority}
        onChange={handleChange}
        className="block w-full p-2 border rounded mb-2"
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Add Task
      </button>
    </form>
  );
}
