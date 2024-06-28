import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";

const TodoForm = ({ handleAdd, selected, handleUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState([]);
  const [deadline, setDeadline] = useState("");
  const [taskStatus, setTaskStatus] = useState("waiting");

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (selected) {
      setTitle(selected.title);
      setTodos(selected.todos);
      setDeadline(
        selected.deadline
          ? new Date(selected.deadline).toISOString().substring(0, 16)
          : ""
      );
      setTaskStatus(selected.taskStatus);
      setIsOpen(true);
    } else {
      setTitle("");
      setTodos([]);
      setDeadline("");
      setTaskStatus("waiting");
    }
  }, [selected]);

  const handleTodoChange = (e, index) => {
    const newTodos = [...todos];
    newTodos[index].value = e.target.value;
    setTodos(newTodos);
  };

  const addTaskField = () => {
    setTodos([...todos, { value: "", completed: false }]);
  };

  const removeTask = (index) => {
    const updatedTasks = todos.filter((_, i) => i !== index);
    setTodos(updatedTasks);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title) return;

    const todo = {
      id: selected ? selected.id : uuid(),
      title,
      todos,
      createdAt: new Date().toISOString(),
      deadline: new Date(deadline).toISOString(),
      taskStatus,
    };

    if (selected) {
      handleUpdate(todo);
    } else {
      handleAdd(todo);
    }

    setTitle("");
    setTodos([]);
    setDeadline("");
    setTaskStatus("waiting");
    setIsOpen(false);
  };

  return (
    <>
      <div className="w-full h-full">
        <nav className="w-full border-b border-zinc-700 flex flex-row justify-between items-center max-w-screen-lg mx-auto p-4">
          <h1 className="font-medium text-lg">Todo</h1>
          <button
            className="inline-flex items-center justify-center gap-1 text-blue-500 hover:text-blue-400 transition duration-500 ease"
            onClick={toggleSidebar}
          >
            <svg
              className="w-4 h-4 rotate-45"
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
            <span>New</span>
          </button>
        </nav>
        <aside
          className={`w-96 min-h-screen bg-zinc-950 fixed top-0 left-0 z-10 duration-500 transition-transform transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } text-white p-8`}
        >
          <div className="w-full flex flex-row justify-between items-center">
            <h4></h4>
            <button onClick={toggleSidebar}>
              <svg
                className="w-5 h-5"
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
          <form
            onSubmit={handleSubmit}
            className="w-full my-8 flex flex-col gap-4 items-start justify-center"
          >
            <input
              type="text"
              name="title"
              placeholder="Untitled"
              className="bg-transparent border-0  border-zinc-500 w-full focus:ring-0 text-2xl"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {todos.map((todo, index) => (
              <div key={index} className="flex items-center w-full gap-2">
                <input
                  type="text"
                  name={`task-${index}`}
                  placeholder={`Task ${index + 1}`}
                  className="bg-transparent border-0 border-b border-zinc-500 w-full focus:ring-0"
                  value={todo.value}
                  onChange={(e) => handleTodoChange(e, index)}
                />
                <button
                  type="button"
                  className="text-zinc-500 hover:text-zinc-400"
                  onClick={() => removeTask(index)}
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
            ))}
            <button
              type="button"
              className="w-full flex flex-row justify-start items-center gap-1.5 text-zinc-500 hover:text-zinc-400 border-zinc-500 hover:border-zinc-400 duration-500 ease transition-all"
              onClick={addTaskField}
            >
              <svg
                className="w-4 h-4 rotate-45"
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
              <p className="border p-1.5 w-2 border-inherit" />
              <p className="font-medium">ToDo</p>
            </button>
            <label className="block mt-4">
              Deadline:
              <input
                type="datetime-local"
                name="deadline"
                className="bg-transparent border-0 border-b border-zinc-500 w-full focus:ring-0"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </label>
            <label htmlFor="taskStatus" className="block mt-4 w-full">
              Status:
              <select
                name="taskStatus"
                className="bg-transparent border-0 border-b border-zinc-500 w-full focus:ring-0"
                value={taskStatus}
                onChange={(e) => setTaskStatus(e.target.value)}
              >
                <option
                  value="waiting"
                  className="bg-zinc-700 text-white p-1 text-sm"
                >
                  Waiting
                </option>
                <option
                  value="in progress"
                  className="bg-zinc-700 text-white p-1 text-sm"
                >
                  In Progress
                </option>
                <option
                  value="done"
                  className="bg-zinc-700 text-white p-1 text-sm"
                >
                  Done
                </option>
              </select>
            </label>

            <button
              type="submit"
              className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded text-sm px-6 py-1.5 w-full"
            >
              {selected ? "Update" : "Save"}
            </button>
          </form>
        </aside>
        <div
          className={`fixed top-0 left-0 w-full h-full bg-black/30 duration-500 ${
            isOpen
              ? "opacity-100 visible pointer-events-auto"
              : "opacity-0 invisible pointer-events-none"
          }`}
          onClick={toggleSidebar}
        ></div>
      </div>
    </>
  );
};

export default TodoForm;
