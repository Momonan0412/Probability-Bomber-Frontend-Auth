import React, { Component } from 'react';

class LoginForm extends Component {
  render() {
    return (
      <div>
        <input
          type="email"
          name="email"
          value={this.props.email}
          onChange={this.props.onChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          // value={this.props.password}
          onChange={this.props.onChange}
          placeholder="Password"
        />
        <button onClick={this.props.onLogin}>Login</button>
        <button onClick={() => this.props.onForgotPassword({ currentView: "forgot_password" })}>
          Update Password
        </button>
        {this.props.error && <p>Error: {this.props.error}</p>}
      </div>
    );
  }
}

export default LoginForm;