import * as React from 'react';
import API from '../API';

interface LoginState {
    email: string;
    password: string;
    error: string;
}
export default class Login extends React.Component<{}, LoginState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            email: 'yana@gmail.com',
            password: 'yana',
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
                    alert('hello');
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
                            type="submit"
                            onClick={() => {this.handleClick(); }}
                    >
                        Login
                    </button>
                </div>
            </div>
        );
    }
}
