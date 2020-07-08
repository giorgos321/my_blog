import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { getPost } from '../actions/posts';
import { connect } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import Moment from 'react-moment';
import Spinner from './layout/Spinner';

const Post = ({
  getPost,
  match,
  post: { author, title, text, image, date },
  loading,
}) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, match.params.id]);
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <article class='wrapper-padding blog-post px-3 py-5 p-md-5'>
          <div class='container'>
            <header class='blog-post-header'>
              <h2 class='title mb-2'>{title}</h2>
              <div class='meta mb-3'>
                <span class='date'>
                  Published <Moment fromNow>{date}</Moment>
                </span>
                <span class='time'>5 min read</span>
                <span class='comment'></span>
              </div>
            </header>
          </div>

          <div class='blog-post-body'>
            <figure class='blog-banner flex-center'>
              <img class='img-fluid' src={image} alt='image' />

              <figcaption class='mt-2 text-center image-caption'>
                Image Credit:{' '}
                <a href={image} target='_blank' rel='noopener noreferrer'>
                  {image}
                </a>
              </figcaption>
            </figure>
            {ReactHtmlParser(text)}
          </div>
          <h4>Author: {author}</h4>
        </article>
      )}
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.posts.post,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, { getPost })(Post);
