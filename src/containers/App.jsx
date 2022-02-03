import PropTypes from "prop-types";
import React, { useEffect } from "react";
import "./App.css";
import { api } from "../utils/api";
import {
  Header,
  Menu,
  Tasks,
  PopupEditTask,
  PopupLogin,
  PopupCreateTask,
  Pagination,
} from "../components";
import { connect } from "react-redux";
import {
  getTasks,
  getTotalTaskCount,
  setPageValue,
  setSortFieldValue,
  setSortDirectionValue,
  setPages,
  setIsCreateTaskPopupOpen,
  setIsEditTaskPopupOpen,
  setIsLoginPopupOpen,
  setSelectedTask,
  setIsLoggedIn,
} from "../actions/actionCreator";

function App({
  tasks,
  totalTasksCount,
  pageParams,
  pages,
  popupStatus,
  selectedTask,
  isLoggedIn,
  getTasks,
  getTotalTaskCount,
  setPageValue,
  setSortFieldValue,
  setSortDirectionValue,
  setPages,
  setIsCreateTaskPopupOpen,
  setIsEditTaskPopupOpen,
  setIsLoginPopupOpen,
  setSelectedTask,
  setIsLoggedIn,
}) {
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
    setIsLoggedIn(false);
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
          .getTasks(
            pageParams.sortField,
            pageParams.sortDirection,
            pageParams.page
          )
          .then((res) => {
            getTasks(res.message.tasks);
            console.log(res.message);
            getTotalTaskCount(res.message.total_task_count);
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
        setIsLoggedIn(true);
        localStorage.setItem("jwt", res.message.token);
        closeAllPopups();
        loginForm.reset();
      })
      .catch((err) => {
        console.log(err);

        return [];
      });
  };

  const handleEditTaskSubmit = (formElem) => {
    debugger;
    let formData = new FormData(formElem);
    formData.append("token", localStorage.getItem("jwt"));
    formData.set("status", selectedTask.status);
    api
      .editTask(selectedTask.id, formData)
      .then(() => {
        closeAllPopups();
        api
          .getTasks(
            pageParams.sortField,
            pageParams.sortDirection,
            pageParams.page
          )
          .then((res) => {
            getTasks(res.message.tasks);
          })
          .catch((e) => console.log(e));
      })
      .catch((err) => {
        console.log(err);

        return [];
      });
  };

  useEffect(() => {
    api
      .getTasks(pageParams.sortField, pageParams.sortDirection, pageParams.page)
      .then((res) => {
        getTasks(res.message.tasks);
        getTotalTaskCount(res.message.total_task_count);
        if (localStorage.getItem("jwt")) {
          setIsLoggedIn(true);
        }
      })
      .catch((e) => console.log(e));
  }, [
    getTasks,
    getTotalTaskCount,
    pageParams.sortField,
    pageParams.sortDirection,
    pageParams.page,
    setIsLoggedIn,
  ]);

  useEffect(() => {
    let array = [];
    for (let i = 1; i <= Math.ceil(totalTasksCount / 3); i++) {
      array.push(i);
    }
    setPages(array);
  }, [setPages, totalTasksCount]);

  return (
    <div className="App">
      <Header
        handleLoginClick={handleLoginClick}
        handleLogoutClick={handleLogoutClick}
        isLoggedIn={isLoggedIn}
      />

      <Menu
        onSortFieldChange={setSortFieldValue}
        onSortDirectionChange={setSortDirectionValue}
        handleClick={handleCreateTaskClick}
      />

      <Tasks
        list={tasks}
        handleEditTaskClick={handleEditTaskClick}
        isLoggedIn={isLoggedIn}
      />

      <Pagination pages={pages} setPage={setPageValue} />

      <PopupCreateTask
        isOpen={popupStatus.isCreateTaskPopupOpen}
        onClose={handlePopupClosing}
        handleCreateTaskSubmit={handleCreateTaskSubmit}
        buttonText="create task"
      />

      <PopupEditTask
        isOpen={popupStatus.isEditTaskPopupOpen}
        onClose={handlePopupClosing}
        handleEditTaskSubmit={handleEditTaskSubmit}
        buttonText="submit"
        selectedTask={selectedTask !== null && selectedTask}
        setSelectedTask={setSelectedTask}
      />

      <PopupLogin
        isOpen={popupStatus.isLoginPopupOpen}
        onClose={handlePopupClosing}
        handleLoginSubmit={handleLogin}
        buttonText="login"
      />
    </div>
  );
}

// eslint-disable-next-line react/no-typos
App.PropTypes = {
  tasks: PropTypes.array,
  totalTasksCount: PropTypes.number,
  pageParams: PropTypes.object,
  pages: PropTypes.array,
  popupStatus: PropTypes.object,
  selectedTask: PropTypes.object,
  isLoggedIn: PropTypes.bool,
  getTasks: PropTypes.func,
  getTotalTaskCount: PropTypes.func,
  setPageValue: PropTypes.func,
  setSortFieldValue: PropTypes.func,
  setSortDirectionValue: PropTypes.func,
  setPages: PropTypes.func,
  setIsCreateTaskPopupOpen: PropTypes.func,
  setIsEditTaskPopupOpen: PropTypes.func,
  setIsLoginPopupOpen: PropTypes.func,
  setSelectedTask: PropTypes.func,
  setIsLoggedIn: PropTypes.func,
};

export default connect(
  ({
    tasks,
    totalTasksCount,
    pageParams,
    pages,
    popupStatus,
    selectedTask,
    isLoggedIn,
  }) => ({
    tasks,
    totalTasksCount,
    pageParams,
    pages,
    popupStatus,
    selectedTask,
    isLoggedIn,
  }),
  {
    getTasks,
    getTotalTaskCount,
    setPageValue,
    setSortFieldValue,
    setSortDirectionValue,
    setPages,
    setIsCreateTaskPopupOpen,
    setIsEditTaskPopupOpen,
    setIsLoginPopupOpen,
    setSelectedTask,
    setIsLoggedIn,
  }
)(App);
