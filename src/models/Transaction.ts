export class Transaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    date: number;

    constructor(title: string, amount: number, type: string) {
        this.title = title;
        this.amount = amount;
        this.type = type;
    }

}
