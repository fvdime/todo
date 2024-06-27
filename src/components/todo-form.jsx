import { useState } from "react";

const TodoForm = () => {
  const [isOpen, setIsOpen] = useState(false);

  const ToggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="w-full h-full">
        <nav className="w-full border-b border-zinc-700 flex flex-row justify-between items-center max-w-screen-lg mx-auto p-4">
          <h1 className="font-medium text-lg">Todo</h1>
          <button
            className="inline-flex items-center justify-center gap-1 text-blue-500 hover:text-blue-400 transition duration-500 ease"
            onClick={ToggleSidebar}
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
        <div
          className={`w-96 min-h-screen bg-zinc-950 fixed top-0 left-0 z-10 duration-500 transition-transform transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } text-white p-8`}
        >
          <div className="w-full flex flex-row justify-between items-center">
            <h4 className=""></h4>
            <button className="" onClick={ToggleSidebar}>
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
            action=""
            className="w-full my-8 flex flex-col gap-4 items-start justify-center"
          >
            <input
              type="text"
              placeholder="Untitled"
              className="bg-transparent border-0  border-zinc-500 w-full focus:ring-0 text-2xl"
            />

            <div className="relative w-full">
              <input
                type="search"
                id="default-search"
                className="block w-full ps-1 py-4 text-sm border-b bg-transparent border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="What to do ..."
                required
              />
              <button
                type="submit"
                className="text-white absolute end-0 bottom-2.5 focus:ring-4 focus:outline-none font-medium rounded text-sm px-6 py-1.5 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
              >
                Add
              </button>
            </div>
          </form>
          <ul className="overflow-y-auto text-sm text-zinc-200 my-4">
            <li>
              <div className="flex items-center rounded hover:bg-zinc-800 py-2">
                <input
                  id="checkbox-item-11"
                  type="checkbox"
                  value=""
                  className="w-5 h-5 text-blue focus:ring-blue-600 ring-offset-gray-700 focus:ring-offset-gray-700 focus:ring-2 bg-gray-600 border-gray-500"
                />
                <label className="w-full ms-2 text-sm font-medium rounded text-zinc-300">
                  Bonnie Green
                </label>
              </div>
            </li>
          </ul>
        </div>
        <div
          className={`fixed top-0 left-0 w-full h-full bg-black/30 duration-500 ${
            isOpen
              ? "opacity-100 visible pointer-events-auto"
              : "opacity-0 invisible pointer-events-none"
          }`}
          onClick={ToggleSidebar}
        ></div>
      </div>
    </>
  );
};

export default TodoForm;
