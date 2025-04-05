import React, {Component} from 'react';
// In App.js or wherever you're calling signInWithEmailAndPassword

import { auth } from "./firebaseConfig"; // ✅ Adjust if in different folder
import { signInWithEmailAndPassword } from "firebase/auth"; // ✅ This stays from "firebase/auth"

import LoginForm from './forms/LoginForm';  // import LoginForm component
import RegisterForm from './forms/RegisterForm';  // import RegisterForm component
import Password from './forms/UpdatePasswordForm';  // import Password component
import ForgotPassword from './forms/ForgotPasswordForm';  // import ForgotPassword component
import Profile from './components/ProfileComponent';  // import Profile component
import PasswordResetLink from './components/PasswordResetLinkComponent';  // import Profile component

import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import api from './api'; // Importing api from api.js

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',      // Renamed name to userName
      email: '',
      password: '',
      error: null,
      userData: null,
      currentView: 'login',  // Can be 'login', 'register', or 'profile'
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  loginUser = async () => {
    try {
      const { email, password } = this.state;

      // Step 1: Sign in with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Step 2: Get Firebase ID Token
      const token = await user.getIdToken();

      // Optional: Save token locally
      localStorage.setItem("token", token);

      const response = await api.post(`/auth/login/`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
        
      console.log("User Profile: ", response.data.userData.name);
      console.log("User Profile: ", response.data.userData.email);
      console.log("User Profile: ", response.data.userData.createdAt);

      this.setState({
        userData: response.data.userData, // Backend returns user data after token verification
        currentView: "profile",
      });

    } catch (error) {
      console.error("Login failed:", error.response ? error.response.data : error.message);
      this.setState({ error: error.message });
    }
  }

  registerUser = async () => {
    try {
      const data = await api.post(`/auth/register/`, {
        name: this.state.userName,  // Use userName instead of name
        email: this.state.email,
        password: this.state.password,
      });

      console.log("Register successful:", data);
      this.setState({ currentView: 'login' });  // Redirect to login after successful registration
    } catch (error) {
      console.error("Registration failed:", error.message);
      this.setState({ error: error.message });
    }
  };

  updatePassword = async () => {
    try {
      // const token = localStorage.getItem("token");
      const data = await api.post(`/auth/reset_password/`, {
        newPassword: this.state.password,        
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      })
      console.log("Update Password Data: ", data)
      this.setState({ currentView: 'login' }); 
    } catch (error) {
      console.error("Registration failed:", error.message);
      this.setState({ error: error.message });
    }
  }

  forgotPassword = async () => {
    try {
      console.log("Email Passed: ", this.state.email);
      const data = await api.post(`/auth/forget_password/`, {
        email: this.state.email
      });
      console.log(data.data.resetLink)
      this.setState({
        userData: data.data.resetLink, // Backend returns user data after token verification
        currentView: "password_reset_link",
      });
    } catch (error) {
      console.error("Registration failed:", error.message);
      this.setState({ error: error.message });
    }
  }
  render() {
    const { userName, email, password, error, userData, currentView } = this.state;

    return (
      <div>
        {currentView === 'login' && (
          <LoginForm
            email={email}
            password={password}
            onChange={this.handleChange}
            onLogin={this.loginUser}
            onForgotPassword={(newState) => this.setState(newState)}
            error={error}
          />
        )}
        {currentView === 'register' && (
          <RegisterForm
            userName={userName}      // Pass userName instead of name
            email={email}
            password={password}
            onChange={this.handleChange}
            onRegister={this.registerUser}
            error={error}
          />
        )}
        {currentView === 'profile' && (
          <Profile 
          userData={userData}
          onUpdatePassword={(newState) => this.setState(newState)} 
          />
        )}
        {currentView === 'password' && (
          <Password
            password={password}
            onChange={this.handleChange}
            onUpdate={this.updatePassword}
          />
        )}
        {currentView === 'forgot_password' && (
            <ForgotPassword
            email={email}
            onChange={this.handleChange}
            onForgotPassword={this.forgotPassword}
          />
        )}
        {currentView === 'password_reset_link' && (
            <PasswordResetLink
            userData={userData}
            onLogin={(newState) => this.setState(newState)}
          />
        )}
      </div>
    );
  }
}

export default App;
