import Header from "../components/Header";
import TaskList from "../components/TaskList";
import TaskInput from "../components/TaskInput";
import { useState, useEffect } from "react";

export default function Home() {
  const [tasks, setTasks] = useState([]);

   useEffect(() => {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  return (
    <div className="max-w-xl mx-auto mt-10">
      <Header />
      <TaskInput onAdd={(newTask) => setTasks([...tasks, newTask])} />
      <TaskList tasks={tasks} setTasks={setTasks} />
    </div>
  );
}