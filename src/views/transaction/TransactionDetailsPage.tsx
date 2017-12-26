import * as React from 'react';
import Transaction from '../../models/Transaction';
import API from '../../API';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import Card from '../../models/Card';
import {HOST} from '../../Constants';

interface DetailsProps {
    id: number;
    cards: Array<Card>;
    onTranDelete: Function;
    match: any;
    location: any;
    history: any;
}
interface DetailsState {
    tran: Transaction | undefined;
    card: Card | undefined;
}
class TransactionDetails extends React.Component<DetailsProps, DetailsState> {
    constructor(props: any) {
        super(props);
        this.state = {
            tran: undefined,
            card: undefined
        };
    }

    componentWillMount() {
        API.get(`/api/v1/transaction/${this.props.id}`)
            .then((data: any) => {
                let trRs = data.transaction;
                let tran = new Transaction(
                    trRs._id,
                    trRs.title,
                    trRs.amount,
                    trRs.type,
                    trRs.date,
                    trRs.card,
                    trRs.check);
                this.setState({tran: tran});
        }).then(() => {
            let card = this.props.cards.filter((el: Card) => {
                return this.state.tran ? this.state.tran.card === el.id : false;
            })[0];
            this.setState({card: card});
        });
    }

    onDeleteClick() {
        this.props.onTranDelete(this.state.tran, this.props.history);
    }

    render() {
        let tran = this.state.tran;
        let card = this.state.card;
        if (!tran) { return (<h1>Transaction not found</h1>); }

        let checkPath;
        if (tran.check) {
            checkPath = tran.check.replace(/public/i, '');
        }

        return (
            <div>
                <div>
                    <h1>Transaction Details</h1>
                    <p>Id: {tran.id}</p>
                    <p>Title: {tran.title}</p>
                    <p>Amount: {tran.amount}</p>
                    <p>Type: {tran.type}</p>
                    {card &&
                        <div className="panel panel-default">
                            <div className="panel-heading">Card</div>
                            <div className="panel-body">
                                <p>Number: {card.number}</p>
                                <p>Payment system: {card.paymentSystem}</p>
                                <p>Amount: {card.amount}</p>
                            </div>
                        </div>
                    }
                    <p>Date: {tran.date}</p>
                    {tran.check &&
                        <img alt="check" style={{width: 200}} src={`${HOST}${checkPath}`}/>
                    }
                    </div>
                {this.state.tran &&
                    <Link to={`/dashboard/transaction/${this.state.tran.id}/edit`}>
                        <button>Edit</button>
                    </Link>
                 }
                <button onClick={() => this.onDeleteClick()}>Delete</button>
            </div>
        );
    }
}

export default withRouter(TransactionDetails);