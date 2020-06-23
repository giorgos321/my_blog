import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../../actions/auth';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';

const Register = ({ isAuthenticated, register, setAlert }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const { name, email, password, password2 } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ name, email, password });
    }
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
            <legend className=''>Register</legend>
          </div>
          <div className='control-group'>
            <label className='sr-only'>Username</label>
            <div className='controls'>
              <input
                type='text'
                name='name'
                placeholder='name'
                className='form-control mr-md-1 semail'
                value={name}
                onChange={(e) => onChange(e)}
              />
              <p className='help-block'>
                Username can contain any letters or numbers, without spaces
              </p>
            </div>
          </div>

          <div className='control-group'>
            <label className='sr-only' for='email'>
              E-mail
            </label>
            <div className='controls'>
              <input
                type='text'
                id='email'
                name='email'
                placeholder=''
                className='form-control mr-md-1 semail'
                value={email}
                onChange={(e) => onChange(e)}
              />
              <p className='help-block'>Please provide your E-mail</p>
            </div>
          </div>

          <div className='control-group'>
            <label className='sr-only' for='password'>
              Password
            </label>
            <div className='controls'>
              <input
                type='password'
                id='password'
                name='password'
                placeholder=''
                className='form-control mr-md-1 semail'
                value={password}
                onChange={(e) => onChange(e)}
              />
              <p className='help-block'>
                Password should be at least 4 characters
              </p>
            </div>
          </div>

          <div className='control-group'>
            <label className='sr-only' for='password_confirm'>
              Password (Confirm)
            </label>
            <div className='controls'>
              <input
                type='password'
                id='password_confirm'
                name='password2'
                placeholder=''
                className='form-control mr-md-1 semail'
                value={password2}
                onChange={(e) => onChange(e)}
              />
              <p className='help-block'>Please confirm password</p>
            </div>
          </div>

          <div className='control-group'>
            <div className='controls'>
              <button type='submit' className='btn btn-success'>
                Register
              </button>
            </div>
          </div>
        </fieldset>
      </form>
    </section>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register, setAlert })(Register);
