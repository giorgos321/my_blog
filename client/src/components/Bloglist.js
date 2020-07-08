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
          <h2 className='heading'>Καλωσόρισεατε στο Blog μου</h2>

          {user !== null ? (
            <div className='intro'>
              Γεία σου {user.name}. Αν θες μπορείς να κάνεις Subscribe για να
              βλέπεις τα τελεύταια Post.
            </div>
          ) : (
            <div className='intro'>
              Γεία σας αν θέλετε να μαθαίνετε κάθε φορά που ανεβαίνει κάποιο
              Post μπορείτε να κάνετε Subscribe
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
