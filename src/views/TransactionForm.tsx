import * as React from 'react';
//  import { Transaction } from '../models/Transaction';

interface FormProps {
    onTranAdd: Function;
}
interface FormState {
    title: string;
    amount: number;
    type: string;
}
export default class TransactionForm extends React.Component<FormProps, FormState> {
    constructor(props: any) {
        super(props);
        this.state = {
            title: '',
            amount: 0,
            type: ''
        };
    }

    handleChange(stateName: String, e: any) {
        let target = e.target.value;
        if (stateName === 'title') { this.setState({title: target}); }
        else if (stateName === 'amount') { this.setState({amount: target}); }
        else { this.setState({type: target}); }
    }

    handleAdd() {
        let tran = {
            title: this.state.title,
            amount: this.state.amount,
            type: this.state.type
        };
        this.props.onTranAdd(tran);
    }

    render() {
        return (
            <div className="form-row" style={styles.form}>
                <div className="form-group col-md-4">
                    <input type="text"
                           className="form-control"
                           placeholder="Title"
                           id="inputTitle"
                           onChange={(e) => this.handleChange('title', e)}
                    />
                </div>
                <div className="form-group col-md-2">
                    <input type="number"
                           className="form-control"
                           placeholder="Amount"
                           id="inputAmount"
                           onChange={(e) => this.handleChange('amount', e)}
                    />
                </div>
                <div className="form-group col-md-3" onChange={(e) => this.handleChange('type', e)}>
                    <select id="inputState" className="form-control">
                        <option>Choose type</option>
                        <option>Food</option>
                        <option>Clothes</option>
                        <option>Entertainments</option>
                        <option>Other</option>
                    </select>
                </div>
                <button className="form-group btn btn-primary" onClick={() => this.handleAdd()}>Add transaction</button>
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
