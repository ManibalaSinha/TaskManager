export default function TaskList({ tasks, onToggle, onDelete }) {
  return (
    <div>
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`flex justify-between items-center p-3 mb-2 border rounded ${
            task.completed ? "bg-green-100" : "bg-white"
          }`}
        >
          <div>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggle(task.id)}
              className="mr-2"
            />
            <span
              className={`font-semibold ${
                task.completed ? "line-through" : ""
              }`}
            >
              {task.title}
            </span>
            <p className="text-sm text-gray-500">
              Due: {task.due} | Priority: {task.priority}
            </p>
          </div>
          <button
            onClick={() => onDelete(task.id)}
            className="text-red-600 font-bold hover:underline"
          >
            ✖
          </button>
        </div>
      ))}
    </div>
  );
}
