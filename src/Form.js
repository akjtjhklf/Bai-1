// Form.js
import React, { useState } from "react";

const Form = ({ onTaskCreate }) => {
  const [taskInput, setTaskInput] = useState("");

  const handleInputChange = (e) => {
    setTaskInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (taskInput.trim() !== "") {
      onTaskCreate(taskInput);
      setTaskInput(""); // Clear the input after submission
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        placeholder="Enter task ..."
        value={taskInput}
        onChange={handleInputChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
