import * as React from 'react';

interface FormProps {
    onCardAdd: Function;
}
interface FormState {
    number: string;
    paymentSystem: string;
    amount: number;
}
export default class CardForm extends React.Component<FormProps, FormState> {
    constructor(props: any) {
        super(props);
        this.state = {
            number: '',
            paymentSystem: '',
            amount: 0
        };
    }

    handleChange(stateName: String, e: any) {
        let target = e.target.value;
        (stateName === 'number') ? this.setState({number: target})
            : ( (stateName === 'amount') ? this.setState({amount: target})
                : this.setState({paymentSystem: target}) );
    }

    handleAdd(e: any) {
        e.preventDefault();
        let card = {
            number: this.state.number,
            paymentSystem: this.state.paymentSystem,
            amount: this.state.amount
        };
        this.props.onCardAdd(card);
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
                                    placeholder="Number"
                                    id="inputNumber"
                                    onChange={(e) => this.handleChange('number', e)}
                                />
                            </div>
                            <div className="col-md-3">
                                <select
                                    id="inputSystem"
                                    className="form-control"
                                    onChange={(e) => this.handleChange('system', e)}
                                >
                                    <option>Choose payment system</option>
                                    <option>MasterCard</option>
                                    <option>VISA</option>
                                    <option>БелКарт</option>
                                    <option>Other</option>
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
                            <div className="col-md-3">
                                <button
                                    className="form-group btn btn-primary"
                                    onClick={(e) => this.handleAdd(e)}
                                >
                                    Add payment card
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
