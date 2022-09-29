
let users = [];

module.exports = {
    containsUser: (id) => {
        return users.filter(x => x.getID() === id).length > 0;
    },

    getUser: (id) => {
        return users.filter(x => x.getID() === id)[0];
    }
}