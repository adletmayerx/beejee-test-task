import React, { useRef, useState } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

const PopupLogin = ({ isOpen, onClose, handleLoginSubmit, buttonText }) => {
  const loginFormRef = useRef(null);
  const handleSubmit = (e) => {
    console.log("login");
    e.preventDefault();
    handleLoginSubmit(loginFormRef.current);
  };
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeEmail = (e) => {
    setUsername(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <PopupWithForm
      title={"login"}
      name={"login"}
      isOpen={isOpen}
      onClose={onClose}
      buttonValue={buttonText}
      id={"edit-tast"}
      onSubmit={handleSubmit}
      formRef={loginFormRef}
    >
      <input
        name="username"
        id="username-input"
        type="text"
        className="form__input login__input input input_type_username"
        placeholder="Email"
        value={username || ""}
        onChange={handleChangeEmail}
        minLength="4"
        maxLength="40"
        required
      />
      <input
        name="password"
        id="password-input"
        type="password"
        className="form__input login__input input input_type_password"
        placeholder="Пароль"
        value={password || ""}
        onChange={handleChangePassword}
        minLength="2"
        maxLength="40"
        required
      />
    </PopupWithForm>
  );
};

export default PopupLogin;
