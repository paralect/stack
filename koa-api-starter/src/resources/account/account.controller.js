const signinValidator = require('./validators/signin.validator');
const signupValidator = require('./validators/signup.validator');
const forgotValidator = require('./validators/forgotPassword.validator');
const resetValidator = require('./validators/resetPassword.validator');
const verifyEmailValidator = require('./validators/verifyEmail.validator');
const userService = require('resources/user/user.service');
const authService = require('auth.service');
const securityUtil = require('security.util');
const emailService = require('email.service');
const config = require('config');

async function createUserAccount(userData) {
  const salt = await securityUtil.generateSalt();
  const hash = await securityUtil.getHash(userData.password, salt);

  const signupToken = await securityUtil.generateSecureToken();

  const user = await userService.create({
    firstName: userData.firstName,
    lastName: userData.lastName,
    passwordHash: hash.toString(),
    passwordSalt: salt.toString(),
    email: userData.email,
    isEmailVerified: false,
    signupToken,
  });

  await emailService.sendSignupWelcome({ email: user.email, signupToken });

  return user;
}

/**
* Create user, company, default app, send signup confirmation email and
* create auth token for user to login
*
* @param email {string} User email
* @return {loginUrl} url that can be used to login user
*/
exports.signup = async function signup() {
  const userData = await signupValidator(this);

  if (!userData.isValid) {
    return;
  }

  await createUserAccount(userData);
  this.status = 200;
};

/**
* Verify user's email when user click a link from email
* sets `emailVerified` to true if token is valid
*
* @param token {string} the signupToken
*/
exports.verifyEmail = async function verifyEmail() {
  const data = await verifyEmailValidator(this);
  if (!data.isValid) {
    return;
  }
  const user = await userService.markEmailAsVerified(data.userId);

  const token = authService.createAuthToken({
    userId: user._id,
  });
  const loginUrl = `http://web_url?token=${token}`;

  this.redirect(`${loginUrl}&emailVerification=true`);
};

/**
* Sign in user
* Loads user by email and compare password hashes
*
* @param email {string} User email
* @param password {string} User password
* @return {redirectUrl} url, that auto-login user
*/
module.exports.signin = async function signin() {
  const data = await signinValidator(this);

  if (!data.isValid) {
    return;
  }

  const user = await userService.findOne({ _id: data.userId });
  const token = authService.createAuthToken({
    userId: user._id,
  });

  this.body = {
    email: data.email,
    isEmailVerified: data.isEmailVerified,
    token,
  };
};

module.exports.logout = async function logout() {
  this.cookies.set(config.authCookieName, '', { expires: new Date(1) });
  this.redirect(config.landingUrl);
};

/**
* Send forgot password email with a unique link to set new password
* If user is found by email - sends forgot password email and update
* `forgotPasswordToken` field. If user not found, still return 200 response
*
* @param email {string} User email
*
* @return {} empty response
*/
module.exports.forgotPassword = async function forgotPassword() {
  const data = await forgotValidator(this);
  if (!data.isValid) {
    return;
  }

  const user = await userService.findOne({ email: data.email });
  let resetPasswordToken;
  if (user) {
    resetPasswordToken = user.resetPasswordToken;
    if (!resetPasswordToken) {
      resetPasswordToken = await securityUtil.generateSecureToken();
      await userService.updateResetPasswordToken(user._id, resetPasswordToken);
    }
    await emailService.sendForgotPassword(user, resetPasswordToken);
  }

  this.body = {};
};

/**
* Updates user password, used in combination with forgotPassword
*
* @param password {string} User password
* @param passwordConfirm {string} User password confirmation
* @param token {string} resetPasswordToken (verification token)
*
*/
module.exports.resetPassword = async function resetPassword() {
  const data = await resetValidator(this);
  if (!data.isValid) {
    return;
  }
  const {
    userId,
    password,
  } = data;

  await userService.updatePassword(userId, password);
  await userService.updateResetPasswordToken(userId, '');

  this.body = {};
};

exports.resendVerification = async function resendVerification() {
  const email = this.request.body.email;

  const user = await userService.findOne({ email });

  if (user) {
    await emailService.sendSignupWelcome({ email, signupToken: user.signupToken });
  }

  this.body = {};
};
