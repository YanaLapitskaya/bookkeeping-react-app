import * as React from 'react';
import Transaction from '../../models/Transaction';
import API from '../../API';
import { withRouter } from 'react-router';
import Card from '../../models/Card';

interface EditProps {
    id: number;
    cards: Array<Card>;
    onTranEdit: Function;
    match: any;
    location: any;
    history: any;
}
interface EditState {
    tran: Transaction | undefined;
    card: string;
    file: File | any;
    title: string;
    amount: number;
    type: string;

}
class TransactionEditPage extends React.Component<EditProps, EditState> {
    constructor(props: any) {
        super(props);
        this.state = {
            tran: undefined,
            card: '',
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
                let tran = new Transaction(trRs._id, trRs.title, trRs.amount, trRs.type, trRs.date, trRs.card, trRs.check);
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
        } else if (name === 'card') {
            this.setState({card: target});
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
            this.state.card,
            this.state.file
            );
        this.props.onTranEdit(tran, this.props.history);
    }

    render() {
        if (this.state.tran) {
            return (
                <div className="wrapper">
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
                        type="number"
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