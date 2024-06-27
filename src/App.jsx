import { useEffect, useState } from "react";
import TodoForm from "./components/todo-form";
import Column from "./components/column";

const LOCAL_STORAGE_KEY = "task";

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [selected, setSelected] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const handleAdd = (task) => {
    setTasks([...tasks, task]);
  };

  const handleDelete = (taskId) => {
    setTasks(tasks.filter((todo) => todo.id !== taskId));
  };

  const handleUpdate = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setSelected(null);
  };

  const handleCheckBox = (taskId, taskIndex) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          const updatedTodos = task.todos.map((todo, index) => {
            if (index === taskIndex) {
              return { ...todo, completed: !todo.completed };
            }
            return todo;
          });
          return { ...task, todos: updatedTodos };
        }
        return task;
      })
    );
  };

  const searchedTasks = tasks.filter((todo) =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onDrop = (status, position) => {
    alert(
      `${activeCard} is gonna place into ${status} and at the position ${position}`
    );
    if (activeCard === null || activeCard === undefined) return;

    const taskToMove = tasks[activeCard];
    const updatedTasks = [...tasks];
    updatedTasks.splice(activeCard, 1);
    updatedTasks.splice(position, 0, {
      ...taskToMove,
      taskStatus: status,
    });
  
    setTasks(updatedTasks);
  };

  return (
    <div className="h-full w-full text-white">
      <main className="w-full h-full max-w-screen-lg mx-auto md:py-8 p-4 md:px-0">
        <article className="flex flex-col md:flex-row h-full w-full items-end justify-center text-sm text-gray-400 gap-4">
          <article className="w-full">
            <h1 className="text-3xl font-bold text-zinc-200 mb-2">ToDo List</h1>
            <p>Use this template to track your personal tasks.</p>
            <p>Click + to create a new task directly on this board.</p>
            <p>Click an existing task to add additional context or subtasks.</p>
          </article>
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-1 px-4 rounded-3xl bg-zinc-700 text-white w-full"
          />
        </article>
      </main>
      <TodoForm
        handleAdd={handleAdd}
        selected={selected}
        handleUpdate={handleUpdate}
      />
      <div className="grid grid-cols-3 gap-4 max-w-screen-lg mx-auto my-4 px-4 md:px-0">
        <Column
          label="Waiting"
          tasks={searchedTasks}
          handleDelete={handleDelete}
          handleCheckBox={handleCheckBox}
          setSelected={setSelected}
          setActiveCard={setActiveCard}
          onDrop={onDrop}
        />
        <Column
          label="In Progress"
          tasks={searchedTasks}
          handleDelete={handleDelete}
          handleCheckBox={handleCheckBox}
          setSelected={setSelected}
          setActiveCard={setActiveCard}
          onDrop={onDrop}
        />
        <Column
          label="Done"
          tasks={searchedTasks}
          handleDelete={handleDelete}
          handleCheckBox={handleCheckBox}
          setSelected={setSelected}
          setActiveCard={setActiveCard}
          onDrop={onDrop}
        />
      </div>
    </div>
  );
}

export default App;
