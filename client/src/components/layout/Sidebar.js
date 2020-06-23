import React, { Fragment } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Sidebar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
  return (
    <header className='header text-center'>
      <h1 className='blog-name pt-lg-4 mb-0'>
        <a href='index.html'>Anthony's Blog</a>
      </h1>

      <nav className='navbar navbar-expand-lg navbar-dark'>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navigation'
          aria-controls='navigation'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>

        <div id='navigation' className='collapse navbar-collapse flex-column'>
          <div className='profile-section pt-3 pt-lg-0'>
            <img
              className='profile-image mb-3 rounded-circle mx-auto'
              src='https://scontent.fath3-3.fna.fbcdn.net/v/t1.0-9/11065918_10205869741477752_1014402601962101750_n.jpg?_nc_cat=105&_nc_sid=174925&_nc_eui2=AeE7eUMOVblwc887w_k8pWpf5x27K0B1yOLnHbsrQHXI4gbs6gOA3GjpoFWZCQ8SbY4&_nc_ohc=UWEjV9bSJvEAX90fdGT&_nc_ht=scontent.fath3-3.fna&oh=61f2ee18334e83c31dacf5cc1e986b6b&oe=5F08B586'
              alt='image'
            />

            <div className='bio mb-3'>
              Hi, my name is Anthony Doe. Briefly introduce yourself here. You
              can also provide a link to the about page.
              <a href='about.html'>Find out more about me</a>
            </div>
            <ul className='social-list list-inline py-3 mx-auto'>
              <li className='list-inline-item'>
                <a href='#'>
                  <i className='fab fa-twitter fa-fw'></i>
                </a>
              </li>
              <li className='list-inline-item'>
                <a href='#'>
                  <i className='fab fa-linkedin-in fa-fw'></i>
                </a>
              </li>
              <li className='list-inline-item'>
                <a href='#'>
                  <i className='fab fa-github-alt fa-fw'></i>
                </a>
              </li>
              <li className='list-inline-item'>
                <a href='#'>
                  <i className='fab fa-stack-overflow fa-fw'></i>
                </a>
              </li>
              <li className='list-inline-item'>
                <a href='#'>
                  <i className='fab fa-codepen fa-fw'></i>
                </a>
              </li>
            </ul>
          </div>

          <ul className='navbar-nav flex-column text-center'>
            <li className='nav-item'>
              <NavLink
                className='nav-link'
                activeStyle={{
                  color: 'rgba(0, 0, 0, 0.6)',
                }}
                to='/'
              >
                <i className='fas fa-home fa-fw mr-2'></i>Blog Home{' '}
                <span className='sr-only'></span>
              </NavLink>
            </li>

            <li className='nav-item '>
              <NavLink
                className='nav-link'
                activeStyle={{
                  color: 'rgba(0, 0, 0, 0.6)',
                }}
                to='/about'
              >
                <i className='fas fa-user fa-fw mr-2'></i>About Me
              </NavLink>
            </li>
            {isAuthenticated && !loading && user !== null ? (
              <Fragment>
                <li>
                  <button
                    className='nav-item my-2 my-md-3 btn btn-danger'
                    onClick={(e) => logout()}
                  >
                    <i className='fas fa-door-open fa-fw mr-2'></i>Log out
                  </button>
                </li>
                {user.isAuthor && (
                  <li>
                    <Link to='/create-post'>
                      <button className='nav-item my-2 my-md-3 btn btn-success'>
                        <i className='fas fa-plus fa-fw mr-2'></i>Create Post
                      </button>
                    </Link>
                  </li>
                )}
              </Fragment>
            ) : (
              <Fragment>
                <li className='nav-item'>
                  <NavLink
                    className='nav-link'
                    activeStyle={{
                      color: 'rgba(0, 0, 0, 0.6)',
                    }}
                    to='/register'
                  >
                    <i className='fas fa-user-plus fa-fw mr-2'></i>Register
                  </NavLink>
                </li>
                <li className='nav-item'>
                  <NavLink
                    className='nav-link'
                    activeStyle={{
                      color: 'rgba(0, 0, 0, 0.6)',
                    }}
                    to='/login'
                  >
                    <i className='fas fa-users fa-fw mr-2'></i>Login
                  </NavLink>
                </li>
              </Fragment>
            )}
          </ul>

          <div className='my-2 my-md-3 btn btn-primary'>Get in Touch</div>
        </div>
      </nav>
    </header>
  );
};

Sidebar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Sidebar);
