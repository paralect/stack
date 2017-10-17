import React, { PureComponent } from 'react';
import Link from 'next/link';
import classNames from 'classnames/bind';
import Layout from '~/layouts/main';
import { setFormValue, formatError } from '~/helpers';
import { signin } from '~/resources/account/account.api';

export default class Signin extends PureComponent {
  constructor(...args) {
    super(...args);
    this.setFormValue = setFormValue.bind(this);
  }

  componentWillMount() {
    this.state = {
      isLoading: false,
      email: '',
      password: '',
      errorMessage: null,
      showEmailVerificationMessage: false,
    };
  }

  submitSignin = async (event) => {
    event.preventDefault();

    this.setState({
      isLoading: true,
    });

    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 500);
    });

    try {
      await signin({
        email: this.state.email,
        password: this.state.password,
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

    return (
      <Layout>
        <div className="auth page">
          <style jsx>{`
            @keyframes HueRotate {
              0% {
                filter: hue-rotate(0deg)
              }
              25% {
                filter: hue-rotate(45deg)
              }

              50% {
                filter: hue-rotate(90deg)
              }

              75% {
                filter: hue-rotate(45deg)
              }

              100% {
                filter: hue-rotate(0deg)
              }
            }

            :root {
              --breakpoint-small: 720px;
            }

            @custom-media --navbar-height-reached (height <= 600px);

            .page {
              background-color: var(--color-brand);

              & .panel {
                width: 850px;

                & img {
                  min-width: 400px;
                }

                & .form-wrap {
                  display: flex;
                  flex-direction: column;
                  padding: 0 30px;
                  justify-content: center;
                  align-items: center;
                  width: 100%;
                  height: 100%;

                  & form {
                    & button {
                      background-image: linear-gradient(to right, rgba(90,97,241,0.9) 0%, #7a00ff 100%);
                    }

                    & .forgot {
                      width: 100%;
                      text-align: right;
                    }

                    & .signup {
                      width: 100%;
                      text-align: center;
                      margin-top: 2rem;
                    }
                  }
                }
              }
            }
          `}</style>

          <div className="panel">
            <img className="greeting" alt="Welcome Back" src="/static/password.jpg" />

            <div className="form-wrap">
              <h2> Welcome Back! </h2>

              <form className="form" onSubmit={this.submitSignin}>
                <input
                  value={this.state.email}
                  onChange={this.setFormValue('email')}
                  required
                  placeholder="Email"
                  type="email"
                  className="input"
                />
                <input
                  value={this.state.password}
                  onChange={this.setFormValue('password')}
                  required
                  placeholder="Password"
                  type="password"
                  className="input"
                />

                {errorEl}

                <div className="forgot">
                  <a>Forgot Password?</a>
                </div>
                <div className="submit">
                  <button
                    action="submit"
                    className={classNames({
                      loading: this.state.isLoading,
                    })}
                    disabled={this.state.isLoading}
                  >
                    Let me in
                  </button>
                </div>

                <div className="signup">
                  <Link href="/signup">
                    <a>
                      {'Don\'t have an account? Sign Up'}
                    </a>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}
