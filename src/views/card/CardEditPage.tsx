import * as React from 'react';
import API from '../../API';
import { withRouter } from 'react-router';
import Card from '../../models/Card';

interface EditProps {
    id: string;
    match: any;
    location: any;
    history: any;
}
interface EditState {
    card: Card | undefined;
}
class CardEditPage extends React.Component<EditProps, EditState> {
    constructor(props: any) {
        super(props);
        this.state = {
            card: undefined
        };
    }

    componentWillMount() {
        API.get(`/api/v1/card/${this.props.id}`)
            .then((data: any) => {
                let cardRs = data.card;
                let card = new Card(cardRs._id, cardRs.number, cardRs.paymentSystem, cardRs.amount);
                this.setState({card: card});
            });
    }

    handleChange(name: String, e: any) {
        if (!this.state.card) { return; }

        let target = e.target.value;
        let newCard = this.state.card;
        name === 'number' ? (newCard.number = target)
            : (name === 'system' ? newCard.paymentSystem = target : newCard.amount = target);
        this.setState({card: newCard});
    }

    handleSaveClick() {
        if (!this.state.card) { return; }
        let card = {
            number: this.state.card.number,
            paymentSystem: this.state.card.paymentSystem,
            amount: this.state.card.amount
        };
        API.post(`/api/v1/card/${this.props.id}`, card)
            .then((res: any) => {
                if (res.status === 200) {
                    alert('payment card has been updated');
                    this.props.history.push('/cards');
                }
            })
            .catch((err) => {console.log(err); });
    }

    handleDeleteClick() {
        if (this.state.card) {
            API.delete(`/api/v1/card/${this.state.card.id}`)
                .then((res) => {
                    alert('Payment card has been deleted');
                    this.props.history.push('/cards');
                })
                .catch((err) => console.log(err));
        }
    }

    render() {
        if (this.state.card) {
            return (
                <div>
                    <h3>Edit card details</h3>
                    <input
                        type="text"
                        className="form-control"
                        name="number"
                        value={this.state.card.number}
                        required={true}
                        onChange={(e) => {this.handleChange('number', e); }}
                    />
                    <select
                        id="inputSystem"
                        className="form-control"
                        value={this.state.card.paymentSystem}
                        onChange={(e) => {this.handleChange('system', e); }}
                    >
                        <option>MasterCard</option>
                        <option>VISA</option>
                        <option>БелКарт</option>
                        <option>Other</option>
                    </select>
                    <input
                        type="text"
                        className="form-control"
                        name="amount"
                        value={this.state.card.amount}
                        required={true}
                        onChange={(e) => {this.handleChange('amount', e); }}
                    />
                    <button
                        className="btn btn-lg btn-primary btn-block"
                        onClick={() => {this.handleSaveClick(); }}
                    >
                        Save
                    </button>
                    <button
                        className="btn btn-lg btn-primary btn-block"
                        onClick={() => {this.handleDeleteClick(); }}
                    >
                        Delete
                    </button>
            </div>
        );
        } else {
            return <p>Card not found</p>;
        }
    }
}

export default withRouter(CardEditPage);