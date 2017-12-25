import { HOST } from './Constants';

export default class API {

    // to read
    static get(path: String): Promise<{}> {
        const fetchPromise = new Promise((resolve, reject) => {
            //noinspection TypeScriptUnresolvedFunction
            return fetch(`${HOST}${path}`, { method: 'get', credentials: 'include'})
                        .then(res => {
                            if (res.status < 400) {
                                return res.json();
                            } else {
                                throw {code: res.status.toString()};
                            }
                })
                .then(data => {
                    resolve(data);
                })
                .catch(err => {
                    reject(err);
                });
        });

        return fetchPromise;
    }

    // to create
    static put(path: string, payload: Object): Promise<{}> {
        return putOrPost('PUT', path, payload);
    }

    // to update
    static post(path: string, payload: Object): Promise<{}> {
        return putOrPost('POST', path, payload);
    }

    // to delete
    static delete(path: string ): Promise<{}> {
        return fetch(`${HOST}${path}`, {
            method: 'delete',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }

}

function putOrPost(method: string, path: string, payload: Object): Promise<{}> {
    return fetch(`${HOST}${path}`, {
        method,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    });
}