import { useEffect, useState } from "react";
import TodoForm from "./components/todo-form";
import Card from "./components/card";

const LOCAL_STORAGE_KEY = "todo";

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  
  const [selected, setSelected] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo) => {
    setTodos([...todos, todo]);
  };
  
  const removeTodo = (todoId) => {
    setTodos(todos.filter((todo) => todo.id !== todoId));
  };

  const updateTodo = (updatedTodo) => {
    setTodos(todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo)));
    setSelected(null);
  };

  const handleCheckBox = (todoId, taskIndex) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === todoId) {
          const updatedTasks = todo.tasks.map((task, index) => {
            if (index === taskIndex) {
              return { ...task, completed: !task.completed };
            }
            return task;
          });
          return { ...todo, tasks: updatedTasks };
        }
        return todo;
      })
    );
  };

  const searchedTodos = todos.filter((todo) => (
    todo.title.toLowerCase().includes(searchTerm.toLowerCase())
  ))

  const waitingTodos = searchedTodos.filter((todo) => todo.taskStatus === "waiting");
  const inProgressTodos = searchedTodos.filter(
    (todo) => todo.taskStatus === "in progress"
  );
  const doneTodos = searchedTodos.filter((todo) => todo.taskStatus === "done");

  return (
    <div className="min-h-screen w-full bg-zinc-900 text-white">
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
      <TodoForm addTodo={addTodo} selected={selected} updateTodo={updateTodo} />
      <div className="grid grid-cols-3 gap-4 max-w-screen-lg mx-auto my-4 px-4 md:px-0">
        {/* Column for 'Waiting' tasks */}
        <div className="w-full">
          <h2 className="text-xl font-bold text-zinc-200 mb-2">Waiting</h2>
          {waitingTodos.map((todo) => (
            <Card
              key={todo.id}
              todo={todo}
              handleCheckBox={handleCheckBox}
              removeTodo={removeTodo}
              setSelected={setSelected}
            />
          ))}
        </div>
        <div className="w-full">
          <h2 className="text-xl font-bold text-zinc-200 mb-2">In Progress</h2>
          {inProgressTodos.map((todo) => (
            <Card
              key={todo.id}
              todo={todo}
              handleCheckBox={handleCheckBox}
              removeTodo={removeTodo}
              setSelected={setSelected}
            />
          ))}
        </div>
        <div className="w-full">
          <h2 className="text-xl font-bold text-zinc-200 mb-2">Done</h2>
          {doneTodos.map((todo) => (
            <Card
              key={todo.id}
              todo={todo}
              handleCheckBox={handleCheckBox}
              removeTodo={removeTodo}
              setSelected={setSelected}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
