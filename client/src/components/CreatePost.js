import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import CKEditor from 'ckeditor4-react';
import { createPost } from '../actions/posts';
import { connect } from 'react-redux';

const CreatePost = ({ createPost, history }) => {
  const [post, setPost] = useState({
    title: '',
    image: '',
    text: '',
  });
  const { title, image, text } = post;
  const onChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };
  const handleOnChange = (e) => {
    setPost({ ...post, text: e.editor.getData() });
    console.log(post);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    createPost(post, history);
  };
  return (
    <Fragment>
      <section className='cta-section theme-bg-light py-5'>
        <div className='container text-center'>
          <form
            onSubmit={(e) => onSubmit(e)}
            className=' justify-content-center pt-3'
          >
            <div className='form md-1'>
              <input
                type='title'
                name='title'
                className='form-control form-item mr-md-1 '
                placeholder='Post Title'
                value={title}
                onChange={(e) => onChange(e)}
              />
              <input
                type='title'
                name='image'
                className='form-control form-item mr-md-1 '
                placeholder='Post Image URL'
                value={image}
                onChange={(e) => onChange(e)}
              />
              <CKEditor
                name='text'
                config={{
                  fontSize_defaultLabel: '24px',
                  width: '100%',
                  height: '410px',
                }}
                onChange={(e) => handleOnChange(e)}
              />
              <button type='submit' className='btn btn-primary form-item'>
                Create Post
              </button>
            </div>
          </form>
        </div>
      </section>
    </Fragment>
  );
};

CreatePost.propTypes = {
  createPost: PropTypes.func.isRequired,
};

export default connect(null, { createPost })(CreatePost);
