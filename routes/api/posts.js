const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const isImage = require('../../middleware/isImage');
const isUrl = require('../../middleware/isUrl');
const { check, validationResult } = require('express-validator');

const Post = require('../../models/Postmodel');
const User = require('../../models/Usermodel');

// @route       GET api/posts/
// @desc        Get all posts
// @access      Public

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });

    res.json(posts);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route       GET api/posts/:post_id
// @desc        Get all posts
// @access      Public

router.get('/:post_id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) return res.status(404).json({ msg: 'Post not found' });
    res.json(post);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route       GET api/posts/
// @desc        Create post
// @access      Private

router.post(
  '/',
  [
    auth,
    isImage,
    [
      check('title', 'Please fill in the title of the post').not().isEmpty(),
      check('text', 'Please fill in the content of the post').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { image, title, text, author, links } = req.body;
      let post = await Post.findOne({ title });
      if (post) {
        console.log('This title was taken by another post');
        return res
          .status(400)
          .json({ msg: 'This title was taken by another post' });
      }
      const user = await User.findById(req.user.id);
      if (!user.isAuthor) {
        console.log('Sorry, you can not create a post');
        return res
          .status(400)
          .json({ msg: 'Sorry, you can not create a post' });
      }
      const postFields = {};
      if (author) {
        postFields.author = author;
      } else {
        postFields.author = user.name;
      }

      if (links) postFields.links = links;
      postFields.image = image;
      postFields.title = title;
      postFields.text = text;
      //Create Post ,save it to DB
      post = new Post(postFields);
      await post.save();
      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route       GET api/posts/:post_id
// @desc        Delete post
// @access      Private

router.delete('/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    await post.remove();

    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
