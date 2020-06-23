import React, { useState } from 'react';
import { loginUser } from '../../actions/auth';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';

const Login = ({ auth: { isAuthenticated, loading }, loginUser }) => {
  const [formData, setformData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;
  const onChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
    loginUser(email, password);
  };
  if (isAuthenticated) {
    return <Redirect to='/' />;
  }
  return (
    <section className='cta-section theme-bg-light py-5'>
      <form
        style={{ height: '86vh' }}
        className='signup-form form-inline justify-content-center pt-3'
        onSubmit={(e) => onSubmit(e)}
      >
        <fieldset className='sm-6' style={{ margin: '30px' }}>
          <div id='legend'>
            <legend className=''>Login</legend>
          </div>

          <div className='control-group'>
            <label className='sr-only' for='email'>
              E-mail
            </label>
            <div className='controls'>
              <input
                type='text'
                name='email'
                placeholder=''
                className='form-control mr-md-1 semail'
                value={email}
                onChange={(e) => onChange(e)}
              />
              <p className='help-block'>Enter your E-mail</p>
            </div>
          </div>

          <div className='control-group'>
            <label className='sr-only' for='password'>
              Password
            </label>
            <div className='controls'>
              <input
                type='password'
                name='password'
                placeholder=''
                className='form-control mr-md-1 semail'
                value={password}
                onChange={(e) => onChange(e)}
              />
              <p className='help-block'>Provide your password</p>
            </div>
          </div>

          <div className='control-group'>
            <div className='controls'>
              <button type='submit' className='btn btn-success'>
                Login
              </button>
            </div>
          </div>
          {loading && <Spinner />}
        </fieldset>
      </form>
    </section>
  );
};

Login.propTypes = {
  auth: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loginUser })(Login);
