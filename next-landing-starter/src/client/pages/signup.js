import React, { PureComponent } from 'react';
import classNames from 'classnames/bind';
import Layout from '~/layouts/main';
import { setFormValue, formatError } from '~/helpers';
import { signup } from '~/resources/account/account.api';
import { buildUrl } from '~/helpers/apiClient';

export default class Signup extends PureComponent {
  constructor(...args) {
    super(...args);
    this.setFormValue = setFormValue.bind(this);
  }

  componentWillMount() {
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      isLoading: false,
      errorMessage: null,
      signupSuccess: false,
    };
  }

  submitSignup = async (event) => {
    event.preventDefault();
    this.setState({
      isLoading: true,
    });
    try {
      const signupResult = await signup({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
      });

      this.setState({
        signupSuccess: true,
        _signupToken: signupResult._signupToken,
      });
    } catch (err) {
      this.setState({
        errorMessage: formatError(err),
      });
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  }

  render() {
    const errorEl = this.state.errorMessage ? (
      <div className="error">
        {this.state.errorMessage}
      </div>
    ) : null;

    const devVerifyEmailLink = this.state._signupToken ?
      buildUrl(`/account/verifyEmail/${this.state._signupToken}`) :
      null;

    const devVerifyEmailLinkEl = devVerifyEmailLink && (
      <a href={devVerifyEmailLink}> Verify email (dev) </a>
    );

    return (
      <Layout>
        <div className="auth page">
          <style jsx>{`
            .page {
              background: var(--color-secondary);

              & .panel {
                height: 600px;
                width: 1014px;

                & img {
                  min-width: 450px;
                }

                & form {
                  & button {
                    background-image: linear-gradient(to right, #18c76d 0%, #08af81 100%);
                  }

                  & .input:first-child {
                    margin-right: 1em;
                  }

                  & .names {
                    display: flex;
                    & .input {
                      width: 50%;
                    }
                  }
                }

                & .signup-success {
                  margin: auto;
                  width: 100%;
                  padding: 30px;
                }
              }
            }
          `}</style>

          <div className="panel">
            {this.state.signupSuccess ? (
              <div className="signup-success">
                <h2> Thank you for signing up! </h2>
                <p>
                  The verification email has been sent to {this.state.email}. <br />
                  Please follow the instructions from the email to complete a signup process.
                </p>
                {devVerifyEmailLinkEl}
              </div>
            ) : (
              <div className="form-wrap">
                <h2> Sign Up </h2>

                <form onSubmit={this.submitSignup} className="form">
                  <div className="names">
                    <input
                      value={this.state.firstName}
                      onChange={this.setFormValue('firstName')}
                      required
                      type="text"
                      placeholder="First Name"
                      className="input"
                    />
                    <input
                      value={this.state.lastName}
                      onChange={this.setFormValue('lastName')}
                      required
                      type="text"
                      placeholder="Last Name"
                      className="input"
                    />
                  </div>
                  <input
                    value={this.state.email}
                    onChange={this.setFormValue('email')}
                    required
                    type="email"
                    placeholder="Email"
                    className="input"
                  />
                  <input
                    value={this.state.password}
                    onChange={this.setFormValue('password')}
                    required
                    type="password"
                    placeholder="Password"
                    className="input"
                  />

                  {errorEl}

                  <button
                    action="submit"
                    className={classNames({
                      loading: this.state.isLoading,
                    })}
                    disabled={this.state.isLoading}
                  >
                    Join
                  </button>
                </form>
              </div>
            )}
            <img alt="signup" src="/static/postman.jpg" />
          </div>
        </div>
      </Layout>
    );
  }
}
