import React, {Component} from "react";

class UpdatePasswordForm extends Component{
    render(){
        return(
            <div>
              <input
                type="password"
                name="password"
                onChange={this.props.onChange}
                placeholder="New Password"
              />
                <button onClick={this.props.onUpdate}>Confirm</button>
            </div>
        );
    }
}

export default UpdatePasswordForm;