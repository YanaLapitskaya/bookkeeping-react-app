import {
    CARD_ADD, CARD_DELETE, CARD_EDIT, CARDS_EDIT_BALANCE, CARDS_SET, SAVINGS_ADD, SAVINGS_EDIT, SAVINGS_SET, TRAN_ADD,
    TRAN_DELETE,
    TRAN_EDIT,
    TRAN_SET
} from './ActionTypes';
import { combineReducers, Reducer } from 'redux';
import { Action, handleActions, ReducerMap } from 'redux-actions';
import { AppState, getInitialState } from './AppState';
import Saving from '../models/Saving';
import Card from '../models/Card';
import Transaction from '../models/Transaction';

// saving reducer
type SavingState = Saving[];
type SavingPayload = Saving;
const initialSavingsState = getInitialState().savings;
const SavingsReducer = handleActions<SavingState, SavingPayload>({
    [SAVINGS_SET]: (state: SavingState, action: Action<SavingPayload[]>): SavingState => {
        return [...action.payload || []];
    },
    [SAVINGS_ADD]: (state: SavingState, action: Action<SavingPayload>): SavingState => {
        let nextState = state;
        if (action.payload) {
            nextState = [...state, action.payload];
        }
        return nextState;
    },
    [SAVINGS_EDIT]: (state: SavingState, action: Action<SavingPayload>): SavingState => {
        let nextState = state;
        if (action.payload) {
            let saving = action.payload;
            let id = saving.id;
            nextState = state.map((el) => {
                return el.id === id ? saving : el;
            });
        }
        return nextState;
    }
} as ReducerMap<SavingState, SavingPayload>, initialSavingsState);

// card reducer
type CardState = Card[];
type CardPayload = Card;
let initialCardsState = getInitialState().cards;
const CardsReducer = handleActions<CardState, CardPayload>({
    [CARDS_SET]: (state: CardState, action: Action<CardPayload[]>): CardState => {
        return [...action.payload || []];
    },
    [CARD_ADD]: (state: CardState, action: Action<CardPayload>): CardState => {
        let nextState = state;
        if (action.payload) {
            nextState = [...state, action.payload];
        }
        return nextState;
    },
    [CARD_EDIT]: (state: CardState, action: Action<CardPayload>): CardState => {
        let nextState = state;
        if (action.payload) {
            let card = action.payload;
            let id = card.id;
            nextState = state.map((el) => {
                return el.id === id ? card : el;
            });
        }
        return nextState;
    },
    [CARD_DELETE]: (state: CardState, action: Action<CardPayload>): CardState => {
        let nextState = state;
        if (action.payload) {
            let id = action.payload.id;
            nextState = [];
            for (let el of state) {
                if (el.id !== id) { nextState.push(el); }
            }
        }
        return nextState;
    },
    [CARDS_EDIT_BALANCE]: (state: CardState, action: Action<CardPayload>): CardState => {
        let nextState = state;
        if (action.payload) {
            let card = action.payload;
            let id = card.id;
            nextState = state.map((el) => {
                return el.id === id ? card : el;
            });
        }
        return nextState;
    }
} as ReducerMap<CardState, CardPayload>, initialCardsState);

// transaction reducer
type TranState = Transaction[];
type TranPayload = Transaction;
let initialTransState = getInitialState().trans;
const TransReducer = handleActions<TranState, TranPayload>({
    [TRAN_SET]: (state: TranState, action: Action<TranPayload[]>): TranState => {
        return [...action.payload || []];
    },
    [TRAN_ADD]: (state: TranState, action: Action<TranPayload>): TranState => {
        let nextState = state;
        if (action.payload) {
            nextState = [...state, action.payload];
        }
        return nextState;
    },
    [TRAN_EDIT]: (state: TranState, action: Action<TranPayload>): TranState => {
        let nextState = state;
        if (action.payload) {
            let tran = action.payload;
            let id = tran.id;
            nextState = state.map((el) => {
                return el.id === id ? tran : el;
            });
        }
        return nextState;
    },
    [TRAN_DELETE]: (state: TranState, action: Action<TranPayload>): TranState => {
        let nextState = state;
        if (action.payload) {
            let id = action.payload.id;
            nextState = [];
            for (let el of state) {
                if (el.id !== id) { nextState.push(el); }
            }
        }
        return nextState;
    }
} as ReducerMap<TranState, TranPayload>, initialTransState);

// RootReducer
const rootReducer: Reducer<AppState>  = combineReducers({
    savings: SavingsReducer,
    cards: CardsReducer,
    trans: TransReducer
});

export default rootReducer;