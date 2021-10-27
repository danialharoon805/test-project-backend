const bcrypt = require('bcrypt');
const querystring = require('querystring');

const {
  UserHandler
} = require('../../handlers');

const {
  AuthUtil
} = require('../../utilities');

const {
  ErrorCodes,
  UserConstants
} = require('../../constants');

const {
  Exception,
  Token,
  config
} = require('../../helpers');

class AuthManager {

  static async signup (data) {

    console.log(`signup:: Request to signup user. data:: `, data);

    let user = await UserHandler.findUserByEmail(data && data.email);

    if (user) {

      console.log(`signup:: User has already signed up. users:: ${JSON.stringify(user)} data:: `, data);

      throw new Exception(UserConstants.MESSAGES.USER_ALREADY_EXIST, ErrorCodes.CONFLICT_WITH_CURRENT_STATE, { reportError: true }).toJson();
    
    }

    data.password = await bcrypt.hash(data.password, 10);

    user = await UserHandler.createUser(data);

    console.log(`signup:: User successfully signed up. user:: `, user);

    return user;

  }

  
  static async login (data) {

    console.log(`login:: Request to login user. data:: `, data);

    let user = await UserHandler.findUserByEmail(data && data.email);

    if (!user) {

      console.log(`login:: Need to sign up first. users:: ${JSON.stringify(user)} data:: `, data);

      throw new Exception(UserConstants.MESSAGES.NEED_TO_SIGNUP_FIRST, ErrorCodes.BAD_REQUEST, { reportError: true }).toJson();

    }

    const passwordMatched = await bcrypt.compare(data.password, user.password);

    if (!passwordMatched) {

      console.log(`login:: Invalid password. users:: ${JSON.stringify(user)} data:: `, data);

      throw new Exception(UserConstants.MESSAGES.INVALID_EMAIL_OR_PASSWORD, ErrorCodes.BAD_REQUEST, { reportError: true }).toJson();

    }

    const token = Token.getLoginToken(user);

    await UserHandler.setApiKey(user.id, token);

    user = await UserHandler.findUserById(user.id);

    console.log(`login:: User successfully logged in. data:: `, data);

    return user;

  }

}

module.exports = AuthManager;
