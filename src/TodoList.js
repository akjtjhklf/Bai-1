// TodoList.js
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TodoItem from "./TodoItem";
import Form from "./Form";

const TodoList = ({ currentLanguage }) => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Build some websites", isDone: false, dueDate: "2024-02-01" },
    { id: 2, title: "Do exercises", isDone: false, dueDate: "2024-02-05" },
    { id: 3, title: "Go shopping", isDone: false, dueDate: "2024-02-06" },
    { id: 4, title: "House cleaning", isDone: false, dueDate: "2024-01-31" },
    // Add more tasks if needed
  ]);

  const [showOnlyNotFinished, setShowOnlyNotFinished] = useState(false);

  const handleTaskCreate = (taskTitle) => {
    const newTask = {
      id: tasks.length + 1, // Generate a unique ID (you may want to use a more robust solution)
      title: taskTitle,
      isDone: false,
      dueDate: null,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleToggle = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, isDone: !task.isDone } : task
      )
    );
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return; // Dropped outside the list

    const updatedTasks = Array.from(tasks);
    const [removed] = updatedTasks.splice(result.source.index, 1);
    updatedTasks.splice(result.destination.index, 0, removed);

    setTasks(updatedTasks);
  };

  const undoneTasksCount = tasks.filter((task) => !task.isDone).length;

  const filteredTasks = showOnlyNotFinished
    ? tasks.filter((task) => !task.isDone)
    : tasks;

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="mt-3">
          <div className="alert alert-info" role="alert">
            {currentLanguage === "en"
              ? `You have ${undoneTasksCount} tasks left!`
              : `Bạn còn ${undoneTasksCount} công việc!`}
          </div>
        </div>
        <div className="">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              checked={showOnlyNotFinished}
              onChange={() => setShowOnlyNotFinished(!showOnlyNotFinished)}
            />
            <label className="form-check-label">
              {currentLanguage === "en"
                ? "Not finished only"
                : "Chỉ hiển thị chưa hoàn thành"}
            </label>
          </div>
          <Form onTaskCreate={handleTaskCreate} />
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="droppable">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="list-group m-3"
                >
                  {filteredTasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                      {(provided) => (
                        <div
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <TodoItem
                            id={task.id}
                            title={task.title}
                            isDone={task.isDone}
                            dueDate={task.dueDate}
                            onToggle={handleToggle}
                            currentLanguage={currentLanguage}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
