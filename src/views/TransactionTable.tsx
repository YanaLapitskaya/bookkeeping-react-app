import * as React from 'react';
import { Transaction } from '../models/Transaction';

interface TableProps {
    trans: Array<Transaction>;
}
export default class TransactionTable extends React.Component<TableProps, {}> {
    render() {
        let trans = this.props.trans;
        let transRows = trans.map((tran, i) => <TransactionRow tran={tran} key={i}/>);
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
    key: Number;
}
class TransactionRow extends React.Component<RowProps, {}> {
    render() {
        return (
            <tr>
                <th scope="row">{this.props.tran.id}</th>
                <td>{this.props.tran.date}</td>
                <td>{this.props.tran.title}</td>
                <td>{this.props.tran.amount}</td>
                <td>{this.props.tran.type}</td>
            </tr>
        );
    }
}