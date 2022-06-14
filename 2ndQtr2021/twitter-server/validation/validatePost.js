const Validator = require('validator');
const isEmpty = require('./is-Empty');

module.exports = function(data){

  let errors = {};
  data.text = !isEmpty(data.text) ? data.text : '';
  if(!Validator.isLength(data.text, {min: 1, max: 200})){
    error.text = 'Post must be between 1 and 200;'
  }

  if(Validator.isEmpty(data.text)){
    errors.text = "Text field is required!";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}