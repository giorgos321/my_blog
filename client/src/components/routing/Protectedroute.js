import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const Protectedroute = ({
  component: Component,
  auth: { isAuthenticated, loading, user },
  ...rest
}) =>
  user !== null ? (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated && !loading && !user.isAuthor ? (
          <Redirect to='/login' />
        ) : (
          <Component {...props} />
        )
      }
    />
  ) : (
    <Redirect to='/login' />
  );

Protectedroute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Protectedroute);
