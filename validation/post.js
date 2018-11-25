const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostInput(data) {
  let errors = {};

  if (data.text) {
    data.text = !isEmpty(data.text) ? data.text : '';
    if (Validator.isEmpty(data.text)) {
      errors.text = 'Write something here...';
    }
  }

  if (data.title && data.content) {
    data.title = !isEmpty(data.title) ? data.title : '';
    data.content = !isEmpty(data.content) ? data.content : '';
    if (Validator.isEmpty(data.title)) {
      errors.title = 'Write something introduction...';
    }

    if (Validator.isEmpty(data.content)) {
      errors.content = 'Write something direction...';
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
