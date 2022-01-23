import React, { useState, useEffect } from "react";
import "./App.css";
import { api } from "./utils/api";
import {
  Header,
  Menu,
  Tasks,
  PopupEditTask,
  PopupLogin,
  PopupCreateTask,
  Pagination,
} from "./components";

function App() {
  const [result, setResult] = useState([]);
  const [sortFieldValue, setSortFieldValue] = useState("id");
  const [sortDirectionValue, setSortDirectionValue] = useState("asc");
  const [pageValue, setPageValue] = useState(1);
  const [isCreateTaskPopupOpen, setIsCreateTaskPopupOpen] = useState(false);
  const [isEditTaskPopupOpen, setIsEditTaskPopupOpen] = useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [totalTasksCount, setTotalTasksCount] = useState(0);
  const [pages, setPages] = useState([]);

  useEffect(() => {
    let array = [];
    for (let i = 1; i <= Math.ceil(totalTasksCount / 3); i++) {
      array.push(i);
    }

    setPages(array);
  }, [totalTasksCount]);

  const handleEditTaskClick = (text, status, id) => {
    setSelectedTask({ text, status, id });
    setIsEditTaskPopupOpen(true);
  };
  const handleCreateTaskClick = () => {
    setIsCreateTaskPopupOpen(true);
  };

  const handleLoginClick = () => {
    setIsLoginPopupOpen(true);
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
  };

  const closeAllPopups = () => {
    setIsEditTaskPopupOpen(false);
    setIsLoginPopupOpen(false);
    setIsCreateTaskPopupOpen(false);

    setSelectedTask(null);
  };
  const handlePopupClosing = (e) => {
    if (
      e.target.classList.contains("popup") ||
      e.target.classList.contains("popup__close-button")
    ) {
      closeAllPopups();
    }
  };

  const handleCreateTaskSubmit = (formElem) => {
    api
      .createTask(formElem)
      .then((res) => {
        closeAllPopups();
        formElem.reset();
        api
          .getTasks(sortFieldValue, sortDirectionValue, pageValue)
          .then((res) => {
            setResult(res.message.tasks);
            setTotalTasksCount(res.message.total_task_count);
          })
          .catch((e) => console.log(e));
      })
      .catch((e) => console.log(e));
  };

  const handleLogin = (loginForm) => {
    api
      .login(loginForm)
      .then((res) => {
        if (res.status === "error") {
          alert(res.message.password);
          throw new Error(res.message.password);
        }
        setLoggedIn(true);
        localStorage.setItem("jwt", res.message.token);
        closeAllPopups();
        loginForm.reset();
      })
      .catch((err) => {
        console.log(err);

        return [];
      });
  };

  useEffect(() => {
    api
      .getTasks(sortFieldValue, sortDirectionValue, pageValue)
      .then((res) => {
        setResult(res.message.tasks);
        setTotalTasksCount(res.message.total_task_count);
      })
      .catch((e) => console.log(e));
  }, [sortFieldValue, sortDirectionValue, pageValue]);

  const onSortFieldChange = (val) => {
    setSortFieldValue(val);
  };

  const onSortDirectionChange = (val) => {
    setSortDirectionValue(val);
  };

  const handleEditTaskSubmit = (formElem) => {
    let formData = new FormData(formElem);
    formData.append("token", localStorage.getItem("jwt"));
    api
      .editTask(selectedTask.id, formData)
      .then(() => {
        closeAllPopups();
        api
          .getTasks(sortFieldValue, sortDirectionValue, pageValue)
          .then((res) => {
            setResult(res.message.tasks);
          })
          .catch((e) => console.log(e));
      })
      .catch((err) => {
        console.log(err);

        return [];
      });
  };

  return (
    <div className="App">
      <Header
        handleLoginClick={handleLoginClick}
        handleLogoutClick={handleLogoutClick}
        isLoggedIn={loggedIn}
      />

      <Menu
        onSortFieldChange={onSortFieldChange}
        onSortDirectionChange={onSortDirectionChange}
        handleClick={handleCreateTaskClick}
      />

      <Tasks
        list={result}
        handleEditTaskClick={handleEditTaskClick}
        isLoggedIn={loggedIn}
      />

      <Pagination pages={pages} setPage={setPageValue} />

      <PopupCreateTask
        isOpen={isCreateTaskPopupOpen}
        onClose={handlePopupClosing}
        handleCreateTaskSubmit={handleCreateTaskSubmit}
        buttonText="create task"
      />
      <PopupEditTask
        isOpen={isEditTaskPopupOpen}
        onClose={handlePopupClosing}
        handleEditTaskSubmit={handleEditTaskSubmit}
        buttonText="submit"
        task={selectedTask !== null && selectedTask}
        setSelectedTask={setSelectedTask}
      />
      <PopupLogin
        isOpen={isLoginPopupOpen}
        onClose={handlePopupClosing}
        handleLoginSubmit={handleLogin}
        buttonText="login"
      />
    </div>
  );
}

export default App;
