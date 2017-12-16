import * as React from 'react';
import {Transaction} from '../models/Transaction';
import API from '../API';

interface EditProps {
    id: number;
    match: any;
    location: any;
    history: any;
}
interface EditState {
    tran: Transaction | undefined;
}
export default class TransactionEditPage extends React.Component<EditProps,EditState> {
    constructor(props: any) {
        super(props);
        this.state = {
            tran: undefined
        };
    }

    componentWillMount() {
        API.get(`/api/v1/transaction/${this.props.id}`)
            .then((data: any) => {
                let tranRs = data.transactions[0];
                let tran = new Transaction(tranRs._id, tranRs.title, tranRs.amount, tranRs.type, tranRs.date);
                this.setState({tran: tran});
            });
    }

    render() {
        if (this.state.tran) {
            return (
                <div>
                    <h3>Edit transaction {this.state.tran.id}</h3>
                </div>
            );
        }
        else return <p>hello</p>;
    }
}