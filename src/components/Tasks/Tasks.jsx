import React from "react";
import "./Tasks.css";
import { Task } from "..";

const Tasks = ({ list, handleEditTaskClick, isLoggedIn }) => {
  console.log(list)
  return (
    <div className="tasks">
      <ul className="tasks__list">
        {list.map(({ username, text, email, id, status }) => {

          return (
            <li className="tasks__list-item" key={id}>
              <Task
                id={id}
                username={username}
                status={status}
                text={text}
                email={email}
                handleEditTaskClick={handleEditTaskClick}
                isLoggedIn={isLoggedIn}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Tasks;
