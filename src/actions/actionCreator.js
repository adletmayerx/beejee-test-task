import {
  GET_TASK_COUNT,
  GET_TASKS,
  SET_SORT_FIELD_VALUE,
  SET_SORT_DIRECTION_VALUE,
  SET_PAGE_VALUE,
  SET_PAGES,
  SET_IS_CREATE_TASK_POPUP_OPEN,
  SET_IS_EDIT_TASK_POPUP_OPEN,
  SET_IS_LOGIN_POPUP_OPEN,
  SET_SELECTED_TASK,
  SET_IS_LOGGED_IN,
} from "../utils/constants";

const getTotalTaskCount = (count) => ({
  type: GET_TASK_COUNT,
  count,
});

const getTasks = (tasks) => ({
  type: GET_TASKS,
  tasks,
});

const setPageValue = (val) => ({
  type: SET_PAGE_VALUE,
  val,
});

const setSortFieldValue = (val) => ({
  type: SET_SORT_FIELD_VALUE,
  val,
});

const setSortDirectionValue = (val) => ({
  type: SET_SORT_DIRECTION_VALUE,
  val,
});

const setPages = (val) => ({
  type: SET_PAGES,
  val,
});

const setIsCreateTaskPopupOpen = (val) => ({
  type: SET_IS_CREATE_TASK_POPUP_OPEN,
  val,
});

const setIsEditTaskPopupOpen = (val) => ({
  type: SET_IS_EDIT_TASK_POPUP_OPEN,
  val,
});

const setIsLoginPopupOpen = (val) => ({
  type: SET_IS_LOGIN_POPUP_OPEN,
  val,
});

const setSelectedTask = (val) => ({
  type: SET_SELECTED_TASK,
  val,
});

const setIsLoggedIn = (val) => ({
  type: SET_IS_LOGGED_IN,
  val,
});

export {
  getTotalTaskCount,
  getTasks,
  setPageValue,
  setSortFieldValue,
  setSortDirectionValue,
  setPages,
  setIsCreateTaskPopupOpen,
  setIsEditTaskPopupOpen,
  setIsLoginPopupOpen,
  setSelectedTask,
  setIsLoggedIn,
};
