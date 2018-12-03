const Validator = require('validator');
const isEmpty = require('./is-empty');

exports.validatePostInput = data => {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.content = !isEmpty(data.content) ? data.content : '';

  if (Validator.isEmpty(data.content)) {
    errors.content = 'Write direction here...';
  }

  if (Validator.isEmpty(data.title)) {
    errors.title = 'Write introduction here...';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

exports.validateCommentInput = data => {
  let errors = {};

  data.content = !isEmpty(data.content) ? data.content : '';

  if (Validator.isEmpty(data.content)) {
    errors.content = 'Write a comment here...';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
