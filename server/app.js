const precons = require('./fetchers/PreconGrabber');
const cors = require('cors');
const express = require('express');

const app = express();
app.use(cors());

let decks = {};

app.listen(9000, async () => {
    console.log('[Magic Library Builder] Server Started!');
    decks = await precons.grab();
});

app.get("/precons", (req, res) => {
    res.send(decks);
})