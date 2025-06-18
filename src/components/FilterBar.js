export default function FilterBar({ filter, setFilter }) {
  return (
    <div className="flex gap-2 mb-4">
      {["all", "completed", "incomplete"].map((f) => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          className={`px-3 py-1 rounded ${
            filter === f ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          {f.charAt(0).toUpperCase() + f.slice(1)}
        </button>
      ))}
    </div>
  );
}
