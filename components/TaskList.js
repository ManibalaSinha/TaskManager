
export default function TaskList({ tasks, setTasks }) {
  const handleDelete = async (id) => {
    await fetch(`/api/tasks?id=${id}`, { method: "DELETE" });
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div>
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex justify-between items-center p-3 mb-2 border rounded"
        >
          <span>{task.title}</span>
          <button
            onClick={() => handleDelete(task.id)}
            className="bg-red-500 text-white px-2 rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
