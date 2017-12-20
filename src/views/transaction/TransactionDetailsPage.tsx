import * as React from 'react';
import Transaction from '../../models/Transaction';
import API from '../../API';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

interface DetailsProps {
    id: number;
    match: any;
    location: any;
    history: any;
}
interface DetailsState {
    tran: Transaction | undefined;
}
class TransactionDetails extends React.Component<DetailsProps, DetailsState> {
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

    onEditClick() {
        if (this.state.tran) {
            this.props.history.push(`/transaction/${this.state.tran.id}/edit`);
        }
    }

    onDeleteClick() {
        if (this.state.tran) {
            API.delete(`/api/v1/transaction/${this.state.tran.id}`)
                .then((res) => {
                    alert('Transaction has been deleted');
                    this.props.history.push('/dashboard');
                })
                .catch((err) => console.log(err));
        }
    }

    render() {
        let tran = this.state.tran;
        if (tran) {
            return (
                <div>
                    <div>
                        <h1>Transaction Details</h1>
                        <p>Id: {tran.id}</p>
                        <p>Title: {tran.title}</p>
                        <p>Amount: {tran.amount}</p>
                        <p>Type: {tran.type}</p>
                        <p>Date: {tran.date}</p>
                    </div>
                    {this.state.tran !== undefined ? (
                        <button>
                                <Link to={`/transaction/${this.state.tran.id}/edit`}>Edit</Link>
                        </button>
                        ) : null}
                    <button onClick={() => this.onDeleteClick()}>
                        <a href="#">Delete</a>
                    </button>
                </div>
            );
        } else {
            return <h3>Fetching transaction data...</h3>;
        }
    }
}

export default withRouter(TransactionDetails);