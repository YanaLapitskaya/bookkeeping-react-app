export class Transaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    date: Date = new Date();

    constructor(id: number, title: string, amount: number, type: string, date: Date) {
        this.id = id;
        this.title = title;
        this.amount = amount;
        this.type = type;
        this.date = date;
    }

}
