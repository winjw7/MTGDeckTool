const precons = require('./fetchers/PreconGrabber');
const cors = require('cors');
const express = require('express');

const app = express();
app.use(cors());

let decks = {};

const users = require("./user/users")

app.listen(9000, async () => {
    console.log('[Magic Library Builder] Server Started!');
    decks = await precons.grab();
});

app.get("/precons", (req, res) => {
    res.send(decks);
})

app.get("/user/add-deck", (req, res) => {

    let id = req.params['id'];
    let deck = req.params['deck'];

    if(!users.containsUser(id))
        res.status(404)

    
})