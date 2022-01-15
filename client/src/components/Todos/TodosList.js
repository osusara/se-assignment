import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getTodos } from "../../actions/todo";
import TodoItem from "./TodoItem";

const TodosList = ({ getTodos, todo: { todos, loading } }) => {
  useEffect(() => {
    getTodos();
  }, [getTodos]);

  return loading ? (<h1>Loading...</h1>): (
    <div>
      <h4>List of Todos</h4>
      {todos.map((todo) => (
        <TodoItem key={todo._id} todo={todo} />
      ))}
    </div>
  );
};

TodosList.propTypes = {
  getTodos: PropTypes.func.isRequired,
  todo: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  todo: state.todo,
});

export default connect(mapStateToProps, { getTodos })(TodosList);
