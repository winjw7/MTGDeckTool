export class Card {
    constructor(id, name, data) {
        this.id = id;
        this.name = name;
        this.data = data;
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
}