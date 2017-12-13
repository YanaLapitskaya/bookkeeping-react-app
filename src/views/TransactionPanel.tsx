import * as React from 'react'

export default class TransactionPanel extends React.Component {
    render() {
        return <div style={styles.pane}>{this.props.children}</div>
    }
}

const styles = {
    pane: {

    }
}