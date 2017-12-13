import * as React from 'react';
//import API from '../API';

export default class Header extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }
    login() {
        const user = {
            email: 'yana@gmail.com',
            password: 'yana'
        };
        //let form = new FormData(document.getElementById('form') as HTMLFormElement);

        fetch('http://localhost:8080/api/v1/auth/login',
              {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body:  JSON.stringify(user)
            })
            .then(function(res) {
                return res.json();
            })
            .catch((e) => {
                console.log(e);
            });

        //API.get('/api/v1/auth/login').then((res) => alert(res)).catch((e) => alert(e));
    }
    render() {
        return (
            <div className="container">
            <div className="row">
                <div className="span12">
                <form className="htmlForm-horizontal" id="loginForm" onSubmit={this.login}>
                    <fieldset>
                        <div id="legend">
                    <legend className="">Login</legend>
                        </div>
                        <div className="control-group">
                    <label className="control-label"  htmlFor="username">Username</label>
                        <div className="controls">
                    <input type="text" id="email" name="email" placeholder="Email" className="input-xlarge" /*onChange={(event: any,newValue:String) => this.setState({email:newValue})*//>
                        </div>
                        </div>
                        <div className="control-group">
                    <label className="control-label" htmlFor="password">Password</label>
                        <div className="controls">
                    <input type="password" id="password" name="password" placeholder="" className="input-xlarge"/>
                        </div>
                        </div>
                        <div className="control-group">
                    <div className="controls">
                    <button className="btn btn-success">Login</button>
                        </div>
                        </div>
                        </fieldset>
                    </form>
                </div>
             </div>
         </div>
        );

    }
}