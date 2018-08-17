const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.emailReg = !isEmpty(data.email) ? data.email : "";
  data.passwordReg = !isEmpty(data.password) ? data.password : "";
  data.passwordReg2 = !isEmpty(data.password2) ? data.password2 : "";

  // Validate name

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  // Validate email

  if (!Validator.isEmail(data.emailReg)) {
    errors.emailReg = "Email is invalid";
  }

  if (Validator.isEmpty(data.emailReg)) {
    errors.emailReg = "Email field is required";
  }

  // Validate password

  if (!Validator.isLength(data.passwordReg, { min: 6, max: 30 })) {
    errors.passwordReg = "Password must be between 6 and 30 characters";
  }

  if (Validator.isEmpty(data.passwordReg)) {
    errors.passwordReg = "Password field is required";
  }

  if (!Validator.equals(data.passwordReg, data.passwordReg2)) {
    errors.passwordReg2 = "Password must match";
  }

  if (Validator.isEmpty(data.passwordReg2)) {
    errors.passwordReg2 = "Confirm password field is required";
  }




  return {
    errors,
    isValid: isEmpty(errors)
  };
};
