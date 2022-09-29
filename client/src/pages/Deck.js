import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';

const types = ["PLANESWALKER", "CREATURE", "ARTIFACT", "SORCERY", "ENCHANTMENT", "INSTANT", "LAND"];


function Deck({decks}) {

    const { slug } = useParams();
    const history = useNavigate()
    const redirectToPage = (url) => history('/' + url)

    let deck = decks.filter(x => x.id === slug)[0];

    useEffect(() => {
        document.title = "MTG Helper | Deck";
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }, []);

    let added = [];

    return <>
        <div className="deck-page">
            {
                decks.length > 0 ? (
                    deck !== undefined ? (
                        <div className='deck-info fadein'>
                            <div className='top-title flex col'>
                                {deck.name.split("(")[0]}
                                <div className='sub'>
                                    {deck.name.split("(")[1].replace(")", "")}
                                </div>
                            </div>
    
                            <div className='card-list flex col'>
                                {console.log(deck)}

                                <div className='card flex col hover' onClick={() => window.open("https://scryfall.com/card/" + Object.values(deck.data.commanders)[0].card.scryfall_id)}>
                                    <div className='title'><u>Commander</u></div>
                                    <img 
                                        className='commander' 
                                        src={`https://assets.moxfield.net/cards/card-${Object.values(deck.data.commanders)[0].card.id}-normal.webp`} 
                                        alt="Commander Card"
                                    />
                                </div>
                                
                                {
                                    types.map((type) => {
                                        return <div className='category flex col'>
                                            <div className='title'><u>{type}</u></div>
                                            <div className='others flex'>
                                                {
                                                    deck !== undefined ? (Object.values(deck.data.mainboard).filter((x => String(x.card.type_line).toUpperCase().includes(type) && !added.includes(x.card.name))).length > 0 ?
                                                    
                                                    
                                                        Object.values(deck.data.mainboard).filter((x => String(x.card.type_line).toUpperCase().includes(type) && !added.includes(x.card.name))).map((card) => {
                                                            
                                                            added.push(card.card.name);

                                                            return <div className='card flex col hover' onClick={() => window.open("https://scryfall.com/card/" + card.card.scryfall_id)}>
                                                                <img 
                                                                    className='other' 
                                                                    src={`https://assets.moxfield.net/cards/card-${card.card.id}-normal.webp`} 
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
                            <div>Error 404: This deck can't be found...</div>
                            <div className='back hover' onClick={() => redirectToPage("")}>Return Home</div>
                        </div>
                ) :

                <div className='loading'>Loading...</div>
            }
        </div>

        <style jsx>
            {`

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

export default Deck;