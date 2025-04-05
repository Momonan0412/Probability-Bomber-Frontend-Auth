import React, {Component} from "react";

class ForgotPasswordForm extends Component{
    render(){
        return(
            <div>
                <input
                type="email"
                name="email"
                // value={this.props.email}
                onChange={this.props.onChange}
                placeholder="Email"
                />
                <button onClick={this.props.onForgotPassword}>Confirm</button>
            </div>
        );
    }
}

export default ForgotPasswordForm;