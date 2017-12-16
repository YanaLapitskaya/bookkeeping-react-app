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
        API.get('/api/v1/transaction/all').then((trans: Array<Transaction>) => {
            this.setState({ trans });
        });
    }

    handleTranAdd(tran: Transaction) {
        /*API.put('/todos', tran).then(newTrans: Transaction => {
            this.setState({
                trans: [...this.state.trans, newTrans]
            })
        })*/
    }

    render() {
        return (
            <div>
                <TransactionForm onTranAdd={(tran: Transaction) => this.handleTranAdd(tran)}/>
                <TransactionTable trans={this.state.trans}/>
            </div>
        )
    }
}
