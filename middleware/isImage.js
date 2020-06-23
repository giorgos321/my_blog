//Middleware for checking if a url is an image url

const isImageUrl = require('is-image-url');

module.exports = function (req, res, next) {
  const isImage = isImageUrl(req.body.image);
  if (!isImage) {
    return res.status(400).json({ msg: 'This is not a valid image url' });
  } else {
    next();
  }
};
