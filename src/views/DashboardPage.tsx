import * as React from 'react';
import DashboardRouter from './DashboardRouter';
import Transaction from '../models/Transaction';
import Card from '../models/Card';
import Saving from '../models/Saving';
import API from '../API';
import {HOST} from '../Constants';

interface DashboardProps {
    match: any;
    location: any;
    history: any;
}
interface DashboardState {
    trans: Array<Transaction>;
    cards: Array<Card>;
    savings: Array<Saving>;
}
export default class DashboardPage extends React.Component<DashboardProps, DashboardState> {
    constructor(props: any) {
        super(props);
        this.state = {
            trans: [],
            cards: [],
            savings: []
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

        API.get('/api/v1/card/all').then((data: any) => {
            let cards = data.cards;
            cards = cards.map((c: any) => {
                return new Card(c._id, c.number, c.paymentSystem, c.amount);
            });
            this.setState({cards: cards});
        });

        API.get('/api/v1/saving/all').then((data: any) => {
            let savings = data.savings;
            savings = savings.map((s: any) => {
                return new Saving(s._id, s.title, s.curAmount, s.tarAmount);
            });
            this.setState({savings: savings});
        });
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
                        new Transaction(tr._id, tr.title, tr.amount, tr.type, tr.date, tr.card,'')]
                });
            });

        this.changeCardBalance(tran);
    }

    handleTranEdit(tran: Transaction, history: any) {
        if (!tran) { return; }

        let formData = new FormData();
        formData.append('title', tran.title);
        formData.append('amount', tran.amount.toString());
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
        let card = this.state.cards.filter((c: any) => {return c.id === tran.card; })[0];
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
        });
    }

    handleCardAdd(card: Card) {
        API.put('/api/v1/card', card).then((res: any) => {
            if (res.status < 400) {
                return res.json();
            } else {
                throw {code: res.status.toString()};
            }
        })
            .then(data => {
                let c = data.card;
                this.setState({
                    cards: [...this.state.cards, new Card(c._id, c.number, c.paymentSystem, c.amount)]
                });
            });
    }

    handleCardEdit(card: Card, history: any) {
        if (!card) { return; }
        let cardRq = {
            number: card.number,
            paymentSystem: card.paymentSystem,
            amount: card.amount
        };
        API.post(`/api/v1/card/${card.id}`, cardRq)
            .then((res: any) => {
                if (res.status === 200) {
                    alert('Payment card has been updated');
                    let newCards = this.state.cards.map((el) => {
                        return el.id === card.id ? card : el;
                    });
                    this.setState({
                        cards: newCards
                    });
                    history.push('/dashboard/cards');
                }
            })
            .catch((err) => {console.log(err); });
    }

    handleCardDelete(card: Card, history: any) {
        if (card) {
            API.delete(`/api/v1/card/${card.id}`)
                .then((res) => {
                    alert('Payment card has been deleted');
                    let newCards: Array<Card> = [];
                    this.state.cards.map((el) => {
                        if (el.id !== card.id) {
                            newCards.push(el);
                        }
                    });
                    this.setState({
                        cards: newCards
                    });
                    history.push('/dashboard/cards');
                })
                .catch((err) => console.log(err));
        }
    }

    /*savings methods*/
    handleSavingAdd(saving: Saving) {
        API.put('/api/v1/saving', saving).then((res: any) => {
            if (res.status < 400) {
                return res.json();
            } else {
                throw {code: res.status.toString()};
            }
        })
            .then(data => {
                let s = data.saving;
                this.setState({
                    savings: [...this.state.savings, new Saving(s._id, s.title, s.curAmount, s.tarAmount)]
                });
            });
    }

    handleSavingEdit(id: string, saving: Saving) {
        if (!saving) { return; }
        let savingRq = {
            title: saving.title,
            curAmount: saving.curAmount,
            tarAmount: saving.tarAmount
        };
        API.post(`/api/v1/saving/${id}`, savingRq)
            .then((res: any) => {
                if (res.status === 200) {
                    let newSavings = this.state.savings.map((el) => {
                        return el.id === id ? saving : el;
                    });
                    this.setState({
                        savings: newSavings
                    });
                }
            })
            .catch((err) => {console.log(err); });
    }

    render() {
        return (
            <div>
                <h1>Bookkeeping Application</h1>
                <DashboardRouter
                    {...this.state}
                    onTranAdd={(tran: Transaction) => this.handleTranAdd(tran)}
                    onTranEdit={(tran: Transaction, history: any) => this.handleTranEdit(tran, history)}
                    onTranDelete={(tran: Transaction, history: any) => this.handleTranDelete(tran, history)}
                    onCardAdd={(card: Card) => this.handleCardAdd(card)}
                    onCardEdit={(card: Card, history: any ) => this.handleCardEdit(card, history)}
                    onCardDelete={(card: Card, history: any) => this.handleCardDelete(card, history)}
                    onSavingAdd={(saving: Saving) => this.handleSavingAdd(saving)}
                    onSavingEdit={(id:string, saving: Saving) => this.handleSavingEdit(id, saving)}
                />
            </div>
        );
    }
}
