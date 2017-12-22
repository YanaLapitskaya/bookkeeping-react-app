export default class Transaction {
    id: string;
    title: string;
    amount: number;
    type: string;
    date: string;
    card: string;
    check: string;

    constructor(id: string, title: string, amount: number, type: string, date: string, card: string, check: string) {
        let dateObj = new Date(date);
        this.id = id;
        this.title = title;
        this.amount = amount;
        this.type = type;
        this.date = dateObj.toLocaleDateString('en-US') + ' ' + dateObj.toLocaleTimeString('en-US');
        this.card = card;
        this.check = check;
    }

}
