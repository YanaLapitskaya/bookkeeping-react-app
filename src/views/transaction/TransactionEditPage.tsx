import * as React from 'react';
import Transaction from '../../models/Transaction';
import API from '../../API';
import { withRouter } from 'react-router';

interface EditProps {
    id: number;
    onTranEdit: Function;
    match: any;
    location: any;
    history: any;
}
interface EditState {
    tran: Transaction | undefined;
    file: any;
    title: string;
    amount: number;
    type: string;

}
class TransactionEditPage extends React.Component<EditProps, EditState> {
    constructor(props: any) {
        super(props);
        this.state = {
            tran: undefined,
            file: undefined,
            title: '',
            amount: 0,
            type: ''
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
        let target = e.target.value;
        if (name === 'title') {
            this.setState({title: target});
        } else if (name === 'amount')  {
            this.setState({amount: target});
        } else if (name === 'type') {
            this.setState({type: target});
        }
    }

    handleImageChange(files: FileList | null) {
        if (files) {
            this.setState({file: files[0]});
        }
    }
    handleClick(e: any) {
        e.preventDefault();

        if (!this.state.tran) {return; }

        let tran = new Transaction(
            this.state.tran.id,
            this.state.title,
            this.state.amount,
            this.state.type,
            this.state.tran.date,
            this.state.tran.card);
        tran.check = this.state.file;
        this.props.onTranEdit(tran, this.props.history);
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
                        required={true}
                        defaultValue={this.state.tran.title}
                        onChange={(e) => {this.handleChange('title', e); }}
                    />
                    <input
                        type="text"
                        className="form-control"
                        name="amount"
                        required={true}
                        defaultValue={this.state.tran.amount ? this.state.tran.amount.toString() : ''}
                        onChange={(e) => {this.handleChange('amount', e); }}
                    />
                    <input
                        type="text"
                        className="form-control"
                        name="type"
                        required={true}
                        defaultValue={this.state.tran.type}
                        onChange={(e) => {this.handleChange('type', e); }}
                    />
                    <input
                        type="file"
                        onChange={(e) => {this.handleImageChange(e.target.files); }}
                    />
                    <button
                        className="btn btn-lg btn-primary btn-block"
                        onClick={(e) => {this.handleClick(e); }}
                    >
                        Save
                    </button>
                </div>
            );
        } else { return <p>Transaction not found</p>; }
    }
}

export default withRouter(TransactionEditPage);