import { SAVINGS_ADD, SAVINGS_EDIT, SAVINGS_SET } from './ActionTypes';
import { combineReducers, Reducer } from 'redux';
import { Action, handleActions, ReducerMap } from 'redux-actions';
import { AppState, getInitialState } from './AppState';
import Saving from '../models/Saving';

type SavingState = Saving[];
type SavingPayload = Saving;

const initialState = getInitialState().savings;
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
} as ReducerMap<SavingState, SavingPayload>, initialState);

// RootReducer
const rootReducer: Reducer<AppState>  = combineReducers({
    savings: SavingsReducer
});

export default rootReducer;