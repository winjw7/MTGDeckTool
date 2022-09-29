export class Library {
    constructor() {
        this.cards = [];
    }

    AddCard(card) {
        this.cards.push(card);
    }

    GetCardByName(name) {
        this.cards.filter(x => x.name === name)[0];
    }

    GetCardByID(id) {
        this.cards.filter(x => x.id === id)[0];
    }
}