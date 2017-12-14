export class Transaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    date: number;

    constructor(title: string, amount: number, type: string) {
        this.id = Math.floor(10000 * Math.random());
        this.title = title;
        this.amount = amount;
        this.type = type;
        this.date = Date.now();
    }

}

export function getStubTransList() {
    return [
        new Transaction('Buy some cheese', 15, 'food'),
        new Transaction('Buy some stylish clothes', 65, 'clothes'),
        new Transaction('Go to cinema', 20, 'entertainment')
    ];

}