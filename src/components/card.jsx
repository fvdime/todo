import { useState, useEffect } from "react";

const Card = ({
  task,
  handleCheckBox,
  handleDelete,
  setSelected,
  setActiveCard,
  index,
}) => {
  const [color, setColor] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      if (task.taskStatus !== "done" && task.deadline) {
        const now = new Date();
        const deadline = new Date(task.deadline);
        const timeLeft = deadline - now;

        if (timeLeft <= 0) {
          setColor("bg-red-700/30"); // Past due
        } else if (timeLeft <= 15 * 60 * 1000) {
          setColor("bg-red-700/20"); // Less than 15 mins left
        } else if (timeLeft <= 60 * 60 * 1000) {
          setColor("bg-amber-800/30"); // Less than 1 hour left
        } else {
          setColor("bg-zinc-700/40"); // More than 1 hour left
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [task.deadline, task.taskStatus]);

  const formatToLocalDateTime = (timeString) => {
    const date = new Date(timeString);

    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return date.toLocaleString("en-US", options);
  };

  const localDateTime = formatToLocalDateTime(task.deadline);

  return (
    <div
      draggable
      onDragStart={() => setActiveCard(index)}
      onDragEnd={() => setActiveCard(null)}
      className="w-full border rounded shadow-sm hover:shadow-md hover:cursor-grab active:cursor-grabbing border-zinc-800 active:opacity-70 active:border-dashed"
    >
      <div className="px-4 py-2 w-full flex flex-row justify-between items-center rounded bg-zinc-900">
        <h1 className="font-medium rounded-t overflow-hidden truncate">
          {task.title}
        </h1>
        <div className="w-fit flex flex-row items-center justify-end gap-1">
          <button
            type="button"
            className="opacity-50  hover:opacity-100 cursor-pointer"
            onClick={() => setSelected(task)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="#6b7280"
            >
              <path d="M160-400v-80h280v80H160Zm0-160v-80h440v80H160Zm0-160v-80h440v80H160Zm360 560v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T863-380L643-160H520Zm300-263-37-37 37 37ZM580-220h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19Z" />
            </svg>
          </button>
          <button
            type="button"
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
      </div>
      <ul
        className={`${task.taskStatus === "done" ? "bg-lime-700/40" : color}
        overflow-y-auto text-sm text-zinc-200 p-4 overflow-x-hidden truncate`}
      >
        {task.todos.map((todo, index) => (
          <li key={index} className="flex items-center">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleCheckBox(task.id, index)}
              className="mr-2"
            />
            <span className={todo.completed ? "line-through" : ""}>
              {todo.value}
            </span>
          </li>
        ))}
      </ul>
      <p
        className={`px-4 py-1.5 w-full rounded-b text-xs border-t border-zinc-700 text-end ${
          task.taskStatus === "done" ? "bg-lime-700/40" : color
        }`}
      >
        {localDateTime}
      </p>
    </div>
  );
};

export default Card;
