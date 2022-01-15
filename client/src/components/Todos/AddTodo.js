import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Card, Row, Col, Button, Form } from "react-bootstrap";
import { addTodo } from "../../actions/todo";

const AddTodo = ({ addTodo }) => {
  const [todo, setTodo] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    addTodo({ text: todo, status: 0 });
    setTodo("");
  };

  return (
    <div className="my-4">
      <Card className="bg-dark">
        <Row>
          <Col lg={6} md={8} xs={12} className="mx-auto">
            <Card.Body>
              <Form onSubmit={(e) => onSubmit(e)}>
                <Row>
                  <Col md={10} xs={8}>
                    <Form.Control
                      type="text"
                      placeholder="Add Todo"
                      value={todo}
                      onChange={(e) => setTodo(e.target.value)}
                    />
                  </Col>
                  <Col md={2} xs={4}>
                    <Button variant="secondary" type="submit" className="w-100">
                      Add
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

AddTodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
};

export default connect(null, { addTodo })(AddTodo);
