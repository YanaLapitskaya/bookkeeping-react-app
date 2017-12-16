import * as React from 'react';
import { Transaction } from '../models/Transaction';
import TransactionTable from './TransactionTable';
import TransactionForm from './TransactionForm';
import API from '../API';

interface PanelState {
    trans: Array<Transaction>;
}

export default class TransactionPanel extends React.Component<{}, PanelState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            trans: []
        };
    }

    componentWillMount() {
        API.get('/api/v1/transaction/all').then((data: any) => {
            let trans = data.transactions;
            trans = trans.map((tr: any) => {return new Transaction(tr._id, tr.title, tr.amount, tr.type, tr.date); });
            this.setState({trans: trans});
        });
    }

    handleTranAdd(tran: Transaction) {
        API.put('/api/v1/transaction', tran).then((res: any) => {
                if (res.status < 400) {
                    return res.json();
                } else {
                    throw {code: res.status.toString()};
                }
            })
            .then(data => {
                let tr = data.transaction;
                console.log(tr)
                this.setState({
                    trans: [...this.state.trans, new Transaction(tr._id, tr.title, tr.amount, tr.type, tr.date)]
                });
            });
    }

    render() {
        return (
            <div>
                <TransactionForm onTranAdd={(tran: Transaction) => this.handleTranAdd(tran)}/>
                <TransactionTable trans={this.state.trans}/>
            </div>
        );
    }
}
