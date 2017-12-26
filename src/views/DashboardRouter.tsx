import * as React from 'react';
import TransactionPanel from './transaction/TransactionPanel';
import { Redirect, Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import TransactionEditPage from './transaction/TransactionEditPage';
import TransactionDetailsPage from './transaction/TransactionDetailsPage';
import CardPanel from './card/CardPanel';
import CardEditPage from './card/CardEditPage';
import Transaction from '../models/Transaction';
import Card from '../models/Card';
import Saving from '../models/Saving';
import SavingsPanel from './savings/SavingsPanel';

interface RouterProps {
    trans: Array<Transaction>;
    cards: Array<Card>;
    savings: Array<Saving>;
    onTranAdd: Function;
    onTranEdit: Function;
    onTranDelete: Function;
    onCardAdd: Function;
    onCardEdit: Function;
    onCardDelete: Function;
    onSavingAdd: Function;
    onSavingEdit: Function;
}
export default class DashboardRouter extends React.Component<RouterProps, {}> {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route
                        exact={true}
                        path="/dashboard/transactions"
                        render={() =>
                            <TransactionPanel
                                onTranAdd={(tran: Transaction) => this.props.onTranAdd(tran)}
                                trans={this.props.trans}
                                cards={this.props.cards}
                            />}
                    />
                    <Route
                        exact={true}
                        path="/dashboard/cards"
                        render={() =>
                            <CardPanel
                                onCardAdd={(card: Card) => this.props.onCardAdd(card)}
                                cards={this.props.cards}
                            />}
                    />
                    <Route
                        exact={true}
                        path={`/dashboard/transaction/:id`}
                        render={
                        ({match: {params: {id}}}) => {
                            return <TransactionDetailsPage
                                id={id}
                                cards={this.props.cards}
                                onTranDelete={(tran: Transaction, history: any) =>
                                    this.props.onTranDelete(tran, history)}
                                match={null}
                                location={null}
                                history={null}
                            />;
                        }}
                    />
                    <Route
                        exact={true}
                        path={`/dashboard/transaction/:id/edit`}
                        render={
                        ({match: {params: {id}}}) => {
                            return <TransactionEditPage
                                id={id}
                                cards={this.props.cards}
                                onTranEdit={(tran: Transaction, history: any) =>
                                    this.props.onTranEdit(tran, history)}
                                match={null}
                                location={null}
                                history={null}
                            />;
                        }}
                    />
                    <Route
                        exact={true}
                        path={`/dashboard/card/:id`}
                        render={
                            ({match: {params: {id}}}) => {
                                return <CardEditPage
                                    id={id}
                                    onCardEdit={(card: Card, history: any) =>
                                        this.props.onCardEdit(card, history)}
                                    onCardDelete={(card: Card, history: any) =>
                                        this.props.onCardDelete(card, history)}
                                    match={null}
                                    location={null}
                                    history={null}
                                />;
                            }}
                    />
                    <Route
                        exact={true}
                        path="/dashboard/savings"
                        render={() =>
                            <SavingsPanel
                                savings={this.props.savings}
                                onSavingAdd={this.props.onSavingAdd}
                                onSavingEdit={this.props.onSavingEdit}
                            />}
                    />
                    <Redirect exact={true} from="/dashboard" to="/dashboard/transactions" />
                    <Route exact={true} path="/dashboard/*" render={() =>  <h1>404 not found</h1>} />
                </Switch>
            </BrowserRouter>
        );
    }
}