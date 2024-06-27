import { useEffect, useState } from "react";
import TodoForm from "./components/todo-form";

const LOCAL_STORAGE_KEY = "todo";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storageTodos) {
      setTodos(storageTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function addTodo(todo) {
    setTodos([todo, ...todos]);
  }

  function toggleComplete(id) {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      })
    );
  }

  function removeTodo(id) {
    setTodos(todos.filter((todo) => todo.id != id));
  }

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
      <TodoForm />
      <div className="w-full h-full overflow-y-auto grid grid-cols-3 gap-4 max-w-screen-lg mx-auto my-4 px-4 md:px-0">
        <div className="w-full border rounded shadow-sm hover:shadow-md hover:cursor-grab active:cursor-grabbing border-zinc-700">
          <h1 className="px-4 py-2 font-medium rounded-t overflow-hidden truncate">
            Title
          </h1>
          <p className="p-4 bg-zinc-800 rounded-b overflow-x-hidden truncate">
            Lorem ipsum dolor, sit amet consectetuadipisicing elit. Aperiam odio
            tenetur quasi exercitationem voluptas porro ea quas ratione,
            consequuntur quisquam beatae in voluptatem. Ducimus repellendus
            excepturi vero reprehenderit magnam? Lorem ipsum dolor sit amet,
            consectetur adipisicing elit.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
