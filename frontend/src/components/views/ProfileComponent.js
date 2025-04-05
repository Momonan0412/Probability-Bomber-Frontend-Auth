import React, { Component } from 'react';
class Profile extends Component {
  render(){
    const createdDate = new Date(
      this.props.userData.createdAt._seconds * 1000 + this.props.userData.createdAt._nanoseconds / 1000000
    );
    const formattedDate = createdDate.toLocaleString(); // e.g. "4/6/2025, 10:30:15 AM"
    return(
    <div>
    <h1>User Profile</h1>
    <p>Email: {this.props.userData.email}</p>
    <p>Name: {this.props.userData.name}</p>
    <p>Created At: {formattedDate}</p>
    <button onClick={this.props.onUpdatePassword}>
      Update Password
    </button>
  </div>
    );
  }
}

export default Profile;