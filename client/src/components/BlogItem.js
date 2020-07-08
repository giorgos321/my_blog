import React, { Fragment } from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deletePost } from '../actions/posts';

const BlogItem = ({
  post: { _id, author, title, text, date, image },
  auth: { isAuthenticated, loading, user },
  deletePost,
}) => {
  return (
    <Fragment>
      <div className='item mb-5'>
        <div className='media'>
          <img
            className='mr-3 img-fluid post-thumb d-none d-md-flex'
            src={image}
            alt='image'
          />
          <div className='media-body'>
            <h3 className='title mb-1'>
              <Link to={`posts/${_id}`}>{title}</Link>
            </h3>
            <div className='meta mb-1'>
              <span className='date'>
                Published <Moment fromNow>{date}</Moment>
              </span>
              <span className='time'>5 min read</span>
              <span className='comment'></span>
            </div>
            <div className='intro'>
              {ReactHtmlParser(text.substring(0, 200) + '...')}
            </div>
            <Link className='more-link' to={`posts/${_id}`}>
              Read more &rarr;
            </Link>
          </div>
          {user !== null && isAuthenticated && !loading && user.isAuthor && (
            <div>
              <button
                onClick={(e) => deletePost(_id)}
                className='btn btn-danger'
              >
                <i className='fas fa-trash fa-fw mr-2'></i>
              </button>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

BlogItem.propTypes = {
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deletePost })(BlogItem);
