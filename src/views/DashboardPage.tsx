import * as React from 'react';
import DashboardRouter from './DashboardRouter';
import Transaction from '../models/Transaction';
import Card from '../models/Card';
import API from '../API';
import { HOST } from '../Constants';
import { bindActionCreators } from 'redux';
import { AppState } from '../redux/AppState';
import { connect } from 'react-redux';
import { actionAddCard, actionDeleteCard, actionEditCard, actionFetchCards } from '../redux/CardsActions';

interface DashboardProps {
    cards: Array<Card>;

    fetchCards: Function;
    addCard: Function;
    editCard: Function;
    deleteCard: Function;
}
interface DashboardState {
    trans: Array<Transaction>;
}
class DashboardPage extends React.Component<DashboardProps, DashboardState> {
    constructor(props: any) {
        super(props);
        this.state = {
            trans: []
        };
    }

    componentWillMount() {
        API.get('/api/v1/transaction/all').then((data: any) => {
            let trans = data.transactions;
            trans = trans.map((tr: any) => {
                return new Transaction(tr._id, tr.title, tr.amount, tr.type, tr.date, tr.card, tr.check);
            });
            this.setState({trans: trans});
        });

        this.props.fetchCards();
    }

    /*transactions methods*/
    handleTranAdd(tran: Transaction) {
        API.put('/api/v1/transaction', tran).then((res: any) => {
            if (res.status === 200) {
                return res.json();
            } else {
                throw {code: res.status.toString()};
            }
        })
            .then(data => {
                let tr = data.transaction;
                this.setState({
                    trans: [...this.state.trans,
                        new Transaction(tr._id, tr.title, tr.amount, tr.type, tr.date, tr.card, '')]
                });
            });

        this.changeCardBalance(tran);
    }

    handleTranEdit(tran: Transaction, history: any) {
        if (!tran) { return; }

        let formData = new FormData();
        formData.append('title', tran.title);
        if (tran.amount) {
            formData.append('amount', tran.amount.toString());
        }
        formData.append('type', tran.type);
        // formData.append('card', this.state.tran.card);
        formData.append('file', tran.check);

        fetch(`${HOST}/api/v1/transaction/${tran.id}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json, */*'
            },
            body: formData
        }).then((res: any) => {
            if (res.status < 400) {
                alert('transaction was updated');
                return res.json();
            } else {
                throw {code: res.status.toString()};
            }
        })
            .then((data: any) => {
                tran.check = data.transaction.check;
                let newTrans = this.state.trans.map((tr) => {
                    return tr.id === tran.id ? tran : tr;
                });
                this.setState({
                    trans: newTrans
                });
                history.push('/dashboard');
            });
    }

    handleTranDelete(tran: Transaction, history: any) {
        if (tran) {
            API.delete(`/api/v1/transaction/${tran.id}`)
                .then((res) => {
                    alert('Transaction has been deleted');
                    let newTrans: Array<Transaction> = [];
                    this.state.trans.map((el) => {
                        if (el.id !== tran.id) {
                            newTrans.push(el);
                        }
                    });
                    this.setState({
                        trans: newTrans
                    });
                    history.push('/dashboard');
                })
                .catch((err) => console.log(err));
        }
    }

    /*payment card methods*/
    changeCardBalance(tran: Transaction) {
        /*let card = this.state.cards.filter((c: any) => {return c.id === tran.card; })[0];
        if (!card) { return; }
        let newCard = {
            amount: Number(card.amount) + Number(tran.amount)
        };
        API.post(`/api/v1/card/${tran.card}`, newCard).then((res: any) => {
            if (res.status === 200) {
                return res.json();
            } else {
                throw {code: res.status.toString()};
            }
        }).then((data) => {
            let resCard = new Card(data.card._id, data.card.number, data.card.paymentSystem, data.card.amount);
            let newCards = this.state.cards.map((c: Card) => {
                return (c.id === resCard.id) ? resCard : c;
            });
            this.setState({cards: newCards});
        })*/
    }

    handleCardAdd(card: Card) {
        this.props.addCard(card);
    }

    handleCardEdit(card: Card, history: any) {
        this.props.editCard(card);
        alert('Payment card has been updated');
        history.push('/dashboard/cards');
    }

    handleCardDelete(card: Card, history: any) {
        this.props.deleteCard(card);
        alert('Payment card has been deleted');
        history.push('/dashboard/cards');
    }

    render() {
        return (
            <div>
                <h1>Bookkeeping Application</h1>
                <DashboardRouter
                    {...this.state}
                    cards={this.props.cards}
                    onTranAdd={(tran: Transaction) => this.handleTranAdd(tran)}
                    onTranEdit={(tran: Transaction, history: any) => this.handleTranEdit(tran, history)}
                    onTranDelete={(tran: Transaction, history: any) => this.handleTranDelete(tran, history)}
                    onCardAdd={(card: Card) => this.handleCardAdd(card)}
                    onCardEdit={(card: Card, history: any ) => this.handleCardEdit(card, history)}
                    onCardDelete={(card: Card, history: any) => this.handleCardDelete(card, history)}
                />
            </div>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        cards: state.cards
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        fetchCards: bindActionCreators(actionFetchCards, dispatch),
        addCard: bindActionCreators(actionAddCard, dispatch),
        editCard: bindActionCreators(actionEditCard, dispatch),
        deleteCard: bindActionCreators(actionDeleteCard, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage as any);