const validator = require("validator");
const isEmpty = require("is-empty");

const validateRegisterInput = (data) => {
  let errors = {};
  data.firstName = isEmpty(data.firstName) ? "" : data.firstName;
  data.lastName = isEmpty(data.lastName) ? "" : data.lastName;
  data.id = !isEmpty(data.id) ? data.id : "";
  data.birthDay = isEmpty(data.birthDay) ? "" : data.birthDay;
  data.email = !isEmpty(data.email) ? data.email : "";


  if (validator.isEmpty(data.firstName)) {
    errors.firstName = "First Name field is required";
  }
  if (validator.isEmpty(data.lastName)) {
    errors.lastName = "Last Name field is required";
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (validator.isEmpty(data.id)) {
    errors.id = "id field is required";
  }

  if (!validator.isLength(data.id, { min: 8, max: 8 })) {
    errors.id = "id must be at least 8 characters";
  }
  if (validator.isEmpty(data.birthDay)) {
    errors.birthDay = "BirthDay fields is required";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateRegisterInput;
