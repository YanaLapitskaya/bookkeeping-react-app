import * as React from 'react';
import './App.css';

import Login from './views/Login';

class App extends React.Component {
  render() {
    return (
        <div className="App">
            <Login/>
        </div>
        /*
      <div className="App">
        <Header/>
        <TransactionPanel>
          <TransactionForm/>
          <TransactionList/>
        </TransactionPanel>
      </div>
      */
    );
  }
}

export default App;
