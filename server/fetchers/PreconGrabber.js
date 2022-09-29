const axios = require("axios");

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

                    await axios.get(`https://api2.moxfield.com/v2/decks/all/${id}`).then(async (deck_data_raw) => {
                        let deck_data = deck_data_raw.data;

                        precon_List.push({
                            id: id,
                            name: name,
                            data: deck_data
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

