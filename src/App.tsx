import * as React from 'react';
import './App.css';
import Header from './views/Header';
import TransactionPanel from './views/TransactionPanel';
import TransactionForm from './views/TransactionForm';
import TransactionList from './views/TransactionList';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <TransactionPanel>
          <TransactionForm/>
          <TransactionList/>
        </TransactionPanel>
      </div>
    );
  }
}

export default App;
