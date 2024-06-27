import { useEffect, useState } from "react";
import TodoForm from "./components/todo-form";
import Card from "./components/card";

const LOCAL_STORAGE_KEY = "todo";

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function addTodo(todo) {
    setTodos([todo, ...todos]);
  }

  const removeTodo = (todoId) => {
    setTodos(todos.filter((todo) => todo.id !== todoId));
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

  const waitingTodos = todos.filter((todo) => todo.taskStatus === "waiting");
  const inProgressTodos = todos.filter(
    (todo) => todo.taskStatus === "in progress"
  );
  const doneTodos = todos.filter((todo) => todo.taskStatus === "done");

  return (
    <div className="min-h-screen w-full bg-zinc-900 text-white">
      <main className="w-full h-full max-w-screen-lg mx-auto md:py-8 p-4 md:px-0">
        <article className="flex flex-col h-fit w-fit items-start justify-center text-sm text-gray-400">
          <h1 className="text-3xl font-bold text-zinc-200 mb-2">ToDo List</h1>
          <p>Use this template to track your personal tasks.</p>
          <p>Click + to create a new task directly on this board.</p>
          <p>Click an existing task to add additional context or subtasks.</p>
        </article>
      </main>
      <TodoForm addTodo={addTodo} />
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
            />
          ))}
        </div>
        {/* Column for 'In Progress' tasks */}
        <div className="w-full">
          <h2 className="text-xl font-bold text-zinc-200 mb-2">In Progress</h2>
          {inProgressTodos.map((todo) => (
            <Card
              key={todo.id}
              todo={todo}
              handleCheckBox={handleCheckBox}
              removeTodo={removeTodo}
            />
          ))}
        </div>
        {/* Column for 'Done' tasks */}
        <div className="w-full">
          <h2 className="text-xl font-bold text-zinc-200 mb-2">Done</h2>
          {doneTodos.map((todo) => (
            <Card
              key={todo.id}
              todo={todo}
              handleCheckBox={handleCheckBox}
              removeTodo={removeTodo}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
