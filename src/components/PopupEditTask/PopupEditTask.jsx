import React, { useRef } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

const PopupEditTask = ({
  isOpen,
  onClose,
  handleEditTaskSubmit,
  buttonText,
  task,
  setSelectedTask,
}) => {
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

  const editFormRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEditTaskSubmit(editFormRef.current);
  };

  const handleStatusChange = (e) => {
    console.log(e.target.value);
    setSelectedTask({ text: task.text, id: task.id, status: e.target.value });
  };
  return (
    <PopupWithForm
      title={"edit task"}
      name={"edit-task"}
      isOpen={isOpen}
      onClose={onClose}
      buttonValue={buttonText}
      id={"edit-tast"}
      onSubmit={handleSubmit}
      formRef={editFormRef}
    >
      <select
        value={task.status}
        className="popup-edit__select"
        name="status"
        id="task-status-select"
        onChange={handleStatusChange}
      >
        {statusValues.map(({ value, label }) => {
          return (
            <option key={value + label} value={value} label={label}></option>
          );
        })}
      </select>
      <textarea
        defaultValue={task.text}
        name="text"
        cols="30"
        rows="10"
        required
      ></textarea>
    </PopupWithForm>
  );
};

export default PopupEditTask;
