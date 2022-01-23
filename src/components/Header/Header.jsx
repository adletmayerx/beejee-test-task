import React from "react";
import "./Header.css";

const Header = ({ handleLoginClick, handleLogoutClick, isLoggedIn }) => {
  return (
    <header className="header">
      <h1 className="header__title">Tasks</h1>
      {isLoggedIn ? (
        <button
          className="header__logout"
          type="button"
          onClick={handleLogoutClick}
        >
          logout
        </button>
      ) : (
        <button
          className="header__login"
          type="button"
          onClick={handleLoginClick}
        >
          login
        </button>
      )}
    </header>
  );
};

export default Header;
