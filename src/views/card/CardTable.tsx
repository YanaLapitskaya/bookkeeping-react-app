import * as React from 'react';
import { Link } from 'react-router-dom';
import Card from '../../models/Card';

interface TableProps {
    cards: Array<Card>;
}
export default class CardTable extends React.Component<TableProps, {}> {
    render() {
        let cards = this.props.cards;
        let cardRows = cards.map((card, i) => <CardRow card={card} key={i} num={i + 1} />);
        return(
            <div className="panel panel-default">
                <div className="panel-heading"><h4>Payment Cards</h4></div>
                <table className="table text-left">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Number</th>
                            <th scope="col">Payment System</th>
                            <th scope="col">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cardRows}
                    </tbody>
                </table>
            </div>
        );
    }
}

interface RowProps {
    card: Card;
    key: Number;
    num: Number;
}
class CardRow extends React.Component<RowProps, {}> {
    render() {
        return (
            <tr>
                <th scope="row">{this.props.num}</th>
                <td>{this.props.card.number}</td>
                <td>{this.props.card.paymentSystem}</td>
                <td>{this.props.card.amount}</td>
                <td>
                    <Link to={`/dashboard/card/${this.props.card.id}`}>Edit</Link>
                </td>
            </tr>
        );
    }
}