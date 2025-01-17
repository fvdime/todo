import React from "react";
import Card from "./card";
import DropArea from "./drop-area";
import PropTypes from "prop-types";

const Column = ({ label, tasks, setSelected, setActiveCard, onDrop }) => {
  const filteredTasks = tasks.filter(
    (task) => task.taskStatus === label.toLowerCase()
  );

  return (
    <section className="w-full">
      <header className="w-full flex flex-row justify-between items-center max-w-screen-lg mx-auto pb-4 text-start gap-4">
        <div
          className={`w-full border-zinc-700 ${
            label !== "Done" && "border-r-0 md:border-r-2"
          }`}
        >
          <h1
            className={`text-sm font-medium w-fit py-0.5 px-6 rounded
              ${label === "Waiting" && "bg-red-800"}
              ${label === "In Progress" && "bg-amber-800"}
              ${label === "Done" && "bg-lime-800"}
              `}
          >
            {label}
          </h1>
        </div>
      </header>
      <DropArea onDrop={() => onDrop(label.toLowerCase(), 0)} />
      {filteredTasks.map(
        (task, index) =>
          task.taskStatus === label.toLowerCase() && (
            <React.Fragment key={index}>
              <Card
                task={task}
                setSelected={setSelected}
                setActiveCard={setActiveCard}
                index={index}
              />
              <DropArea onDrop={() => onDrop(task.taskStatus, index + 1)} />
            </React.Fragment>
          )
      )}
    </section>
  );
};

export default Column;

Column.propTypes = {
  label: PropTypes.string.isRequired,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      todos: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.string.isRequired,
          completed: PropTypes.bool.isRequired,
        })
      ).isRequired,
      createdAt: PropTypes.string.isRequired,
      deadline: PropTypes.string.isRequired,
      taskStatus: PropTypes.string.isRequired,
    })
  ).isRequired,
  setSelected: PropTypes.func.isRequired,
  setActiveCard: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
};
