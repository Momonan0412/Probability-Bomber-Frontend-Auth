import React, { Component } from 'react';
class PasswordResetLinkComponent extends Component {
  render(){
    return(
    <div>
        <a href={this.props.userData} target="_blank" rel="noopener noreferrer">
          Reset Password Link
        </a>
        <br/>
        <button onClick={() => this.props.onLogin({ currentView: "login" })}>
        Login
        </button>
    </div>
    );
  }
}

export default PasswordResetLinkComponent;