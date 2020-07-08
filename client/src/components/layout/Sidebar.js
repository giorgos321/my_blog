import React, { Fragment } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { Glogin } from '../../actions/auth';
import { Modal, Button } from 'react-bootstrap';

const Sidebar = ({
  auth: { isAuthenticated, loading, user },
  Glogin,
  logout,
}) => {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <header className='header text-center'>
      <h1 className='blog-name pt-lg-4 mb-0'>
        <Link to='/'>George's Blog</Link>
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
              src='https://my-bio-8729a.web.app/0.jpg'
              alt='image'
            />

            <div className='bio mb-3'>
              Είμαι ένας ενθουσιώδης Junior Full-Stack developer ο οποίος έχει
              τεράστια όρεξη για εργασία πάνω στον τομέα του προγραμματισμού και
              πιο συγκεκριμένα στο Web Development. Δίνω έμφαση στην λεπτομέρια
              και προσέχω πάντα ο κώδικάς μου να είναι ευανάγνωστος καθώς έχω
              πάντα ομαδίκο πνεύμα
              <Link to='/about'>
                <br></br>Μάθετε περισσότερα για εμένα
              </Link>
            </div>
            <ul className='social-list list-inline py-3 mx-auto'>
              <li className='list-inline-item'>
                <a href='https://www.linkedin.com/in/%CE%B3%CE%B9%CF%8E%CF%81%CE%B3%CE%BF%CF%82-%CE%BB%CE%AC%CE%BC%CE%B5-b48624129/'>
                  <i className='fab fa-linkedin-in fa-fw'></i>
                </a>
              </li>
              <li className='list-inline-item'>
                <a href='https://github.com/giorgos321'>
                  <i className='fab fa-github-alt fa-fw'></i>
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

          <div
            className='my-2 my-md-3 btn btn-primary'
            onClick={() => setModalShow(true)}
          >
            Επικοινωνία
          </div>
          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        </div>
      </nav>
    </header>
  );
};

Sidebar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  Glogin: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Επικοινωνία
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p style={{ marginTop: '10px', fontSize: '25px' }}>
          Στείλτε μου ένα Email :D
        </p>
        <Button onClick={(e) => sendEmail(e)}>email</Button>
        <p style={{ marginTop: '10px', fontSize: '25px' }}>
          Κινητό : +30 6979073271
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
const sendEmail = (e) => {
  e.preventDefault();
  window.open('mailto:test@example.com');
};
export default connect(mapStateToProps, { Glogin, logout })(Sidebar);
