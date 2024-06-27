import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";

const TodoForm = ({ addTodo, selected, updateTodo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState([]);
  const [deadline, setDeadline] = useState("");
  const [taskStatus, setTaskStatus] = useState("waiting");

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (selected) {
      setTitle(selected.title);
      setTasks(selected.tasks);
      setDeadline(selected.deadline);
      setTaskStatus(selected.taskStatus);
      setIsOpen(true);
    } else {
      setTitle("");
      setTasks([]);
      setDeadline("");
      setTaskStatus("");
    }
  }, [selected]);

  const handleTaskChange = (e, index) => {
    const newTasks = [...tasks];
    newTasks[index].value = e.target.value;
    setTasks(newTasks);
  };

  const addTaskField = () => {
    setTasks([...tasks, { value: "", completed: false }]);
  };

  const removeTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title) return;

    const todo = {
      id: selected ? selected.id : uuid(),
      title,
      tasks,
      deadline,
      taskStatus,
      createdAt: new Date().toISOString(),
    };

    if (selected) {
      updateTodo(todo);
    } else {
      addTodo(todo);
    }

    setTitle("");
    setTasks([]);
    setDeadline("");
    setTaskStatus("");
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
        <header className="w-full flex flex-row justify-between items-center max-w-screen-lg mx-auto p-4 text-start gap-4">
          <div className="w-full border-r-2 border-zinc-700">
            <h1 className="text-sm font-medium bg-red-900 w-fit py-0.5 px-6 rounded">
              Waiting
            </h1>
          </div>
          <div className="w-full border-r-2 border-zinc-700">
            <h1 className="text-sm font-medium bg-amber-800 w-fit py-0.5 px-6 rounded">
              In Progress
            </h1>
          </div>
          <div className="w-full">
            <h1 className="text-sm font-medium bg-lime-800 w-fit py-0.5 px-6 rounded">
              Done
            </h1>
          </div>
        </header>
        <aside
          className={`w-96 min-h-screen bg-zinc-950 fixed top-0 left-0 z-10 duration-500 transition-transform transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } text-white p-8`}
        >
          <div className="w-full flex flex-row justify-between items-center">
            <h4 className=""></h4>
            <button className="" onClick={toggleSidebar}>
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
            {tasks.map((task, index) => (
              <div key={index} className="flex items-center w-full gap-2">
                <input
                  type="text"
                  name={`task-${index}`}
                  placeholder={`Task ${index + 1}`}
                  className="bg-transparent border-0 border-b border-zinc-500 w-full focus:ring-0"
                  value={task.value}
                  onChange={(e) => handleTaskChange(e, index)}
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
              className="text-blue-500 hover:text-blue-400"
              onClick={addTaskField}
            >
              Add Task
            </button>
            <label className="block mt-4">
              Deadline (hours):
              <input
                type="number"
                name="deadline"
                className="bg-transparent border-0 border-b border-zinc-500 w-full focus:ring-0"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </label>
            <label htmlFor="taskStatus" className="block mt-4">
              Status:
            </label>
            <select
              name="taskStatus"
              className="bg-transparent border-0 border-b border-zinc-500 w-full focus:ring-0"
              value={taskStatus}
              onChange={(e) => setTaskStatus(e.target.value)}
            >
              <option value="waiting">Waiting</option>
              <option value="in progress">In Progress</option>
              <option value="done">Done</option>
            </select>

            <button
              type="submit"
              className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded text-sm px-6 py-1.5"
            >
              {selected ? "Update" : "Add"}
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
