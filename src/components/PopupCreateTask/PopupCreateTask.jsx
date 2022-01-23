import React, { useRef } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

const PopupCreateTask = ({
  isOpen,
  onClose,
  handleCreateTaskSubmit,
  buttonText,
}) => {
  const createFormRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreateTaskSubmit(createFormRef.current);
  };

  return (
    <PopupWithForm
      title={"create task"}
      name={"create-task"}
      isOpen={isOpen}
      onClose={onClose}
      buttonValue={buttonText}
      id={"create-task"}
      onSubmit={handleSubmit}
      formRef={createFormRef}
    >
      <input type="text" name="username" placeholder="username" required/>

      <input type="email" name="email" placeholder="email" required />

      <textarea name="text" cols="30" rows="10" required></textarea>
    </PopupWithForm>
  );
};

export default PopupCreateTask;
