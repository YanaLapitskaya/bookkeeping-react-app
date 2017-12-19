import * as React from 'react';
import Transaction from '../../models/Transaction';
import Card from '../../models/Card';
import { Link } from 'react-router-dom';

interface TableProps {
    trans: Array<Transaction>;
    cards: Array<Card>;
}
export default class TransactionTable extends React.Component<TableProps, {}> {
    render() {
        let trans = this.props.trans;
        let transRows = trans.map((tran, i) =>
            <TransactionRow tran={tran} cards={this.props.cards} key={i} num={i + 1}/>);
        return(
            <div className="panel panel-default">
                <div className="panel-heading"><h4>Transactions History</h4></div>
                <table className="table text-left">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Date</th>
                        <th scope="col">Title</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Type</th>
                        <th scope="col">Card</th>
                    </tr>
                    </thead>
                    <tbody>
                        {transRows}
                    </tbody>
                </table>
            </div>
        );
    }
}

interface RowProps {
    tran: Transaction;
    cards: Array<Card>;
    key: Number;
    num: Number;
}
class TransactionRow extends React.Component<RowProps, {}> {
    render() {
        let card = this.props.cards.filter((c: any) => {return c.id === this.props.tran.card; })[0];
        return (
            <tr>
                <th scope="row">{this.props.num}</th>
                <td>{this.props.tran.date}</td>
                <td>{this.props.tran.title}</td>
                <td>{this.props.tran.amount}</td>
                <td>{this.props.tran.type}</td>
                <td>{card && card.paymentSystem+': '+card.number}</td>
                <td>
                    <Link to={`/transaction/${this.props.tran.id}`}>
                        Details >
                    </Link>
                </td>
            </tr>
        );
    }
}