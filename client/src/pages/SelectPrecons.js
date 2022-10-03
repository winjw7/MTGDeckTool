import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function SelectPrecons({decks}) {

    const history = useNavigate()
    const redirectToPage = (url) => history('/' + url)

    useEffect(() => {
        document.title = "MTG Helper | Precons";
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }, []);

    const [cookies, setCookie] = useCookies(["owned_precons"]);

    return <>
        <div className="decks-page fadein">
            <div className='title'>
                Select Precons
                <div className='sub flex'>
                    Left click to add / Right click to remove
                </div>
            </div>

            <div className='precon-list flex center' id={decks.length > 0 ? "grid" : ""}>
                {
                    decks.length > 0 ? decks.sort(x => cookies.owned_precons !== undefined && cookies.owned_precons[x.id] ? -1 : 1).map((deck) => {

                        let info = String(deck?.name).split("(");

                        return <div 
                                className='precon-deck flex col hover moveup fadein' 
                                id={cookies.owned_precons !== undefined && cookies.owned_precons[deck.id] ? "selected-precon" : ""}
                                onClick={() => {
                                    let temp = cookies.owned_precons ? cookies.owned_precons : {};
                                    temp[deck.id] ? temp[deck.id]++ : temp[deck.id] = 1;
                                    setCookie("owned_precons", temp);
                                    console.log(cookies.owned_precons)
                                }}
                                onContextMenu={(event) => {
                                    event.preventDefault();
                                    let temp = cookies.owned_precons ? cookies.owned_precons : {};
                                    temp[deck.id] ? temp[deck.id]-- : temp[deck.id] = 0;
                                    setCookie("owned_precons", temp);
                                }}
                            > 
                                <div className='name'>{info[0]}</div>
                                <img src={`https://assets.moxfield.net/cards/card-${deck.commander.card.id}-normal.webp`} alt="Commander Card"/>
                                <div className='set'>{info[1].replace(")", "")}</div>
                                <div className='view'>Amount: {cookies.owned_precons !== undefined && cookies.owned_precons[deck.id] ? cookies.owned_precons[deck.id] : 0}</div>
                        </div>
                    }): <div className='loading flex'>Loading Decks...</div>
                }
            </div>
        </div>

        <style jsx>
            {`

                #selected-precon {
                    background: var(--dark-highlight);
                }

                .loading {
                    color: gray;
                }

                .decks-page {
                    width: 100%;
                    height: 100%;
                    overflow-y: scroll;
                }

                .title {
                    margin-top: 50px;
                    font-size: 64px;
                }

                .sub, .loading {
                    font-size: 25px;
                    color: gray;
                    font-family: Montserrat-Regular;
                }

                .set, .view {
                    font-family: Montserrat-Regular;
                    font-size: 12px;
                }

                .view {
                    color: gray;
                }

                .precon-deck > img {
                    height: 300px;
                    border-radius: 12px;
                }

                .precon-deck {
                    font-size: 14px;
                    gap: 8px;
                    background: var(--highlight);
                    height: 375px;
                    width: 250px;
                    padding: 20px;
                    border-radius: 12px;
                }

                .precon-list {
                    margin-top: 50px;
                    margin-bottom: 100px;

                    
                    width: 100%;
                    justify-items: start;
                    grid-gap: 50px 25px;

                    text-align: center;
                }

                #grid {
                    grid-template-columns: repeat(auto-fill,300px) 20%;
                    display: inline-grid;
                    width: 100%;
                }
            `}
      </style>
    </>
}

export default SelectPrecons;