import * as React from 'react';
import Transaction from '../../models/Transaction';
import Card from '../../models/Card';
import { Link } from 'react-router-dom';
import { HOST } from '../../Constants';

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
                        <th scope="col">Type</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Card</th>
                        <th scope="col">Card balance</th>
                        <th scope="col">Check</th>
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
    onImageClick() {
        let checkPath;
        if (this.props.tran.check) {
            checkPath = HOST + this.props.tran.check.replace(/public/i, '');
        }

        if (checkPath) { this.popupCenter(checkPath, 'Check', 300, 230); }
    }

    popupCenter(url: string, title: string, w: any, h: any) {
        let left = (screen.width / 2) - (w / 2);
        let top = (screen.height / 2) - (h / 2);
        return window.open(url, title, 'toolbar=no, location=no, directories=no,' +
            ' status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, ' +
            'width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
    }

    render() {
        let card = this.props.cards.filter((c: any) => {return c.id === this.props.tran.card; })[0];
        let classTr = this.props.tran.amount < 0 ? 'table-danger' : 'table-success';
        return (
            <tr className={classTr}>
                <th scope="row">{this.props.num}</th>
                <td>{this.props.tran.date}</td>
                <td>{this.props.tran.title}</td>
                <td>{this.props.tran.type}</td>
                <td>{this.props.tran.amount > 0 ? '+' : ''}{this.props.tran.amount}</td>
                <td>{card && card.paymentSystem + ': ' + card.number}</td>
                <td>{card && card.amount}</td>
                <td>
                    {this.props.tran.check ?
                    <input type="image" onClick={() => {this.onImageClick(); }} src={require('./../../img-icon.png')}/>
                        : null}
                </td>
                <td>
                    <Link to={`/dashboard/transaction/${this.props.tran.id}`}>
                        Details >
                    </Link>
                </td>
            </tr>
        );
    }
}