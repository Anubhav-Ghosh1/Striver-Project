import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Flashcard() {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5001/flashcards')
      .then((response) => {
        setFlashcards(response.data);
        console.log(response.data);
      })
      .catch(error => console.error('Error fetching flashcards:', error));
  }, []);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % flashcards.length);
    setFlipped(false);
  };

  const handlePrev = () => {
    setCurrentIndex((currentIndex - 1 + flashcards.length) % flashcards.length);
    setFlipped(false);
  };

  return (
    <div className="flashcard-container relative bg-[#000814]">
      <div className="flex absolute top-4">
        <p className="text-4xl text-[#dbddea]">Flash Card</p>
      </div>
      <div className={`card ${flipped ? 'flipped' : ''}`} onClick={handleFlip}>
        <div className="front">
          <p>{flashcards.length > 0 ? flashcards[currentIndex].question : "Loading..."}</p>
        </div>
        <div className="back">
          <p>{flashcards.length > 0 ? flashcards[currentIndex].answer : "Loading..."}</p>
        </div>
      </div>
      <div className="navigation">
        <button onClick={handlePrev} className="nav-button">Previous Question</button>
        <button onClick={handleNext} className="nav-button">Next Question</button>
      </div>
    </div>
  );
}

export default Flashcard;