import './Game.css';
import { useState, useEffect } from "react";

function Game() {
  const [ nextCard, setNextCard ] = useState(null);
  const [ deck, setDeck ] = useState(null);

  useEffect(() => {
    async function getDeck() {
      let res = await axios.get(`${baseCardsURL}/deck/new/shuffle/?deck_count=1`)
      setDeck(res.data.deck_id);
    }
    getDeck();
  },[]);

  useEffect(() => {
    async function updateCard() {

      const cardRes = await axios.get(`${baseCardsURL}/deck/${this.deck}/draw/?count=1`)
      setNextCard(cardRes.data.cards[0].image);
   //    console.log("newCard", "nextCard:", this.nextCard, "cardImage", this.cardImage);
    }
  }, []);

  return (
    <div className="Game">
      <button onClick={}>Card</button>
    </div>
  );
}

export default Game;