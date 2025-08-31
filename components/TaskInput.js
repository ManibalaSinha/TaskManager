import React, { useState } from "react";

export default function TaskInput({ onAdd }) {
  const [title, setTitle] = useState("");

  const handleAdd = async () => {
    if (!title) return;
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    const newTask = await res.json();
    onAdd(newTask);
    setTitle("");
  };

  return (
    <div className="flex mb-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New Task"
        className="flex-1 p-2 border rounded-l"
      />
      <button
        onClick={handleAdd}
        className="bg-blue-500 text-white px-4 rounded-r"
      >
        Add
      </button>
    </div>
  );
}
