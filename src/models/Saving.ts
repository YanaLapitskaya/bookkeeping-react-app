export default class Saving {
    id: string | undefined;
    title: string;
    curAmount: number;
    tarAmount: number;

    constructor(id: string | undefined, title: string, curAmount: number, tarAmount: number) {
        this.id = id;
        this.title = title;
        this.curAmount = curAmount;
        this.tarAmount = tarAmount;
    }

}
