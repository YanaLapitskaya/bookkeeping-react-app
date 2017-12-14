import * as React from 'react';
import './App.css';
import Header from './views/Header';
import TransactionPanel from './views/TransactionPanel';
import TransactionForm from './views/TransactionForm';
import TransactionTable from './views/TransactionTable';
import { getStubTransList, Transaction } from './models/Transaction';
// import Login from './views/Login';

interface AppState {
    trans: Array<Transaction>;
}
class App extends React.Component<{}, AppState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            trans: getStubTransList()
        };
    }

    handleTranAdd(tran: Transaction) {
        this.setState({
            trans: [...this.state.trans, tran]
        });
    }

    render() {
        return (
            /*<div className="App">
                <Login/>
            </div>*/
          <div className="App">
            <Header/>
            <TransactionPanel>
              <TransactionForm onTranAdd={(tran: Transaction) => this.handleTranAdd(tran)}/>
              <TransactionTable trans={this.state.trans}/>
            </TransactionPanel>
          </div>
        );
    }
}

export default App;
