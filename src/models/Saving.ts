export default class Card {
    id: string;
    title: string;
    curAmount: number;
    tarAmount: number;

    constructor(id: string, title: string, curAmount: number, tarAmount: number) {
        this.id = id;
        this.title = title;
        this.curAmount = curAmount;
        this.tarAmount = tarAmount;
    }

}
