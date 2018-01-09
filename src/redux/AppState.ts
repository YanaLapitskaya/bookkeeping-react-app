import Saving from '../models/Saving';

export interface AppState {
    savings: Array<Saving>;
}
const savings: Array<Saving> = [];

export const getInitialState = (): AppState => {
    return {savings};
};