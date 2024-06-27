import { useState } from "react";

const DropArea = ({ onDrop }) => {
  const [showDrop, setShowDrop] = useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setShowDrop(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setShowDrop(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    onDrop();
    setShowDrop(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <section
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className={`w-full h-4 bg-indigo-500/50 backdrop-blur-lg transition-all ease-in-out duration-500 ${showDrop ? 'opacity-50 h-40' : 'opacity-0'}`}
    />
  );
};

export default DropArea;