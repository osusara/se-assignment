import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { Container, Col, Row, Card, Form, Button } from "react-bootstrap";
import { register } from "../actions/user";
import PropTypes from "prop-types";

const Register = ({ register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    password2: "",
  });

  const { username, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      alert("passwords are not matching");
    } else {
      register({ username, password });
    }
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
              <h2 className="mb-5">Sign up</h2>
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

                <Form.Group className="mb-3">
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    name="password2"
                    value={password2}
                    onChange={(e) => onChange(e)}
                    required
                  />
                </Form.Group>

                <Button className="mt-3" variant="primary" type="submit">
                  Register
                </Button>
                <p className="my-1">
                  Already have an account?{" "}
                  <Link className="link" to="/login">
                    Sign In
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

Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
});

export default connect(mapStateToProps, { register })(Register);
