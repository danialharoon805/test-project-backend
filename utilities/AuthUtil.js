const {
  ErrorCodes,
  UserConstants
} = require('../constants');

const {
  Validators,
  Exception
} = require('../helpers');

class AuthUtil {

  static validateSignUpRequest (user, data) {

    if (!data) {

      console.log(`validateSignUpRequest:: Invalid data to sign up user. data:: `, data);

      throw new Exception(UserConstants.MESSAGES.INVALID_DATA_TO_SIGNUP_USER, ErrorCodes.BAD_REQUEST, { reportError: true }).toJson();

    }

    if (!Validators.isValidateEmail(data.email)) {

      console.log(`validateSignUpRequest:: Email is not valid. data:: `, data);

      throw new Exception(UserConstants.MESSAGES.INVALID_EMAIL, ErrorCodes.BAD_REQUEST, { reportError: true }).toJson();

    }

    if (user && user.status > 0) {

      console.log(`validateSignUpRequest:: Account already exist. data:: `, data);

      throw new Exception(UserConstants.MESSAGES.USER_ALREADY_EXIST, ErrorCodes.CONFLICT_WITH_CURRENT_STATE, { reportError: true }).toJson();

    }

    if (data.phone && !Validators.isValidPhone(data.phone)) {

      console.log(`validateSignUpRequest:: Phone is not valid. data:: `, data);

      throw new Exception(UserConstants.MESSAGES.INVALID_PHONE, ErrorCodes.BAD_REQUEST, { reportError: true }).toJson();

    }

    if (!Validators.isValidStr(data.password)) {

      console.log(`validateSignUpRequest:: Password is not valid. data:: `, data);

      throw new Exception(UserConstants.MESSAGES.INVALID_PASSWORD, ErrorCodes.BAD_REQUEST, { reportError: true }).toJson();

    }

    if (!Validators.isValidStr(data.first_name)) {

      console.log(`validateSignUpRequest:: First name is required. data:: `, data);

      throw new Exception(UserConstants.MESSAGES.FIRST_NAME_IS_REQUIRED, ErrorCodes.BAD_REQUEST, { reportError: true }).toJson();

    }

    if (data.middle_name && !Validators.isValidStr(data.middle_name)) {

      console.log(`validateSignUpRequest:: Invalid middle name. data:: `, data);

      throw new Exception(UserConstants.MESSAGES.INAVALID_MIDDLE_NAME, ErrorCodes.BAD_REQUEST, { reportError: true }).toJson();

    }

    if (data.ssn_or_tin && !Validators.isValidStr(data.ssn_or_tin)) {

      console.log(`validateSignUpRequest:: Invalid SSN or TIN. data:: `, data);

      throw new Exception(UserConstants.MESSAGES.INAVALID_SSN_OR_TIN, ErrorCodes.BAD_REQUEST, { reportError: true }).toJson();

    }

    if (!Validators.isValidStr(data.last_name)) {

      console.log(`validateSignUpRequest:: Last name is required. data:: `, data);

      throw new Exception(UserConstants.MESSAGES.LAST_NAME_IS_REQUIRED, ErrorCodes.BAD_REQUEST, { reportError: true }).toJson();

    }

  }

  static validateLoginRequest (user, data) {

    if (!data) {

      console.log(`validateSignUpRequest:: Invalid data to login user. data:: `, data);

      throw new Exception(UserConstants.MESSAGES.INVALID_DATA_TO_LOGIN, ErrorCodes.BAD_REQUEST, { reportError: true }).toJson();

    }

    if (!Validators.isValidateEmail(data.email)) {

      console.log(`validateSignUpRequest:: Invalid email to login user. data:: `, data);

      throw new Exception(UserConstants.MESSAGES.INVALID_EMAIL, ErrorCodes.BAD_REQUEST, { reportError: true }).toJson();

    }

    if (!user) {

      console.log(`validateSignUpRequest:: No user exist with this email. users:: ${JSON.stringify(user)} data:: `, data);

      throw new Exception(UserConstants.MESSAGES.USER_DOES_NOT_EXIST, ErrorCodes.BAD_REQUEST, { reportError: true }).toJson();

    }

  }

  static validateForgotPasswordRequest (user, data) {

    if (!data) {

      console.log(`validateSignUpRequest:: Invalid data to send forgot password email. data:: `, data);

      throw new Exception(UserConstants.MESSAGES.INVALID_DATA_TO_RECOVER_PASSWORD, ErrorCodes.BAD_REQUEST, { reportError: true }).toJson();

    }

    if (!Validators.isValidateEmail(data.email)) {

      console.log(`validateSignUpRequest:: Invalid email to recover password. data:: `, data);

      throw new Exception(UserConstants.MESSAGES.INVALID_EMAIL, ErrorCodes.BAD_REQUEST, { reportError: true }).toJson();

    }

    if (!user) {

      console.log(`validateSignUpRequest:: No user exist with this email. users:: ${JSON.stringify(user)} data:: `, data);

      throw new Exception(UserConstants.MESSAGES.USER_DOES_NOT_EXIST, ErrorCodes.BAD_REQUEST, { reportError: true }).toJson();

    }

  }

