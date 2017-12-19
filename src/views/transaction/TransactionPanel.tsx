import * as React from 'react';
import Transaction from '../../models/Transaction';
import Card from '../../models/Card';
import TransactionTable from './TransactionTable';
import TransactionForm from './TransactionForm';
import { Link } from 'react-router-dom';

interface PanelProps {
    trans: Array<Transaction>;
    cards: Array<Card>;
    onTranAdd: Function;
}

export default class TransactionPanel extends React.Component<PanelProps, {}> {
    render() {
        return (
            <div>
                <div>
                    <ul className="nav nav-pills">
                        <li role="presentation" className="active"><a href="#">Transactions</a></li>
                        <li role="presentation">
                            <Link to={`/cards`}>
                                Payment cards
                            </Link>
                        </li>
                    </ul>
                </div>
                <TransactionForm
                    cards={this.props.cards}
                    onTranAdd={(tran: Transaction) => this.props.onTranAdd(tran)}
                />
                <TransactionTable trans={this.props.trans} cards={this.props.cards}/>
            </div>
        );
    }
}
