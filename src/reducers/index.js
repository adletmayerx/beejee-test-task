import { combineReducers } from "@reduxjs/toolkit";
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
  SET_IS_LOGGED_IN
} from "../utils/constants";

const tasks = (state = [], { type, tasks }) => {
  switch (type) {
    case GET_TASKS:
      return [...tasks];
    default:
      return state;
  }
};

const totalTasksCount = (state = 0, { type, count }) => {
  switch (type) {
    case GET_TASK_COUNT:
      return +count;
    default:
      return state;
  }
};

const pages = (state = [], { type, val }) => {
  switch (type) {
    case SET_PAGES:
      return val;
    default:
      return state;
  }
};

const popupStatus = (
  state = {
    isCreateTaskPopupOpen: false,
    isEditTaskPopupOpen: false,
    isLoginPopupOpen: false,
  },
  { type, val }
) => {
  switch (type) {
    case SET_IS_CREATE_TASK_POPUP_OPEN:
      return { ...state, isCreateTaskPopupOpen: val };
    case SET_IS_EDIT_TASK_POPUP_OPEN:
      return { ...state, isEditTaskPopupOpen: val };
    case SET_IS_LOGIN_POPUP_OPEN:
      return { ...state, isLoginPopupOpen: val };
    default:
      return state;
  }
};

const pageParams = (
  state = { sortField: "id", sortDirection: "asc", page: 1 },
  { type, val }
) => {
  switch (type) {
    case SET_SORT_FIELD_VALUE:
      return { ...state, sortField: val };
    case SET_SORT_DIRECTION_VALUE:
      return { ...state, sortDirection: val };
    case SET_PAGE_VALUE:
      return { ...state, page: val };
    default:
      return state;
  }
};

const selectedTask = (state = {}, { type, val }) => {
  switch (type) {
    case SET_SELECTED_TASK:
      return val;
    default:
      return state;
  }
};

const isLoggedIn = (state = false, { type, val }) => {
  switch (type) {
    case SET_IS_LOGGED_IN:
      return val;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  tasks,
  totalTasksCount,
  pageParams,
  pages,
  popupStatus,
  selectedTask,
  isLoggedIn
});

export default rootReducer;
