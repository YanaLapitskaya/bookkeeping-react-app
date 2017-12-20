import * as React from 'react';
import DashboardRouter from './DashboardRouter';
import Transaction from '../models/Transaction';
import Card from '../models/Card';
import API from '../API';

interface DashboardState {
    trans: Array<Transaction>;
    cards: Array<Card>;
}
export default class DashboardPage extends React.Component<{}, DashboardState> {
    constructor(props: any) {
        super(props);
        this.state = {
            trans: [],
            cards: []
        };
    }

    componentWillMount() {
        API.get('/api/v1/transaction/all').then((data: any) => {
            let trans = data.transactions;
            trans = trans.map((tr: any) => {
                return new Transaction(tr._id, tr.title, tr.amount, tr.type, tr.date, tr.card);
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
    }

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
                        new Transaction(tr._id, tr.title, tr.amount, tr.type, tr.date, tr.card)]
                });
            });

        this.changeCardBalance(tran);
    }

    changeCardBalance(tran: Transaction) {
        let card = this.state.cards.filter((c: any) => {return c.id === tran.card; })[0];
        if (!card) return;
        let newCard = {
            amount: card.amount + tran.amount
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

    render() {
        return (
            <div>
                <h1>Bookkeeping Application</h1>
                <DashboardRouter
                    {...this.state}
                    onTranAdd={(tran: Transaction) => this.handleTranAdd(tran)}
                    onCardAdd={(card: Card) => this.handleCardAdd(card)}
                />
            </div>
        );
    }
}