import React, { Fragment, useEffect } from 'react';
import { getPosts } from '../actions/posts';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BlogItem from './BlogItem';
import Spinner from './layout/Spinner';

const Bloglist = ({
  getPosts,
  auth: { loading, isAuthenticated, user },
  posts: { posts },
}) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <Fragment>
      <section className='cta-section theme-bg-light py-5'>
        <div className='container text-center'>
          <h2 className='heading'>DevBlog - A Developers Blog</h2>

          {user !== null ? (
            <div className='intro'>
              Hello {user.name} and welcome to my blog. Subscribe and get my
              latest blog post in your inbox.
            </div>
          ) : (
            <div className='intro'>
              Welcome to my blog. Subscribe and get my latest blog post in your
              inbox.
            </div>
          )}

          <form className='signup-form form-inline justify-content-center pt-3'>
            <div className='form-group'>
              <label className='sr-only' for='semail'>
                Your email
              </label>
              <input
                type='email'
                id='semail'
                name='semail1'
                className='form-control mr-md-1 semail'
                placeholder='Enter email'
              />
            </div>
            <button type='submit' className='btn btn-primary'>
              Subscribe
            </button>
          </form>
        </div>
      </section>
      <section className='blog-list px-3 py-5 p-md-5'>
        <div className='container'>
          {posts.map((post) => (
            <BlogItem key={post._id} post={post}></BlogItem>
          ))}
          {loading && <Spinner />}
          <nav className='blog-nav nav nav-justified my-5'>
            <a
              className='nav-link-prev nav-item nav-link d-none rounded-left'
              href='#'
            >
              Previous<i className='arrow-prev fas fa-long-arrow-alt-left'></i>
            </a>
            <a
              className='nav-link-next nav-item nav-link rounded'
              href='blog-list.html'
            >
              Next<i className='arrow-next fas fa-long-arrow-alt-right'></i>
            </a>
          </nav>
        </div>
      </section>
    </Fragment>
  );
};

Bloglist.propTypes = {
  getPosts: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  posts: state.posts,
  auth: state.auth,
});

export default connect(mapStateToProps, { getPosts })(Bloglist);
