import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const PrivateRoute = ({
  component: Component,
  user: { isAuthenticated, loading },
  ...rest
}) => {
  if(!isAuthenticated && !loading) {
    return <Navigate to="/login" />;
  } else {
    return <Component {...rest} />;
  }
};

PrivateRoute.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(PrivateRoute);
