import '../App.css';

function Card({card, choice, flipped, disabled}) {

    const clickFlip = () => {
        if (!disabled) {
            choice(card)
        }
    }

    return(
        <div className="cards">
            <div className={flipped ? "flipped" : ""}>
              <img className="front" src={card.src} alt="Card-Front"/>
              <img className="back" src="/image/card.jpg" alt="Card-Back" onClick={clickFlip}/>
            </div>
        </div>
    )
}

export default Card;