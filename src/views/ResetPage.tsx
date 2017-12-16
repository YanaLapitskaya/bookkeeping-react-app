import * as React from 'react';
import API from '../API';
import {withRouter} from 'react-router';

interface ResetProps {
    token: string;
    match: any;
    location: any;
    history: any;
}

interface ResetState {
    password: string;
    error: string;
}

class ResetPage extends React.Component<ResetProps, ResetState> {
    constructor(props: any) {
        super(props);
        this.state = {
            password: '',
            error: ''
        };
    }

    handleChange(e: any) {
        let target = e.target.value;
        this.setState({password: target});
    }

    handleClick(){
        let password = {
            password: this.state.password,
        };

        API.post(`/api/v1/auth/reset/{token}`, password)
            .then((res: any) => {
                if (res.status === 200) {
                    alert('Password was updated');
                    this.props.history.push('/dashboard');
                }
                else if (res.status === 400) {
                    this.setState({error: 'Password reset token is invalid or has expired'});
                } else {
                    console.log(res);
                }
            })
            .catch((e) => {
                console.log(e);
            });
    }

    render() {
        return (
            <div className="form-signin">
                <h2 className="form-signin-heading">Enter a new password</h2>
                {this.state.error &&
                    <div className="alert alert-danger">
                        {this.state.error}.
                    </div>
                }
                <input type="password"
                    className="form-control"
                    name="password"
                    placeholder="New password"
                    required={true}
                    onChange={(e) => {this.handleChange(e); }}
                />
                <button className="btn btn-lg btn-primary btn-block"
                    onClick={() => {this.handleClick(); }}
                >
                    Login
                </button>
            </div>
        );
    }
}

export default withRouter(ResetPage);