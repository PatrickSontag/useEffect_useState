import './Game.css';
import { useState, useEffect, useRef } from "react";
import axios from "axios";

function Game() {
  const [ card, setCard ] = useState(null);
  const [ deckNumber, setDeckNumber ] = useState(null);
  const [ deckCards, setDeckCards ] = useState(null);
  const [ cardIndex, setCardIndex ] = useState(0);

  const didMount = useRef(false);

  const baseCardsURL = "http://deckofcardsapi.com/api";

  useEffect(() => {
    async function getDeckNumber() {
      console.log("GET DECK NUMBER");
      let res = await axios.get(`${baseCardsURL}/deck/new/shuffle/?deck_count=1`)
      setDeckNumber(res.data.deck_id);
    }
    getDeckNumber();

  },[]);

  useEffect(() => {
    async function getDeckCards() {
      let res = await axios.get(`${baseCardsURL}/deck/${deckNumber}/draw/?count=52`)
      setDeckCards(res.data);
    }
    if (didMount.current) {
      console.log("DIDMOUNT", deckNumber);
      getDeckCards();
    } else { 
      console.log("didMount was false");
      didMount.current = true;
    }
    
  }, [deckNumber])

  // useEffect(() => {
  //   async function updateCard() {

  //     const cardRes = await axios.get(`${baseCardsURL}/deck/${this.deck}/draw/?count=1`)
  //     setCard(cardRes.data.cards[0].image);
  //  //    console.log("newCard", "card:", this.card, "cardImage", this.cardImage);
  //   }
  // }, []);

  const checkStatus = () => {
    console.log("deckCards status", deckCards);
    console.log("next card", card);
    console.log("next card image", card.image)
    console.log("card index", cardIndex);
  }

  const updateCard = () => {
    setCard(deckCards.cards[cardIndex]);
    setCardIndex(cardIndex + 1);
  }

  return (
    <div>
      {/* onSubmit={updateCard} */}
      <div>
        <button onClick={checkStatus}>Status</button>
        <button onClick={updateCard}>Update Card</button>
      </div>
      {card && <img src={card.image}/>}
      {cardIndex === 53 && alert("No more cards!")}
      
    </div>
  );
}

export default Game;