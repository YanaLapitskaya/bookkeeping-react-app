import * as React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Login from './views/Login';
import TransactionPanel from './views/TransactionPanel';

export default class AppRouter extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact={true} path="/" render={() => <Login />} />

                    <Route exact={true} path="/dashboard" render={() => <TransactionPanel />} />
                </Switch>
            </BrowserRouter>
        );
    }
}