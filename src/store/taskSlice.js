import { createSlice } from '@reduxjs/toolkit'
import { storeDataInLocalStorage, LOCAL_STORAGE_KEY } from '../utils/local-storage'

const initialState = {
  tasks: JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [],
  // taskStatus: 'All'
}

const taskSlice = createSlice({
  name: 'taskStore',
  initialState,
  reducers: {
    addTask: (task) => {
      return task
    },
    setAddTask: (state, action) => {
      state.tasks = [...state.tasks, action.payload]
      storeDataInLocalStorage(state.tasks)
    },
    deleteTask: (id) => {
      return id;
    },
    setDeleteTask: (state, action) => {
      state.tasks = state.tasks.filter((item) => item.id !== action.payload )
      storeDataInLocalStorage(state.tasks)
    },
    editTask: (task) => {
      return task;
    },
    setEditTask: (state, action) => {
      state.tasks = state.tasks.map((item) => item.id === action.payload.id ? action.payload : item )
      storeDataInLocalStorage(state.tasks)
    },
    getTasks: () => {},
    setTasks: (state) => {
      state.tasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || []
      storeDataInLocalStorage(state.tasks)
    },
    checkedTodo: (task) => {
      return task;
    },
    setCheckedTodo: (state, action) => {
      const { id, todoIndex } = action.payload;
      state.tasks = state.tasks.map(task => {
        if (task.id === id) {
          const updatedTodos = task.todos.map((todo, index) => index === todoIndex ? { ...todo, completed: !todo.completed } : todo);
          return { ...task, todos: updatedTodos };
        }
        return task;
      });
      storeDataInLocalStorage(state.tasks);
    },
    clearAll: () => {},
    setClearAll: (state) => {
      state.tasks = []
      storeDataInLocalStorage([])
    }
  }
})

export const {
  addTask,
  setAddTask,
  deleteTask,
  setDeleteTask,
  editTask,
  setEditTask,
  clearAll,
  setClearAll,
  getTasks,
  setTasks,
  checkedTodo,
  setCheckedTodo
} = taskSlice.actions;
export default taskSlice.reducer