import * as React from 'react';
import TransactionPanel from './transaction/TransactionPanel';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import TransactionEditPage from './transaction/TransactionEditPage';
import TransactionDetailsPage from './transaction/TransactionDetailsPage';
import CardPanel from './card/CardPanel';
import CardEditPage from './card/CardEditPage';
import Transaction from '../models/Transaction';
import Card from '../models/Card';

interface RouterProps {
    trans: Array<Transaction>;
    cards: Array<Card>;
    onTranAdd: Function;
    onCardAdd: Function;
}
export default class DashboardRouter extends React.Component<RouterProps, {}> {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route
                        exact={true}
                        path="/dashboard"
                        render={() =>
                            <TransactionPanel
                                onTranAdd={(tran: Transaction) => this.props.onTranAdd(tran)}
                                trans={this.props.trans}
                                cards={this.props.cards}
                            />}
                    />
                    <Route
                        exact={true}
                        path="/cards"
                        render={() =>
                            <CardPanel
                                onCardAdd={(card: Card) => this.props.onCardAdd(card)}
                                cards={this.props.cards}
                            />}
                    />
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
                    <Route
                        exact={true}
                        path={`/card/:id`}
                        render={
                            ({match: {params: {id}}}) => {
                                return   <CardEditPage id={id} match={null} location={null} history={null} />;
                            }}
                    />
                </Switch>
            </BrowserRouter>
        );
    }
}