import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import DashboardPage from './views/DashboardPage';
import ForgotPasswordPage from './views/auth/ForgotPasswordPage';
import LoginPage from './views/auth/LoginPage';
import SignupPage from './views/auth/SignupPage';
import ResetPage from './views/auth/ResetPage';

export default class AppRouter extends React.Component {
    constructor(props: {}) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    {/*auth routes*/}
                    <Route
                        exact={true}
                        path="/login"
                        render={() => <LoginPage match={null} location={null} history={null} />}
                    />
                    <Route
                        exact={true}
                        path="/signup"
                        render={() => <SignupPage match={null} location={null} history={null} />}
                    />
                    <Route exact={true} path="/forgot" render={() => <ForgotPasswordPage />} />
                    <Route
                        exact={true}
                        path={`/reset/:token`}
                        render={
                            ({match: {params: {token}}}) => {
                                return <ResetPage token={token} match={null} location={null} history={null} />;
                            }}
                    />

                    <Route
                        exact={false}
                        path="/dashboard"
                        render={() => <DashboardPage match={null} location={null} history={null} />}
                    />
                    <Redirect exact={true} from="/" to="/login" />
                    <Route exact={true} path="*" render={() =>  <h1>404 not found</h1>} />
                </Switch>
            </BrowserRouter>
        );
    }
}