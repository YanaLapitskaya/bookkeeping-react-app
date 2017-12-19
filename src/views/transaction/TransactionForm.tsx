import * as React from 'react';
import Card from '../../models/Card';

interface FormProps {
    onTranAdd: Function;
    cards: Array<Card>;
}
interface FormState {
    title: string;
    amount: number;
    type: string;
    card: string;
}
export default class TransactionForm extends React.Component<FormProps, FormState> {
    constructor(props: any) {
        super(props);
        this.state = {
            title: '',
            amount: 0,
            type: '',
            card: ''
        };
    }

    handleChange(stateName: String, e: any) {
        let target = e.target.value;
        (stateName === 'title') ? this.setState({title: target})
            : ( (stateName === 'amount') ? this.setState({amount: target})
                : ( (stateName === 'type') ? this.setState({type: target})
                    : this.setState({card: target})));
    }

    handleAdd() {
        let tran = {
            title: this.state.title,
            amount: this.state.amount,
            type: this.state.type,
            card: this.state.card
        };
        this.props.onTranAdd(tran);
    }

    render() {
        return (
            <div className="form-row" style={styles.form}>
                <div className="form-group col-md-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Title"
                        id="inputTitle"
                        onChange={(e) => this.handleChange('title', e)}
                    />
                </div>
                <div className="form-group col-md-2">
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Amount"
                        id="inputAmount"
                        onChange={(e) => this.handleChange('amount', e)}
                    />
                </div>
                <div className="form-group col-md-2" onChange={(e) => this.handleChange('type', e)}>
                    <select id="inputState" className="form-control">
                        <option>Choose type</option>
                        <option>Food</option>
                        <option>Clothes</option>
                        <option>Entertainments</option>
                        <option>Other</option>
                    </select>
                </div>
                <div className="form-group col-md-2" onChange={(e) => this.handleChange('card', e)}>
                    <select id="inputState" className="form-control">
                        <option>Choose payment card</option>
                        {this.props.cards.map(function(card: Card, i: number) {
                            return(
                                <option value={card.id} key={i}>
                                    {card.paymentSystem}: {card.number}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <button
                    className="form-group col-md-2 btn btn-primary"
                    onClick={() => this.handleAdd()}
                >
                    Add transaction
                </button>
            </div>
        );
    }
}
const styles = {
    form: {
        height: '55px',
        padding: '10px 20px',
        background: '#f6f6f6'
    }
};
