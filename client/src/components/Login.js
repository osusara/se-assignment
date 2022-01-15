import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Container, Col, Row, Card, Form, Button } from "react-bootstrap";
import { login } from "../actions/user";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login(username, password);
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <Container>
      <Row>
        <Col lg={4} md={6} xs={10} className="mx-auto mt-5 text-center">
          <Card className="px-3">
            <Card.Body>
              <h2 className="mb-5">Sign in</h2>
              <Form onSubmit={(e) => onSubmit(e)}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="username"
                    placeholder="Username"
                    name="username"
                    value={username}
                    onChange={(e) => onChange(e)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={(e) => onChange(e)}
                    required
                  />
                </Form.Group>

                <Button className="mt-3" variant="primary" type="submit">
                  Login
                </Button>
                <p className="my-1">
                  Don't have an account?{" "}
                  <Link className="link" to="/register">
                    Sign Up
                  </Link>
                </p>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
