import React from "react";
import "./Task.css";

const Task = ({
  id,
  status,
  username,
  email,
  text,
  handleEditTaskClick,
  isLoggedIn,
}) => {
  const handleEditClick = () => {
    handleEditTaskClick(text, status, id);
  };

  return (
    <div className="task">
      <div className="task__menu">
        {isLoggedIn && (
          <button type="button" onClick={handleEditClick}>
            edit task
          </button>
        )}
        <p className="task__status">
          status:{" "}
          {status === 0
            ? "not completed"
            : status === 1
            ? "not completed. edit by admin"
            : status === 10
            ? "completed"
            : status === 11
            ? "completed. edited by admin"
            : "error"}
        </p>
      </div>
      <p className="task__text">task: {text}</p>
      <div className="task__user-info">
        <p className="task__username">username: {username}</p>
        <p className="task__email">email: {email}</p>
      </div>
    </div>
  );
};

export default Task;
