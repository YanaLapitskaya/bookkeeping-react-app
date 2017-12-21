import * as React from 'react';
import Card from '../../models/Card';

interface FormProps {
    onTranAdd: Function;
    cards: Array<Card>;
}
interface FormState {
    title: string;
    sign: string;
    amount: number;
    type: string;
    card: string;
}
export default class TransactionForm extends React.Component<FormProps, FormState> {
    constructor(props: any) {
        super(props);
        this.state = {
            title: '',
            sign: '',
            amount: 0,
            type: '',
            card: ''
        };
    }

    handleChange(stateName: String, e: any) {
        let target = e.target.value;
        if (stateName === 'title') {
            this.setState({title: target});
        } else if (stateName === 'amount') {
            this.setState({amount: target});
        } else if (stateName === 'type') {
            this.setState({type: target});
        } else if (stateName === 'sign') {
            this.setState( {sign: target} );
        } else {
            this.setState({card: target});
        }
    }

    handleAdd(e: any) {
        e.preventDefault();
        let amount = Number(this.state.sign + this.state.amount);
        let tran = {
            title: this.state.title,
            amount: amount,
            type: this.state.type,
            card: this.state.card
        };
        this.props.onTranAdd(tran);
    }

    render() {
        return (
            <div className="form-row" style={styles.form}>
                <form>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Title"
                                    id="inputTitle"
                                    onChange={(e) => this.handleChange('title', e)}
                                />
                            </div>
                            <div className="col-md-1">
                                <select
                                    id="inputSign"
                                    className="form-control"
                                    onChange={(e) => this.handleChange('sign', e)}
                                >
                                    <option>?</option>
                                    <option value="-">-</option>
                                    <option value="+">+</option>
                                </select>
                            </div>
                            <div className="col-md-2">
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Amount"
                                    id="inputAmount"
                                    onChange={(e) => this.handleChange('amount', e)}
                                />
                            </div>
                            <div className="col-md-2">
                                <select
                                    id="inputState"
                                    className="form-control"
                                    onChange={(e) => this.handleChange('type', e)}
                                >
                                    <option>Type</option>
                                    <option>Food</option>
                                    <option>Clothes</option>
                                    <option>Entertainments</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div className="col-md-2">
                                <select
                                    id="inputState"
                                    className="form-control"
                                    onChange={(e) => this.handleChange('card', e)}
                                >
                                    <option>Payment card</option>
                                    {this.props.cards.map(function(card: Card, i: number) {
                                        return(
                                            <option value={card.id} key={i}>
                                                {card.paymentSystem}: {card.number}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="col-md-2">
                                <button
                                    className="form-group btn btn-primary"
                                    onClick={(e) => this.handleAdd(e)}
                                >
                                    Add transaction
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

const styles = {
    form: {
        height: '55px',
        padding: '10px 20px',
        background: '#f6f6f6',
        marginBottom: '10px'
    }
};
