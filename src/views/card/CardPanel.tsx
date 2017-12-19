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
                <div>
                    <ul className="nav nav-pills">
                        <li role="presentation">
                            <Link to={`/dashboard`}>
                                Transactions
                            </Link>
                        </li>
                        <li role="presentation" className="active">
                            <a href="#">Payment cards</a>
                        </li>
                    </ul>
                </div>
                <CardForm  onCardAdd={(card: Card) => this.props.onCardAdd(card)}/>
                <CardTable cards={this.props.cards}/>
            </div>
            );
    }
}