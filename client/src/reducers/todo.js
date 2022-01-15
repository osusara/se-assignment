import {
  GET_TODOS,
  TODO_ERROR,
  UPDATE_TODO,
  DELETE_TODO,
  ADD_TODO,
  CLEAR_TODOS,
} from "../actions/types";

const initialState = {
  todos: [],
  loading: true,
  error: {},
};

const todo = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_TODOS:
      return {
        ...state,
        todos: payload,
        loading: false,
        error: {},
      };
    case ADD_TODO:
      return {
        ...state,
        todos: [payload, ...state.todos],
        loading: false,
        error: {},
      };
    case UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo._id === payload._id ? payload : todo
        ),
        loading: false,
        error: {},
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo._id !== payload),
        loading: false,
        error: {},
      };
    case CLEAR_TODOS:
      return {
        todos: [],
        error: {},
        loading: false,
      };
    case TODO_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default todo;
