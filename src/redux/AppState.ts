import Saving from '../models/Saving';
import Card from '../models/Card';
import Transaction from '../models/Transaction';

export interface AppState {
    savings: Array<Saving>;
    cards: Array<Card>;
    trans: Array<Transaction>;
}
const savings: Array<Saving> = [];
const cards: Array<Card> = [];
const trans: Array<Transaction> = [];

export const getInitialState = (): AppState => {
    return {savings, cards, trans};
};