import * as React from 'react';
import {  Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import DashboardPage from './views/DashboardPage';
import ForgotPasswordPage from './views/ForgotPasswordPage';
import LoginPage from './views/LoginPage';
import SignupPage from './views/SignupPage';
import ResetPage from './views/ResetPage';

export default class AppRouter extends React.Component {
    constructor(props: {}) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    //auth routes
                    <Route exact={true} path="/login" render={() => <LoginPage match={null} location={null} history={null} />} />
                    <Route exact={true} path="/signup" render={() => <SignupPage match={null} location={null} history={null} />} />
                    <Route exact={true} path="/forgot" render={() => <ForgotPasswordPage />} />
                    <Route
                        exact={true}
                        path={`/reset/:token`}
                        render={
                            ({match: {params: {token}}}) => {
                                return <ResetPage token={token} match={null} location={null} history={null} />;
                            }}
                    />

                    <Route exact={true} path="/dashboard" render={() => <DashboardPage />} />
                    <Route exact={true} path="*" render={() =>  <h1>404 not found</h1>} />
                </Switch>
            </BrowserRouter>
        );
    }
}