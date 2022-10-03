module.exports = class Library {
    constructor() {
        this.cards = [];
    }

    AddCard(card) {

        if(this.ContainsCardByID(card.id)) {
            let found = this.GetCardByID(card.id);
            found.setAmount(found.getAmount() + 1);
        }

        else 
            this.cards.push(card);
    }

    ContainsCardByName(name) {
        this.cards.filter(x => x.name === name).length > 0;
    }

    GetCardByName(name) {
        this.cards.filter(x => x.name === name)[0];
    }

    ContainsCardByID(id) {
        this.cards.filter(x => x.id === id).length > 0;
    }

    GetCardByID(id) {
        this.cards.filter(x => x.id === id)[0];
    }

    GetCards() {
        return this.cards;
    }
}