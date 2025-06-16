export default function SortToggle({ sortAsc, setSortAsc }) {
  return (
    <button onClick={() => setSortAsc(!sortAsc)}>
      Sort by Date: {sortAsc ? "Ascending" : "Descending"}
    </button>
  );
}
