import {useEffect, useState} from 'react';
import './App.css';
import Card from './components/card'

const cardImage = [
  {"src": "/image/aus.png", matched: false},
  {"src": "/image/brit.png", matched: false},
  {"src": "/image/denmark.png", matched: false},
  {"src": "/image/england.png", matched: false},
  {"src": "/image/japan.png", matched: false},
  {"src": "/image/phl.png", matched: false},
  {"src": "/image/swiss.png", matched: false},
  {"src": "/image/vatican.png", matched: false}
]

function App() {
  //Constants for Cards and Turn counter
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [firstFlip, setFirstFlip] = useState(null)
  const [secondFlip, setSecondFlip] = useState(null)
  const [disabled, setDisabled] = useState(false)

  //Duplicate and shuffle cards
  const cardShuffle = () => {
    const shuffled = [...cardImage, ...cardImage]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({...card, id: Math.random()}))
    
    setFirstFlip(null)
    setSecondFlip(null)
    setCards(shuffled)
    setTurns(0)
  }

  const choiceFlip = (card) => {
    firstFlip ? setSecondFlip(card) : setFirstFlip(card)
  }

  useEffect(() => {
    if (firstFlip && secondFlip) {
      setDisabled(true)
      if (firstFlip.src === secondFlip.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === firstFlip.src) {
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        addTurn()
      } else {
        setTimeout(() => addTurn(), 1000)
      }
    }
  }, [firstFlip, secondFlip])

  const addTurn = () => {
    setFirstFlip(null)
    setSecondFlip(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  useEffect(() => {
    cardShuffle()
  }, [])

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={cardShuffle}>New Game</button>
      <div className="play-grid">
        {cards.map(card => (<Card 
        key= {card.id} 
        card= {card} 
        choice= {choiceFlip}
        flipped = {card === firstFlip || card === secondFlip || card.matched}
        disabled={disabled}/>))}
      </div>
      <h4>Number of Turns: {turns}</h4>
    </div>
  );
}

export default App;
