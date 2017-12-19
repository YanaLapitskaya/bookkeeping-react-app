import * as React from 'react';
import TransactionPanel from './TransactionPanel';
import Header from './Header';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import TransactionEditPage from './TransactionEditPage';
import TransactionDetailsPage from './TransactionDetailsPage';

export default class DashboardPage extends React.Component {
    render() {
        return (
            <div>
                <Header/>
                <BrowserRouter>
                    <Switch>
                        <Route exact={true} path="/dashboard" render={() => <TransactionPanel />} />
                        <Route
                            exact={true}
                            path={`/transaction/:id`}
                            render={
                                ({match: {params: {id}}}) => {
                                    return   <TransactionDetailsPage id={id} match={null} location={null} history={null} />;
                                }}
                        />
                        <Route
                            exact={true}
                            path={`/transaction/:id/edit`}
                            render={
                                ({match: {params: {id}}}) => {
                                    return <TransactionEditPage id={id} match={null} location={null} history={null} />;
                                }}
                        />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}