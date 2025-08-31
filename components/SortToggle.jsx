export default function SortToggle({ sortAsc, setSortAsc }) {
  return (
    <button
      onClick={() => setSortAsc(!sortAsc)}
      className="px-4 py-2 bg-gray-200 rounded"
    >
      {sortAsc ? "Sort: Oldest" : "Sort: Newest"}
    </button>
  );
}
