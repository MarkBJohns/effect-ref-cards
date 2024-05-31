import React, { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";

const Deck = () => {
    const [deckID, setDeckID] = useState("");
    const [deck, setDeck] = useState([]);
    
    useEffect(() => {
        async function createDeck() {
            const result = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
            setDeckID(result.data.deck_id);
        }
        createDeck();
    }, []);
    
    const drawCard = async () => {
        if (deck.length === 52) {
            alert("Error: No cards remaining");
            return
        }
        
        const result = await axios.get(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`);
        console.dir(result.data.cards[0]);
        const { code, image } = result.data.cards[0];
        setDeck(previousCards => [...previousCards, { key: code, src: image }]);
    }
    
    const shuffle = async () => {
        await axios.get(`https://deckofcardsapi.com/api/deck/${deckID}/shuffle`);
        setDeck([]);
    }
    
    return (
        <React.Fragment>
            <div>
                <button onClick={drawCard}>{ deck.length === 52 ? 'All Cards Drawn' : 'Draw Card' }</button>
                {deck.length !== 0 && <button onClick={shuffle}>Shuffle</button>}
            </div>
            <div className="Deck-container">
                {deck.map(card => <Card key={card.key} id={Card.code} src={card.src} />)}
            </div>
        </React.Fragment>
    )
}

export default Deck;