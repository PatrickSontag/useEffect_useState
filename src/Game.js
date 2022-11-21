import './Game.css';
import Card from './Card';
import { useState, useEffect, useRef } from "react";
import axios from "axios";

function Game() {
  const [ card, setCard ] = useState(null);
  const [ deckNumber, setDeckNumber ] = useState(null);
  const [ deckCards, setDeckCards ] = useState(null);
  const [ cardIndex, setCardIndex ] = useState(0);
  const [ autoDraw, setAutoDraw ] = useState(false);
  const didMount = useRef(false);
  const drawId = useRef(null);


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

  useEffect( function runAutoDraw() {
    if ( autoDraw === true ) {
      drawId.current = setInterval(() => {
        console.log("interval");
        updateCard();
      }, 1000);

      return function cleanUpClearInterval() {
        console.log("clean up");
        clearInterval(drawId.current);
      };
  }
  }, [drawId, autoDraw, card]);


  const checkStatus = () => {
    console.log("deckCards status", deckCards);
    console.log("next card", card);
    console.log("next card image", card.image)
    console.log("card index", cardIndex);
    console.log("autoDraw", autoDraw);
  }

  const updateCard = () => {
    setCard(deckCards.cards[cardIndex]);
    setCardIndex(cardIndex + 1);
  }

  const updateAutoDraw = () => {
    setAutoDraw(!autoDraw);
  }

  const endGame = () => {
    // clearInterval(drawId.current);
    // drawId.current = null;
    autoDraw && setAutoDraw(!autoDraw);
    alert("No more cards!");
  }

  return (
    <div>
      <div>
        <button onClick={checkStatus}>Status</button>
        <button onClick={updateCard}>Update Card</button>
        <button onClick={updateAutoDraw}>Auto</button>
      </div>
      {card && <Card cardImage={card.image}/>}
      {cardIndex === 53 && endGame()}
      
    </div>
  );
}

export default Game;