import * as React from 'react';
import API from '../../API';

interface ResetState {
    email: string;
    error: string;
}

export default class ForgotPasswordPage extends React.Component<{}, ResetState> {
    constructor(props: any) {
        super(props);
        this.state = {
            email: '',
            error: ''
        };
    }

    handleChange(e: any) {
        let target = e.target.value;
        this.setState({email: target});
    }

    handleClick(){
        let email = {
            email: this.state.email,
        };

        API.post('/api/v1/auth/forgot', email)
            .then((res: any) => {
                if (res.status === 200) {
                    alert('message was sent');
                } else if (res.status === 400) {
                    this.setState({error: 'Account with that email address does not exist'});
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
                <h2 className="form-signin-heading">Enter your email</h2>
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
                    onChange={(e) => {this.handleChange(e); }}
                />
                <button
                    className="btn btn-lg btn-primary btn-block"
                    onClick={() => {this.handleClick(); }}
                >
                    Login
                </button>
            </div>
        );
    }
}