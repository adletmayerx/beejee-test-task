import React from "react";

const TaskMenu = () => {
  const statusValues = [
    {
      value: "0",
      label: "not completed",
    },
    {
      value: "10",
      label: "completed",
    },
    {
      value: "1",
      label: "not completed. edited by admin",
    },
    {
      value: "11",
      label: "completed. edited by admin",
    },
  ];

  return (
    <div className="task-menu">
      <button type="button">edit task</button>
      <select
        className="task-menu__select"
        name="task-status-select"
        id="task-status-select"
        // onChange={handleStatusChange}
      >
        {statusValues.map(({ value, label }) => {
          return (
            <option key={value + label} value={value} label={label}></option>
          );
        })}
      </select>
    </div>
  );
};

export default TaskMenu;
