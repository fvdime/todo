import { useState, useEffect } from "react";

const Card = ({ task, handleCheckBox, handleDelete, setSelected, setActiveCard, index }) => {
  const [color, setColor] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      if (task.taskStatus !== "done" && task.deadline) {
        const now = new Date();
        const deadline = new Date(task.deadline);
        const timeLeft = deadline - now;

        if (timeLeft <= 0) {
          setColor("text-red-700"); // Past due
        } else if (timeLeft <= 15 * 60 * 1000) {
          setColor("text-red-700"); // Less than 15 mins left
        } else if (timeLeft <= 60 * 60 * 1000) {
          setColor("text-amber-700"); // Less than 1 hour left
        } else {
          setColor("text-lime-700"); // More than 1 hour left
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [task.deadline, task.taskStatus]);

  const calculateTimeLeft = () => {
    if (task.deadline) {
      const now = new Date();
      const deadline = new Date(task.deadline);
      const timeLeft = deadline - now;

      if (timeLeft <= 0) {
        return "Past due";
      }

      const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));
      const minutesLeft = Math.floor(
        (timeLeft % (1000 * 60 * 60)) / (1000 * 60)
      );

      if (hoursLeft === 0 && minutesLeft <= 15) {
        return `${minutesLeft}m`;
      } else {
        return `${hoursLeft !== 0 ? hoursLeft + "h" : ""} ${minutesLeft}m`;
      }
    }

    return "";
  };

  return (
    <div 
    draggable
    onDragStart={() => setActiveCard(index)}
    onDragEnd={() => setActiveCard(null)}
    className="w-full border rounded shadow-sm hover:shadow-md hover:cursor-grab active:cursor-grabbing border-zinc-700 active:opacity-70 active:border-dashed" 
    >
      <div className="px-4 py-2 w-full flex flex-row justify-between items-center rounded">
        <h1
          onClick={() => setSelected(task)}
          className="font-medium rounded-t overflow-hidden truncate cursor-pointer"
        >
          {task.title}
        </h1>
        <button
          className="text-zinc-500 hover:text-zinc-400"
          onClick={() => handleDelete(task.id)}
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <ul className="overflow-y-auto text-sm text-zinc-200 p-4 bg-zinc-800 overflow-x-hidden truncate">
        {task.todos.map((todo, index) => (
          <li key={index} className="flex items-center">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleCheckBox(task.id, index)}
              className="mr-2"
            />
            <span className={todo.completed ? "line-through" : ""}>{todo.value}</span>
          </li>
        ))}
      </ul>
      <p
        className={`px-4 py-1.5 w-full rounded-b font-medium text-sm ${
          task.taskStatus === "done" ? "text-lime-700" : color
        }`}
      >
        {task.taskStatus === "done" ? "Completed" : calculateTimeLeft()}
      </p>
    </div>
  );
};

export default Card;
