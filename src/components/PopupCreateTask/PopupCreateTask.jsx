import React, { useRef, useState } from "react";
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

  const [text, setText] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleChangeEmai = (e) => {
    setEmail(e.target.value);
  };
  const handleChangeText = (e) => {
    setText(e.target.value);
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
      <input
        type="text"
        name="username"
        placeholder="username"
        value={username}
        onChange={handleChangeUsername}
        required
      />

      <input
        type="email"
        name="email"
        placeholder="email"
        value={email}
        onChange={handleChangeEmai}
        required
      />

      <textarea
        name="text"
        cols="30"
        rows="10"
        value={text}
        onChange={handleChangeText}
        required
      />
    </PopupWithForm>
  );
};

export default PopupCreateTask;
