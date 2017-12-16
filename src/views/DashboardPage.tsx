import * as React from 'react';
import TransactionPanel from './TransactionPanel';
import Header from './Header';

export default class DashboardPage extends React.Component {
    render() {
        return (
            <div>
                <Header/>
                <TransactionPanel/>
            </div>
        );
    }
}