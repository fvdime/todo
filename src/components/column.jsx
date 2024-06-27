import Card from './card'

const Column = ({ label, tasks, handleDelete, handleCheckBox, setSelected }) => {
  return (
    <section className="w-full">
      <h2 className="text-xl font-bold text-zinc-200 mb-2">{label}</h2>
      {tasks.map(
        (task) =>
          task.taskStatus === label.toLowerCase() && (
            <Card
              key={task.id}
              task={task}
              handleDelete={handleDelete}
              handleCheckBox={handleCheckBox}
              setSelected={setSelected}
            />
          )
      )}
    </section>
  );
};

export default Column;
