import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Card,
  Row,
  Col,
  ButtonGroup,
  ToggleButton,
  Button,
  Form,
} from "react-bootstrap";
import { updateTodo, deleteTodo } from "../../actions/todo";

const TodoItem = ({ todo, updateTodo, deleteTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(todo.text);
  const [status, setStatus] = useState(todo.status);
  const statusValues = ["Todo", "In Progress", "Done"];

  const onSetStatus = (value) => {
    setStatus(value);
    updateTodo(todo._id, { text, status: value });
  };

  const onEditSubmit = (e) => {
    e.preventDefault();
    updateTodo(todo._id, { text, status });
    setIsEditing((prev) => !prev);
  };

  return (
    <Card
      className={`my-2 ${
        Number(status) === 1
          ? "bg-in-progress"
          : Number(status) === 2
          ? "bg-done"
          : "bg-light"
      }`}
    >
      <Card.Body>
        <Row>
          <Col lg={11} md={11} xs={10}>
            <Row>
              <Col
                lg={8}
                md={6}
                xs={10}
                className="my-auto edit-pointer"
                onClick={() => setIsEditing(true)}
              >
                {isEditing ? (
                  <>
                    <Form onSubmit={(e) => onEditSubmit(e)}>
                      <Row>
                        <Col xs={11}>
                          <Form.Control
                            type="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                          />
                        </Col>
                        <Col xs={1}>
                          <Button size="sm" variant="link" type="submit">
                            <i className="fas fa-check text-success"></i>
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </>
                ) : (
                  todo.text
                )}
              </Col>
              <Col lg={3} md={5} xs={12}>
                <ButtonGroup className="w-100">
                  {statusValues.map((statusValue, index) => (
                    <ToggleButton
                      key={index}
                      id={`${todo._id}-${index}`}
                      type="radio"
                      variant={
                        Number(status) === 1
                          ? "outline-secondary"
                          : Number(status) === 2
                          ? "outline-success"
                          : "outline-primary"
                      }
                      size="sm"
                      name={todo._id}
                      value={index}
                      checked={Number(status) === index}
                      onChange={(e) => onSetStatus(e.currentTarget.value)}
                    >
                      {statusValue}
                    </ToggleButton>
                  ))}
                </ButtonGroup>
              </Col>
            </Row>
          </Col>
          <Col lg={1} md={1} xs={2} className="my-auto">
            <Button
              size="sm"
              variant="link"
              onClick={() => deleteTodo(todo._id)}
            >
              <i className="fas fa-trash-alt text-danger"></i>
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

TodoItem.propTypes = {
  updateTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

export default connect(null, { updateTodo, deleteTodo })(TodoItem);
