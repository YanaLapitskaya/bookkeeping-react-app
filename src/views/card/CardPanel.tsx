import * as React from 'react';
import { Link } from 'react-router-dom';
import Card from '../../models/Card';
import CardForm from './CardForm';
import CardTable from './CardTable';

interface PanelProps {
    cards: Array<Card>;
    onCardAdd: Function;
}
export default class CardPanel extends React.Component<PanelProps, {}> {
    render() {
        return (
            <div>
                <ul className="nav nav-pills">
                    <li className="nav-item">
                        <Link className="nav-link" to={`/dashboard/transactions`}>
                            Transactions
                        </Link>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active" href="#">Payment cards</a>
                    </li>
                </ul>

                <CardForm  onCardAdd={(card: Card) => this.props.onCardAdd(card)}/>
                <CardTable cards={this.props.cards}/>
            </div>
            );
    }
}