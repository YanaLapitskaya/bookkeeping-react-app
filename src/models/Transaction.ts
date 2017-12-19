export default class Transaction {
    id: string;
    title: string;
    amount: number;
    type: string;
    date: string;
    card: string;

    constructor(id: string, title: string, amount: number, type: string, date: string, card: string) {
        let dateObj = new Date(date);
        this.id = id;
        this.title = title;
        this.amount = amount;
        this.type = type;
        this.date = dateObj.toLocaleDateString('en-US') + ' ' + dateObj.toLocaleTimeString('en-US');
        this.card = card;
    }

}
