const User = Object.freeze({

  MESSAGES: {
    USER_ALREADY_EXIST: 'User already exist',
    ACCOUNT_ALREADY_EXIST: 'Account already exist',
    SIGN_UP_FAILED: 'Sign up Failed',
    CREATE_POST_FAILED: 'Create post Failed',
    GET_POST_FAILED: 'Get all post Failed',
    ADD_VIEW_FAILED: 'Add view to post Failed',
    ADD_LIKE_FAILED: 'Add like to post Failed',
    LOGIN_FAILED: 'Login Failed',
    INVALID_EMAIL_OR_PASSWORD: 'invalid email or password',
    NEED_TO_SIGNUP_FIRST: 'Need to sign up first'
  }

});

module.exports = User;
