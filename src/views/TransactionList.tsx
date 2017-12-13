import * as React from 'react'

export default class TransactionList extends React.Component{
    render() {
        return <div className="panel panel-default">
            <div className="panel-heading"><h4>Transactions History</h4></div>
            <table className="table text-left">
                <thead>
                <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Title</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Type</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                </tr>
                </tbody>
            </table>
        </div>
    }
}
