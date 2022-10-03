const axios = require("axios");
const Card = require("../cards/card");
const Library = require("../cards/library");

const FORMAT = "commanderPrecons";
const PAGE_SIZE = 100;

module.exports = {
    grab: async() => {

        let precon_List = [];
        let complete = false;
        let current_page = 1;

        while(!complete) {
            await axios.get(`https://api2.moxfield.com/v2/users/WizardsOfTheCoast/decks?pageNumber=${current_page}&pageSize=${PAGE_SIZE}`).then(async (data_raw) => {

                let decks = data_raw.data.data;

                if(decks.length === 0) 
                    complete = true;

                decks.filter((x => x.format === FORMAT)).map(async (deck) => {
                    let id = deck.publicId;
                    let name = deck.name;

                    let lib = new Library();

                    await axios.get(`https://api2.moxfield.com/v2/decks/all/${id}`).then(async (deck_data_raw) => {
                        let deck_data = deck_data_raw.data;

                        Object.keys(deck_data.mainboard).map((card) => {
                            
                            let card_info = deck_data.mainboard[card];

                            let c = new Card(card_info.card.id, card_info.card.name, card_info);
                            c.setAmount(card_info.quantity)

                            lib.AddCard(c);
                        })

                        precon_List.push({
                            id: id,
                            name: name,
                            commander: Object.values(deck_data.commanders)[0],
                            cards: lib.GetCards()
                        });
                    })
                });
            });

            current_page++;
        }

        console.log("[Magic Library Builder] Fetched precon list");

        return precon_List;
    }
}

