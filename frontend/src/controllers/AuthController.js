import * as AuthService from '../services/AuthenticationService';

import ViewStates from '../enums/ViewStates';

export const loginUser = async (component) => {
  try {
    console.log("Hello Debugging 101!");
    const { email, password } = component.state;
    const token = await AuthService.firebaseLoginAndGetToken(email, password);
    localStorage.setItem("token", token);

    const response = await AuthService.loginWithToken(token);
    console.log("Hello Debugging 102!", response);
    const userData = response.data.userData;
    
    component.setState({
      userData,
      currentView: ViewStates.PROFILE,
    });

  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
    component.setState({ error: error.message });
  }
};

export const registerUser = async (component) => {
  try {
    const { userName, email, password } = component.state;
    await AuthService.registerUser(userName, email, password);
    component.setState({ currentView: ViewStates.LOGIN });
  } catch (error) {
    console.error("Registration failed:", error.message);
    component.setState({ error: error.message });
  }
};

export const updatePassword = async (component) => {
  try {
    const { password } = component.state;
    await AuthService.resetPassword(password);
    component.setState({ currentView: ViewStates.LOGIN });
  } catch (error) {
    console.error("Password update failed:", error.message);
    component.setState({ error: error.message });
  }
};

export const forgotPassword = async (component) => {
  try {
    const { email } = component.state;
    const response = await AuthService.forgotPassword(email);
    component.setState({
      userData: response.data.resetLink,
      currentView: ViewStates.PASSWORD_RESET_LINK,
    });
  } catch (error) {
    console.error("Forgot password failed:", error.message);
    component.setState({ error: error.message });
  }
};
