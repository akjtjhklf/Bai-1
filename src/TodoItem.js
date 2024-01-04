// TodoItem.js
import React, { useState, useEffect } from "react";
import { FaRegCircle, FaRegCheckCircle } from "react-icons/fa";

const TodoItem = ({ id, title, isDone, dueDate, onToggle, currentLanguage }) => {
  const [daysLeft, setDaysLeft] = useState(null);

  useEffect(() => {
    if (dueDate) {
      const today = new Date();
      const due = new Date(dueDate);
      const differenceInTime = due.getTime() - today.getTime();
      const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
      setDaysLeft(differenceInDays);
    }
  }, [dueDate]);

  const getTranslatedTitle = () => {
    switch (currentLanguage) {
      case "vn":
        return title === "Build some websites"
          ? "Xây dựng một số trang web"
          : title === "Do exercises"
          ? "Tập thể dục"
          : title === "Go shopping"
          ? "Đi mua sắm"
          : title === "House cleaning"
          ? "Dọn nhà"
          : title;

      // English is the default language
      default:
        return title;
    }
  };

  const getTranslatedDueDate = () => {
    if (dueDate) {
      switch (currentLanguage) {
        case "vn":
          return ` Hết hạn trong ${daysLeft} ngày${daysLeft !== 1 ? "s" : ""}`;

        // English is the default language
        default:
          return ` Due in ${daysLeft} day${daysLeft !== 1 ? "s" : ""}`;
      }
    }
    return "";
  };

  return (
    <div className={`my-3 todo-item-container ${isDone ? "done" : ""}`}>
      {isDone ? (
        <FaRegCheckCircle
          color="#9a9a9a"
          className="item-done-button"
          onClick={() => onToggle(id)}
        />
      ) : (
        <FaRegCircle
          color="#9a9a9a"
          className="item-done-button"
          onClick={() => onToggle(id)}
        />
      )}
      <div className="item-title">
        {getTranslatedTitle()}
        {dueDate && (
          <p className="due-date">{getTranslatedDueDate()}</p>
        )}
      </div>
    </div>
  );
};

export default TodoItem;