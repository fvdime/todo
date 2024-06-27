import Todo from "./todo"

const Card = ({ todo, handleCheckBox, removeTodo }) => {
  return (
    <div
    className="w-full border rounded shadow-sm hover:shadow-md hover:cursor-grab active:cursor-grabbing border-zinc-700"
  >
    <div className="px-4 py-2 w-full flex flex-row justify-between items-center">
      <h1
        className="font-medium rounded-t overflow-hidden truncate"
      >
        {todo.title}
      </h1>
      <button
        className="text-zinc-500 hover:text-zinc-400"
        onClick={() => removeTodo(todo.id)}
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
    <ul className="overflow-y-auto text-sm text-zinc-200 p-4 bg-zinc-800 rounded-b overflow-x-hidden truncate">
      {todo.tasks.map((task, index) => (
        <li key={index}>
          <Todo
            todo={todo}
            task={task}
            index={index}
            toggleComplete={() => handleCheckBox(todo.id, index)}
          />
        </li>
      ))}
    </ul>
    {/* <p>{todo.taskStatus}</p> */}
    <p>{todo.deadline}</p>
  </div>
  )
}

export default Card