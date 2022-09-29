export class User {
    constructor(id, cards) {
        this.id = id;
        this.cards = cards;
    }

    getID() {
        return this.id;
    }

    getCards() {
        return this.cards;
    }
}