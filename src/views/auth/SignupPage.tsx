import * as React from 'react';
import API from '../../API';
import { withRouter } from 'react-router';

interface SignupProps {
    match: any;
    location: any;
    history: any;
}

interface SignupState {
    email: string;
    password: string;
    confirmPassword: string;
    error: string;
}

class Signup extends React.Component<SignupProps, SignupState> {
    constructor(props: any) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            error: ''
        };
    }

    handleChange(stateName: String, e: any) {
        let target = e.target.value;
        if (stateName === 'email') {
            this.setState({email: target});
        } else if (stateName === 'password') {
            this.setState({password: target});
        } else {
            this.setState({confirmPassword: target});
        }
    }

    handleClick(e: any) {
        let user = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        };

        API.put('/api/v1/auth/signup', user)
            .then((res: any) => {
                if (res.status === 200) {
                    this.props.history.push('/dashboard');
                } else if (res.status === 400) {
                    this.setState({error: 'Account with that email address already exists'});
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
        <div className="wrapper">
            <h2 className="form-signin-heading">Create a new account</h2>
            {this.state.error &&
            <div className="alert alert-danger">
                {this.state.error}.
                </div>
            }
            <input
                type="text"
                className="form-control"
                name="email"
                placeholder="Email Address"
                required={true}
                onChange={(e) => {this.handleChange('email', e); }}
            />
            <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Password"
                required={true}
                onChange={(e) => {this.handleChange('password', e); }}
            />
            <input
                type="password"
                className="form-control"
                name="confirmPassword"
                placeholder="Confirm password"
                required={true}
                onChange={(e) => {this.handleChange('confirmPassword', e); }}
            />
            <button
                className="btn btn-lg btn-primary btn-block"
                onClick={(e) => {this.handleClick(e); }}
            >
                Login
            </button>
        </div>
        );
    }
}

export default withRouter(Signup);