  static validateConfirmEmailRequest (user, decoded, data) {

    if (!data) {

      console.log(`validateConfirmEmailRequest:: Invalid data to confirm email. data:: `, data);

      throw new Exception(UserConstants.MESSAGES.INVALID_DATA_TO_CONFIRM_EMAIL, ErrorCodes.BAD_REQUEST, { reportError: true }).toJson();

    }

    if (!data.confirmation_token) {

      console.log(`validateConfirmEmailRequest:: Invalid confirmation token provided. data:: `, data);

      throw new Exception('Invalid confirmation token provided.', ErrorCodes.BAD_REQUEST, { reportError: true }).toJson();

    }

    if (!decoded || !decoded.email) {

      console.log(`validateConfirmEmailRequest:: The token has expired. data:: `, data);

      throw new Exception(UserConstants.MESSAGES.TOKEN_HAS_EXPIRED, ErrorCodes.CONFLICT_WITH_CURRENT_STATE, { reportError: true }).toJson();

    }

    if (!user) {

      console.log(`validateConfirmEmailRequest:: No sign up request received for this email. users:: ${JSON.stringify(user)} data:: `, data);

      throw new Exception('No sign up request received for this email', ErrorCodes.BAD_REQUEST, { reportError: true }).toJson();

    }

  }

  static validateResetPasswordTokenVerificationRequest (user, decoded, resetPasswordToken) {

    if (!resetPasswordToken) {

      console.log(`validateResetPasswordTokenVerificationRequest:: Invalid reset password token provided. resetPasswordToken:: `, resetPasswordToken);

      throw new Exception('Invalid reset password token provided', ErrorCodes.BAD_REQUEST, { reportError: true }).toJson();

    }

    if (!user) {

      console.log(`validateResetPasswordTokenVerificationRequest:: User not found with this email or expiry token. users:: ${JSON.stringify(user)} resetPasswordToken:: ${resetPasswordToken} decoded:: `, decoded);

      throw new Exception(UserConstants.MESSAGES.USER_DOES_NOT_EXIST, ErrorCodes.BAD_REQUEST, { reportError: true }).toJson();

    }

    if (!decoded || !Validators.isNumber(decoded.id) || !decoded.email) {

      console.log(`validateResetPasswordTokenVerificationRequest:: The token has expired. decoded:: `, decoded);

      throw new Exception(UserConstants.MESSAGES.TOKEN_HAS_EXPIRED, ErrorCodes.BAD_REQUEST, { reportError: true }).toJson();

    }

  }

  static validateResetPasswordRequest (user, decoded, data) {

    if (!data) {

      console.log(`validateResetPasswordRequest:: Invalid data to reset password. data:: `, data);

      throw new Exception(UserConstants.MESSAGES.INVALID_DATA_TO_RESET_PASSWORD, ErrorCodes.BAD_REQUEST, { reportError: true }).toJson();

    }

    if (!decoded || !Validators.isNumber(decoded.id) || !decoded.email) {

      console.log(`validateResetPasswordRequest:: The token has expired. decoded:: `, decoded);

      throw new Exception(UserConstants.MESSAGES.TOKEN_HAS_EXPIRED, ErrorCodes.BAD_REQUEST, { reportError: true }).toJson();

    }

    if (!user) {

      console.log(`validateResetPasswordRequest:: User does not exist. users:: ${JSON.stringify(user)} data:: `, data);

      throw new Exception(UserConstants.MESSAGES.USER_DOES_NOT_EXIST, ErrorCodes.BAD_REQUEST, { reportError: true }).toJson();

    }

  }

  static setUserResponse (user, accounts, paymentSources, mailNotifications, smsNotifications) {

    const resUser = {};
    resUser.id = user.id;
    resUser.email = user.email;
    resUser.avatar_url = user.avatar_url || '';
    resUser.has_uploaded_avatar = false;
    if (Validators.isValidStr(resUser.avatar_url)) {

      resUser.has_uploaded_avatar = true;

    }
    resUser.api_key = user.api_key;
    resUser.confirmation_token = user.confirmation_token;
    resUser.first_name = user.first_name;
    resUser.middle_name = user.middle_name;
    resUser.last_name = user.last_name;
    resUser.address_1 = user.address_1;
    resUser.address_2 = user.address_2;
    resUser.city = user.city;
    resUser.state = user.state;
    resUser.zip = user.zip;
    resUser.birth_date = user.birth_date;
    resUser.phone = user.phone;
    resUser.ssn_or_tin = user.ssn_or_tin;
    resUser.created_at = user.created_at;
    resUser.updated_at = user.updated_at;
    resUser.password_set_by_user = user.password_set_by_user || true;
    resUser.connected_to_facebook = user.connected_to_facebook || false;
    resUser.track_goals = user.track_goals;
    resUser.accounts = accounts || [];
    resUser.payment_sources = paymentSources || [];
    resUser.mail_notifications = mailNotifications || [];
    resUser.sms_notifications = smsNotifications || [];

    return resUser;

  }

  static transformUsersData (users) {

    if (!Array.isArray(users) || !users.length) {

      return users;

    }

    return users.map(user => AuthUtil.transformUserData(user));

  }

  static transformUserData (user) {

    if (!user) {

      return user;

    }

    delete user.password;

    return user;

  }

}

module.exports = AuthUtil;
