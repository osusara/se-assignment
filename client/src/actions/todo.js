import axios from "axios";
import { GET_TODOS, TODO_ERROR, DELETE_TODO, ADD_TODO, UPDATE_TODO } from "./types";

// get todos
export const getTodos = () => async dispatch => {
  try {
    const res = await axios.get("/api/todos");

    dispatch({
      type: GET_TODOS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: TODO_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// add todo
export const addTodo = formData => async dispatch => {
  const config = {
    header: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const res = await axios.post('/api/todos', formData, config);

    dispatch({
      type: ADD_TODO,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: TODO_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// update todo
export const updateTodo = (todoId, formData) => async dispatch => {
  const config = {
    header: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const res = await axios.put(`/api/todos/${todoId}`, formData, config);

    dispatch({
      type: UPDATE_TODO,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: TODO_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// delete todo
export const deleteTodo = todoId => async dispatch => {
  try {
    await axios.delete(`/api/todos/${todoId}`);

    dispatch({
      type: DELETE_TODO,
      payload: todoId
    });
  } catch (error) {
    dispatch({
      type: TODO_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};