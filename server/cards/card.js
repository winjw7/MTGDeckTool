module.exports = class Card {
    constructor(id, name, data) {
        this.id = id;
        this.name = name;
        this.data = data;
        this.quantity = 1;
    }

    getID() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getData() {
        return this.data;
    }

    getAmount() {
        return this.quantity;
    }

    setAmount(amount) {
        this.quantity = amount;
    }
}