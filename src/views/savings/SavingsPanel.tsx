import * as React from 'react';
import { Link } from 'react-router-dom';
import Saving from './../../models/Saving';

interface SavingsProps {
    savings: Array<Saving>;
    onSavingAdd: Function;
    onSavingEdit: Function;
}
interface SavingsState {
    id: string;
    title: string;
    curAmount: number;
    tarAmount: number;
}
export default class SavingsPanel extends React.Component<SavingsProps, SavingsState> {
    constructor(props: any) {
        super(props);
        this.state = {
            id: '',
            title: '',
            curAmount: 0,
            tarAmount: 0
        };
    }

    handleChange(stateName: String, e: any) {
        let target = e.target.value;
        (stateName === 'title') ? this.setState({title: target})
            : ( (stateName === 'cur-amount') ? this.setState({curAmount: target})
            : this.setState({tarAmount: target}) );
    }

    handleAdd(e: any) {
        e.preventDefault();
        let saving = {
            title: this.state.title,
            curAmount: this.state.curAmount,
            tarAmount: this.state.tarAmount
        };
        if (!this.state.id) { this.props.onSavingAdd(saving);
        } else {
            this.props.onSavingEdit(this.state.id, saving);
        }
        this.setState({id: ''});
    }

    setId(id: string) {
        this.setState({id: id});
    }

    render() {
        let savingRows = this.props.savings.map((sav, i) => {
            return <SavingRow saving={sav} key={i} setId={(id: string) => this.setId(id)}/>;
        });
        return (
            <div>
                <ul className="nav nav-pills" >
                    <li className="nav-item">
                        <Link className="nav-link" to={`/dashboard/transactions`}>
                            Payment cards
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={`/dashboard/cards`}>
                            Payment cards
                        </Link>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active" href="#">Savings</a>
                    </li>
                </ul>
                <div className="form-row" style={styles.form}>
                    <form>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="titleInput"
                                        placeholder="Title"
                                        onChange={(e) => this.handleChange('title', e)}
                                    />
                                </div>
                                <div className="col-md-2">
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="curInput"
                                        placeholder="Current amount"
                                        onChange={(e) => this.handleChange('cur-amount', e)}
                                    />
                                </div>
                                <div className="col-md-2">
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="tarInput"
                                        placeholder="Target amount"
                                        onChange={(e) => this.handleChange('tar-amount', e)}
                                    />
                                </div>
                                <div className="col-md-3">
                                    <button
                                        className="form-group btn btn-primary"
                                        onClick={(e) => this.handleAdd(e)}
                                    >
                                        Add saving
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div>
                    {savingRows}
                </div>
            </div>
        );
    }
}

interface RowProps {
    saving: Saving;
    key: Number;
    setId: Function;
}

class SavingRow extends React.Component<RowProps, {}> {
    handleClick(e: any) {
        e.preventDefault();

        let titleInput = document.getElementById('titleInput') as HTMLInputElement;
        if (titleInput) { titleInput.value = this.props.saving.title; }

        let curInput = document.getElementById('curInput') as HTMLInputElement;
        if (curInput) { curInput.value = this.props.saving.curAmount.toString(); }

        let tarInput = document.getElementById('tarInput') as HTMLInputElement;
        if (tarInput) { tarInput.value = this.props.saving.tarAmount.toString(); }

        this.props.setId(this.props.saving.id);
    }

    render() {
        let sav = this.props.saving;
        let percentage = Math.floor(sav.curAmount * 100 / sav.tarAmount);
        let barStyle = {
            width: `${percentage}%`
        };
        let barColor = percentage < 50 ? 'progress-bar bg-warning' : 'progress-bar bg-success';
        return (
            <div onClick={(e) => this.handleClick(e)}>
                <h3>{this.props.saving.title}</h3>
                <div className="progress">
                    <div className={barColor} role="progressbar" style={barStyle}>
                        {percentage}%
                    </div>
                </div>
            </div>
        );
    }
}

const styles = {
    form: {
        height: '55px',
        padding: '10px 20px',
        background: '#f6f6f6',
        marginBottom: '10px'
    }
};
