import React, { Component } from 'react';

class RegisterForm extends Component {
  render() {
    return (
      <div>
        <input
          type="text"
          name="userName"          // Use userName instead of name
          value={this.props.userName}
          onChange={this.props.onChange}
          placeholder="Name"
        />
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
          value={this.props.password}
          onChange={this.props.onChange}
          placeholder="Password"
        />
        <button onClick={this.props.onRegister}>Register</button>
        {this.props.error && <p>Error: {this.props.error}</p>}
      </div>
    );
  }
}

export default RegisterForm;
