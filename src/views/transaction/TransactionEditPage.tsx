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
    file: string;
    imagePreviewUrl: string;

}
class TransactionEditPage extends React.Component<EditProps, EditState> {
    constructor(props: any) {
        super(props);
        this.state = {
            tran: undefined,
            file: '',
            imagePreviewUrl: ''
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

    handleImageChange(e: any) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        };

        reader.readAsDataURL(file);
    }

    handleClick(e: any) {
        e.preventDefault();

        this.props.onTranEdit(this.state.tran, this.props.history);
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
                    <input type="file" onChange={(e) => this.handleImageChange(e)} />
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