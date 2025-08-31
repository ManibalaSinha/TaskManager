// pages/api/tasks.js

let tasks = [
  { id: 1, title: "Finish homework" },
  { id: 2, title: "Write blog post" },
];

export default function handler(req, res) {
  if (req.method === "GET") {
    // Return all tasks
    res.status(200).json(tasks);
  } else if (req.method === "POST") {
    // Add a new task
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: "Title is required" });

    const newTask = { id: tasks.length + 1, title };
    tasks.push(newTask);
    res.status(201).json(newTask);
  } else if (req.method === "DELETE") {
    // Delete a task by id (query param ?id=1)
    const id = parseInt(req.query.id);
    tasks = tasks.filter((task) => task.id !== id);
    res.status(200).json({ message: "Task deleted" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
