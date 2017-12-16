import * as React from 'react';
import API from '../API';
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';

interface LoginProps {
    match: any;
    location: any;
    history: any;
}

interface LoginState {
    email: string;
    password: string;
    error: string;
}
class Login extends React.Component<LoginProps, LoginState> {
    constructor(props: any) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: ''
        };
    }

    handleChange(stateName: String, e: any) {
        let target = e.target.value;
        if (stateName === 'email') {
            this.setState({email: target});
        } else {
            this.setState({password: target});
        }
    }

    handleClick() {
        let user = {
            email: this.state.email,
            password: this.state.password
        };

        API.post('/api/v1/auth/login', user)
            .then((res: any) => {
                if (res.status === 200) {
                    console.log(this.props.history);
                    this.props.history.push('/dashboard');
                }
                else if (res.status === 400) {
                    this.setState({error: 'User not found'});
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
                <div className="form-signin">
                    <h2 className="form-signin-heading">Please login</h2>
                    {this.state.error &&
                        <div className="alert alert-danger">
                            {this.state.error}.
                        </div>
                    }
                    <input type="text"
                           className="form-control"
                           name="email"
                           placeholder="Email Address"
                           required={true}
                           onChange={(e) => {this.handleChange('email', e); }}
                    />
                    <input type="password"
                           className="form-control"
                           name="password"
                           placeholder="Password"
                           required={true}
                           onChange={(e) => {this.handleChange('password', e); }}
                    />
                    <button className="btn btn-lg btn-primary btn-block"
                            onClick={() => {this.handleClick(); }}
                    >
                        Login
                    </button>
                </div>
                <Link to="/signup">Sign up a new account</Link>
                <Link to="/forgot">Forgot your password?</Link>
            </div>
        );
    }
}

export default withRouter(Login);