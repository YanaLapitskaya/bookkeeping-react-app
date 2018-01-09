import Saving from '../models/Saving';
import { SAVINGS_ADD, SAVINGS_EDIT, SAVINGS_SET } from './ActionTypes';
import API from '../API';
import { Action } from 'redux-actions';

export function actionFetchSavings(onSuccessAction?: (payload: any) => Action<any> ): any {
    return (dispatch: any) => {
        API.get('/api/v1/saving/all')
            .then((data: any) => {
                let savings = data.savings;
                savings = savings.map((s: any) => {
                    return new Saving(s._id, s.title, s.curAmount, s.tarAmount);
                });
                onSuccessAction ? dispatch(onSuccessAction(savings)) : null;
            })
            .catch(err => {
                throw new Error(JSON.stringify(err.message || err));
            });
    };
}

export function actionSetSavings(savings: Array<Saving>): any {
    return {
        type: SAVINGS_SET,
        payload: savings
    };
}

export function actionAddSaving(saving: Saving): any {
    return (dispatch: any) => {
        API.put('/api/v1/saving', saving).then((res: any) => {
            if (res.status < 400) {
                return res.json();
            } else {
                throw {code: res.status.toString()};
            }
        })
        .then(data => {
            let s = data.saving;
            let newSaving = new Saving(s._id, s.title, s.curAmount, s.tarAmount);
            dispatch({
                type: SAVINGS_ADD,
                payload: newSaving
            });
        })
        .catch(err => {
            throw new Error(JSON.stringify(err.message || err));
        });
    };
}

export function actionEditSaving(saving: Saving): any {
    return (dispatch: any) => {
        let id = saving.id;
        let request = {
            title: saving.title,
            curAmount: saving.curAmount,
            tarAmount: saving.tarAmount
        };
        API.post(`/api/v1/saving/${id}`, request)
            .then((res: any) => {
                if (res.status < 400) {
                    return res.json();
                } else {
                    throw {code: res.status.toString()};
                }
            })
            .then(data => {
                let editedSaving = new Saving(
                    data.saving._id,
                    data.saving.title,
                    data.saving.curAmount,
                    data.saving.tarAmount
                );
                dispatch({
                    type: SAVINGS_EDIT,
                    payload: editedSaving
                });
            })
            .catch(err => {
                throw new Error(JSON.stringify(err.message || err));
            });
    };
}