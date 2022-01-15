import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { Navbar, Container, Button } from "react-bootstrap";
import { logout } from "../actions/user";

const Header = ({ user: { isAuthenticated, loading, user }, logout }) => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>Todo App</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {!loading && isAuthenticated && user ? (
            <>
              <Navbar.Text>{user.username}</Navbar.Text>
              <Button className="mx-3" variant="outline-light" size="sm" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <></>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { logout })(Header);
