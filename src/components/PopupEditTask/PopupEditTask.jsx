import React, { useRef, useState, useEffect } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

const PopupEditTask = ({
  isOpen,
  onClose,
  handleEditTaskSubmit,
  buttonText,
  selectedTask,
  setSelectedTask,
}) => {
  const statusValues = [
    {
      value: 0,
      label: "not completed",
    },
    {
      value: 10,
      label: "completed",
    },
    // {
    //   value: "1",
    //   label: "not completed. edited by admin",
    // },
    // {
    //   value: "11",
    //   label: "completed. edited by admin",
    // },
  ];

  const [text, setText] = useState(selectedTask.text);

  const handleChangeText = (e) => {
    setText(e.target.value);
  };

  const editFormRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedTask.text !== text && selectedTask.status === 0) {
      setSelectedTask({ ...selectedTask, status: 1 });
    }
    if (selectedTask.text !== text && selectedTask.status === 10) {
      setSelectedTask({ ...selectedTask, status: 11 });
    }
    handleEditTaskSubmit(editFormRef.current);
  };

  const handleStatusChange = (e) => {
    setSelectedTask({ ...selectedTask, status: e.target.value });
    
  };

  useEffect(() => {
    setText(selectedTask.text);
  }, [isOpen, selectedTask.text]);

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
        value={selectedTask.status === 0 || selectedTask.status === 1 ? 0 : 10}
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
        value={text}
        name="text"
        cols="30"
        rows="10"
        onChange={handleChangeText}
        required
      ></textarea>
    </PopupWithForm>
  );
};

export default PopupEditTask;
