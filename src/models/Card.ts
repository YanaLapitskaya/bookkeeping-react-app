export default class Card {
    id: string;
    number: string;
    paymentSystem: string;
    // paymentSystemLogo: Buffer;
    amount: number;

    constructor(id: string, number: string, paymentSystem: string, amount: number) {
        this.id = id;
        this.number = number;
        this.paymentSystem = paymentSystem;
        this.amount = amount;
    }

}
