import React from 'react';
import Card from './card'
import DropArea from './drop-area';

const Column = ({ label, tasks, handleDelete, handleCheckBox, setSelected, setActiveCard, onDrop }) => {
  return (
    <section className="w-full">
      <header className="w-full flex flex-row justify-between items-center max-w-screen-lg mx-auto pb-4 text-start gap-4">
          <div className={`w-full border-zinc-700 ${label !== 'Done' && 'border-r-2'}`}>
            <h1 className={`text-sm font-medium w-fit py-0.5 px-6 rounded
              ${label === 'Waiting' && 'bg-red-800'}
              ${label === 'In Progress' && 'bg-amber-800'}
              ${label === 'Done' && 'bg-lime-800'}
              `}>
              {label}
            </h1>
          </div>
        </header>
      <DropArea onDrop={() => onDrop(label.toLowerCase(), 0 )}/>
      {tasks.map(
        (task, index) =>
          task.taskStatus === label.toLowerCase() && (
            <React.Fragment key={index}>
              <Card
              task={task}
              handleDelete={handleDelete}
              handleCheckBox={handleCheckBox}
              setSelected={setSelected}
              setActiveCard={setActiveCard}
              index={index}
            />
            <DropArea 
            onDrop={() => onDrop(task.taskStatus, index + 1 )}
            />
            </React.Fragment>
          )
      )}
    </section>
  );
};

export default Column;
