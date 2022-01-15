import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";
import { getTodos } from "../../actions/todo";
import TodosList from "./TodosList";
import AddTodo from "./AddTodo";

const Todos = ({ getTodos, todo: { todos, loading } }) => {
  useEffect(() => {
    getTodos();
  }, [getTodos]);

  return loading ? (
    <h1>Loading...</h1>
  ) : (
    <Container className="mt-4">
      <AddTodo />
      <TodosList todos={todos} />
    </Container>
  );
};

Todos.propTypes = {
  getTodos: PropTypes.func.isRequired,
  todo: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  todo: state.todo,
});

export default connect(mapStateToProps, { getTodos })(Todos);
