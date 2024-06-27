const Todo = ({ task, index, todo, toggleComplete }) => {
  return (
    <div className="flex items-center rounded hover:bg-zinc-800 py-2">
      <input
        id={`checkbox-item-${todo.id}-${index}`}
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleComplete()}
        className="w-5 h-5 text-blue focus:ring-blue-600 ring-offset-gray-700 focus:ring-offset-gray-700 focus:ring-2 bg-gray-600 border-gray-500"
      />
      <label
        htmlFor={`checkbox-item-${todo.id}-${index}`}
        className={`w-full ml-2 text-sm font-medium rounded ${
          task.completed ? "line-through text-gray-400" : ""
        }`}
      >
        {task.value}
      </label>
    </div>
  );
};

export default Todo;
