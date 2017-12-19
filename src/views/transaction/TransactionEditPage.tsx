import * as React from 'react';
import Transaction from '../../models/Transaction';
import API from '../../API';
import { withRouter } from 'react-router';

interface EditProps {
    id: number;
    match: any;
    location: any;
    history: any;
}
interface EditState {
    tran: Transaction | undefined;
}
class TransactionEditPage extends React.Component<EditProps, EditState> {
    constructor(props: any) {
        super(props);
        this.state = {
            tran: undefined
        };
    }

    componentWillMount() {
        API.get(`/api/v1/transaction/${this.props.id}`)
            .then((data: any) => {
                let trRs = data.transaction;
                let tran = new Transaction(trRs._id, trRs.title, trRs.amount, trRs.type, trRs.date, trRs.card);
                this.setState({tran: tran});
            });
    }

    handleChange(name: String, e: any) {
        if (!this.state.tran) { return; }

        let target = e.target.value;
        let newTran = this.state.tran;
        name === 'title' ? (newTran.title = target)
            : (name === 'amount' ? newTran.amount = target : newTran.type = target);
        this.setState({tran: newTran});
    }

    handleClick() {
        if (!this.state.tran) { return; }
        let tran = {
            title: this.state.tran.title,
            amount: this.state.tran.amount,
            type: this.state.tran.type
        };
        API.post(`/api/v1/transaction/${this.props.id}`, tran)
            .then((res: any) => {
                if (res.status === 200) {
                    alert('transaction was undated');
                    this.props.history.push('/dashboard');
                }
            })
            .catch((err) => {console.log(err); });
    }

    render() {
        if (this.state.tran) {
            return (
                <div>
                    <h3>Edit transaction details</h3>
                    <input
                        type="text"
                        className="form-control"
                        name="title"
                        value={this.state.tran.title}
                        required={true}
                        onChange={(e) => {this.handleChange('title', e); }}
                    />
                    <input
                        type="text"
                        className="form-control"
                        name="amount"
                        value={this.state.tran.amount}
                        required={true}
                        onChange={(e) => {this.handleChange('amount', e); }}
                    />
                    <input
                        type="text"
                        className="form-control"
                        name="type"
                        value={this.state.tran.type}
                        required={true}
                        onChange={(e) => {this.handleChange('type', e); }}
                    />
                    <button
                        className="btn btn-lg btn-primary btn-block"
                        onClick={() => {this.handleClick(); }}
                    >
                        Save
                    </button>
                </div>
            );
        } else { return <p>Transaction not found</p>; }
    }
}

export default withRouter(TransactionEditPage);