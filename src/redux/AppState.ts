import Saving from '../models/Saving';
import Card from '../models/Card';

export interface AppState {
    savings: Array<Saving>;
    cards: Array<Card>;
}
const savings: Array<Saving> = [];
const cards: Array<Card> = [];

export const getInitialState = (): AppState => {
    return {savings, cards};
};