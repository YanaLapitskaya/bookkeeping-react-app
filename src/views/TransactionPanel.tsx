import * as React from 'react';

export default class TransactionPanel extends React.Component {
    render() {
        return <div>{this.props.children}</div>;
    }
}
