import Card from '../models/Card';
import API from '../API';
import { CARD_ADD, CARD_DELETE, CARD_EDIT, CARDS_SET } from './ActionTypes';

export function actionFetchCards() {
    return (dispatch: any) => {
        API.get('/api/v1/card/all').then((data: any) => {
            let cards = data.cards;
            cards = cards.map((c: any) => {
                return new Card(c._id, c.number, c.paymentSystem, c.amount);
            });
            dispatch({
               type: CARDS_SET,
               payload: cards
            });
        });
    };
}

export function actionAddCard(card: Card) {
    return (dispatch: any) => {
            API.put('/api/v1/card', card).then((res: any) => {
                if (res.status < 400) {
                    return res.json();
                } else {
                    throw {code: res.status.toString()};
                }
            })
                .then(data => {
                    let c = data.card;
                    let newCard = new Card(c._id, c.number, c.paymentSystem, c.amount);
                    dispatch({
                        type: CARD_ADD,
                        payload: newCard
                    });
                })
                .catch(err => {
                    throw new Error(JSON.stringify(err.message || err));
                });
    };
}

export function actionEditCard(card: Card) {
    return (dispatch: any) => {
        if (!card) {
            return;
        }
        let cardRq = {
            number: card.number,
            paymentSystem: card.paymentSystem,
            amount: card.amount
        };
        API.post(`/api/v1/card/${card.id}`, cardRq)
            .then((res: any) => {
                if (res.status < 400) {
                    return res.json();
                } else {
                    throw {code: res.status.toString()};
                }
            })
            .then(data => {
                let c = data.card;
                let editedCard = new Card(c._id, c.number, c.paymentSystem, c.amount);
                dispatch({
                    type: CARD_EDIT,
                    payload: editedCard
                });
            })
            .catch(err => {
                throw new Error(JSON.stringify(err.message || err));
            });
    };
}

export function actionDeleteCard(card: Card) {
    return (dispatch: any) => {
        if (!card) { return; }
        API.delete(`/api/v1/card/${card.id}`)
            .then((res) => {
                dispatch({
                    type: CARD_DELETE,
                    payload: card
                });
            })
            .catch(err => {
                throw new Error(JSON.stringify(err.message || err));
            });
    };
}