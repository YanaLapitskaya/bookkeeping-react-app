import Transaction from '../models/Transaction';
import API from '../API';
import { TRAN_ADD, TRAN_DELETE, TRAN_EDIT, TRAN_SET } from './ActionTypes';
import { HOST } from '../Constants';

export function actionFetchTrans() {
    return (dispatch: any) => {
        API.get('/api/v1/transaction/all').then((data: any) => {
            let trans = data.transactions;
            trans = trans.map((tr: any) => {
                return new Transaction(tr._id, tr.title, tr.amount, tr.type, tr.date, tr.card, tr.check);
            });
            dispatch({
               type: TRAN_SET,
               payload:  trans
            });
        });
    };
}

export function actionAddTran(tran: Transaction) {
    return (dispatch: any) => {
        API.put('/api/v1/transaction', tran).then((res: any) => {
            if (res.status === 200) {
                return res.json();
            } else {
                throw {code: res.status.toString()};
            }
        })
            .then(data => {
                let tr = data.transaction;
                let newTran = new Transaction(tr._id, tr.title, tr.amount, tr.type, tr.date, tr.card, '');
                dispatch({
                    type: TRAN_ADD,
                    payload: newTran
                });
            })
            .catch(err => {
                throw new Error(JSON.stringify(err.message || err));
            });
    };
}

export function actionEditTran(tran: Transaction) {
    return (dispatch: any) => {
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
        })
            .then((res: any) => {
                if (res.status < 400) {
                    return res.json();
                } else {
                    throw {code: res.status.toString()};
                }
            })
            .then((data: any) => {
                let tr = data.transaction;
                let editedTrans = new Transaction(tr._id, tr.title, tr.amount, tr.type, tr.date, tr.card, tr.check);
                dispatch({
                    type: TRAN_EDIT,
                    payload: editedTrans
                });
            })
            .catch((err: any) => {
                throw new Error(JSON.stringify(err.message || err));
            });
    };
}

export function actionDeleteTran(tran: Transaction) {
    return (dispatch: any) => {
        if (!tran) { return; }
        API.delete(`/api/v1/transaction/${tran.id}`)
            .then((res) => {
                dispatch({
                    type: TRAN_DELETE,
                    payload: tran
                });
            })
            .catch(err => {
                throw new Error(JSON.stringify(err.message || err));
            });
    };
}