import React from "react";
import "./Menu.css";

const Menu = ({ onSortFieldChange, onSortDirectionChange, handleClick }) => {
  const sortFieldValues = [
    {
      value: "id",
      label: "id",
    },
    {
      value: "username",
      label: "username",
    },
    {
      value: "email",
      label: "email",
    },
    {
      value: "status",
      label: "status",
    },
  ];

  const sortDirectionValues = [
    {
      value: "asc",
      label: "по возрастанию",
    },
    {
      value: "desc",
      label: "по убыванию",
    },
  ];

  const handleFieldChange = (e) => {
    console.log(e.target.value);
    onSortFieldChange(e.target.value);
  };

  const handleDirectionChange = (e) => {
    console.log(e.target.value);
    onSortDirectionChange(e.target.value);
  };
  return (
    <div className="menu">
      <select className="menu__select menu__select_type_field"
        name="sort-field-select"
        id="sort-field-select"
        onChange={handleFieldChange}
      >
        {sortFieldValues.map(({ value, label }) => {
          return (
            <option key={value + label} value={value} label={label}></option>
          );
        })}
      </select>
      <select className="menu__select menu__select_type_direction"
        name="sort-direction-select"
        id="sort-direction-select"
        onChange={handleDirectionChange}
      >
        {sortDirectionValues.map(({ value, label }) => {
          return (
            <option key={value + label} value={value} label={label}></option>
          );
        })}
      </select>
      <button type="button" onClick={handleClick}>create new task</button>
    </div>
  );
};

export default Menu;
