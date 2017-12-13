import * as React from 'react';

export default class TransactionForm extends React.Component{
    render() {
        return (
            <form>
            <div className="form-row" style={styles.form}>
                <div className="form-group col-md-4">
                    <input type="text" className="form-control" placeholder="Title" id="inputTitle"/>
                </div>
                <div className="form-group col-md-2">
                    <input type="number" className="form-control" placeholder="Amount" id="inputAmount"/>
                </div>
                <div className="form-group col-md-3">
                    <select id="inputState" className="form-control">
                        <option>Choose type</option>
                        <option>Food</option>
                        <option>Clothes</option>
                        <option>Entertainments</option>
                        <option>Other</option>
                    </select>
                </div>
                <button className="form-group btn btn-primary">Add transaction</button>
            </div>
        </form>
        );
    }
}
const styles = {
    form: {
        height: '55px',
        padding: '10px 20px',
        background: '#f6f6f6'
    }
}
