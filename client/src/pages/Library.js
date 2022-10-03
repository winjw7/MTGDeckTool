import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import { useCookies } from 'react-cookie';

const TYPES = ["LEGENDARY CREATURE", "PLANESWALKER", "CREATURE", "ARTIFACT", "SORCERY", "ENCHANTMENT", "INSTANT", "LAND"];

const ALL_COLORS = ["WHITE", "BLUE", "BLACK", "RED", "GREEN"]

function MatchesColor(color_identity, colors) {
    
    let good = true;

    Object.values(color_identity).map((col) => {
        if(col === "R" && !colors.includes("RED")) 
            good = false;
        
        else if(col === "G" && !colors.includes("GREEN")) 
            good = false;

        else if(col === "U" && !colors.includes("BLUE")) 
            good = false;

        else if(col === "W" && !colors.includes("WHITE")) 
            good = false;

        else if(col === "B" && !colors.includes("BLACK")) 
            good = false;
    })

    return good;
}

function Library({decks}) {

    const { slug } = useParams();
    const history = useNavigate()
    const redirectToPage = (url) => history('/' + url)

    const [cookies, setCookie] = useCookies(["owned_precons"]);

    const [cards, setCards] = useState([]);    
    const[selectedColors, setSelectedColors] = useState(ALL_COLORS);

    useEffect(() => {
        document.title = "MTG Helper | Library";
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});

        if(decks !== undefined) {

            let temp = [];
    
            decks.map((deck) => {
                if(cookies.owned_precons !== undefined && cookies.owned_precons[deck.id] > 0) {
                    for(let i = 0; i < cookies.owned_precons[deck.id]; i++) {
                        deck.cards.map((card) => {
                            if(temp.filter((x => x.id === card.id)).length > 0) {
                                temp.filter((x => x.id === card.id))[0].quantity += card.quantity;
                            } else {
                                temp.push(card);
                                console.log(card);
                            }
                        });

                        temp.push({
                            id: deck.commander.card.id,
                            name: deck.commander.name,
                            data: deck.commander,
                            quantity: 1,
                        })
                    }
                }
            })
    
            setCards(temp);
        }
    }, []);

    let added = [];

    return <>
        <div className="deck-page">
            {         
                decks.length > 0 ? (
                    cards.length > 0 ? (
                        <div className='deck-info fadein'>
                            <div className='top-title flex col'>
                                Your Library
                                <div className='sub flex'>
                                    {
                                        ALL_COLORS.map((color) => {
                                            return <div 
                                                className='color flex moveup hover'
                                                onClick={() => {
                                                    if(selectedColors.includes(color))
                                                        setSelectedColors(selectedColors.filter((x => x !== color)))
                                                    else {
                                                        selectedColors.push(color);
                                                        setSelectedColors([...selectedColors])
                                                    }
                                                }}
                                                id={selectedColors.includes(color) ? "" : "not-selected"}
                                            >
                                                {color}
                                            </div>
                                        })
                                    }
                                </div>
                            </div>
    
                            <div className='card-list flex col'>
                                {
                                    TYPES.map((type) => {
                                        return <div className='category flex col'>
                                            <div className='title'><u>{type}</u></div>

                                            <div className='others flex'>
                                                {
                                                    cards.length > 0 ? (cards.filter((x => String(x.data.card.type_line).toUpperCase().includes(type) && !added.includes(x.id))).length > 0 ?
                                                        cards.filter((x => String(x.data.card.type_line).toUpperCase().includes(type) && !added.includes(x.id) && MatchesColor(x.data.card.color_identity, selectedColors))).sort((a, b) => a.data.card.cmc > b.data.card.cmc ? 1 : -1).map((card) => {

                                                            added.push(card.id);

                                                            return <div className='card flex col hover' onClick={() => window.open("https://scryfall.com/card/" + card.data.card.scryfall_id)}>
                                                                <img 
                                                                    className='other' 
                                                                    src={`https://assets.moxfield.net/cards/card-${card.id}-normal.webp`} 
                                                                    alt="Card"
                                                                />
                                                                <div className='sub'>x{card.quantity}</div>
                                                            </div>
                                                        }): 
                                                        
                                                            <div className='none'>None</div>
                                                        
                                                        ): ""
                                                }
                                            </div>
                                        </div>
                                    })
                                }

                                <br/>
                                <br/>
                                <br/>
                            </div>
                        </div>)
                    
                        :
    
                        <div className='not-found flex col'>
                            <div>No precons selected! Please go select cards!</div>
                            <div className='back hover' onClick={() => redirectToPage("")}>Return Home</div>
                        </div>
                ) :

                <div className='loading'>Loading...</div>
            }
        </div>

        <style jsx>
            {`
                .color {
                    width: 100px;
                    height: 50px;
                    background: green;
                }

                #not-selected{
                    background: red;
                }


                .top-title {
                    gap: 5px;
                    margin-bottom: 50px;
                }

                .card-list {
                    width: 100%;
                    gap: 50px;
                }

                .card {
                    height: 350px;
                    gap: 10px;
                }

                .card-list > div {
                    gap: 5px;
                }

                .deck-info {
                    gap: 25px;
                    width: 100%;
                    height: 100%;
                    margin-top: 50px;
                }

                .card > img {
                    height: 300px;
                    border-radius: 16px;
                    transition-duration: .35s;
                }

                .deck-page {
                    width: 100%;
                    height: 100%;
                    overflow-y: scroll;
                }

                .not-found {
                    gap: 25px;
                    font-family: Montserrat-Regular;
                    color: gray;
                    margin-top: 50px;
                }

                .back {
                    font-family: Montserrat-Medium;
                    color: white;
                }

                .loading {
                    color: gray;
                    font-family: Montserrat-Regular;
                }

                .sub, .none {
                    font-family: Montserrat-Regular;
                    gap: 15px;
                }

                .category {
                    width: 100%;
                    gap: 10px;
                    text-align: left;
                    font-family: Montserrat-Regular;
                }

                .category > .title {
                    width: 92%;
                }

                .none {
                    text-align: left;
                    margin-left: 15px;
                    margin-top: 5px;
                }

                .others {
                    grid-template-columns: repeat(auto-fill,225px) 10%;
                    display: inline-grid;
                    width: 100%;
                }
            `}
        </style>
    </>
}

export default Library;