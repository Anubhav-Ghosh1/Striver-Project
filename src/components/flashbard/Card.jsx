import React, { useEffect } from 'react';

function Card(card) {
    useEffect(()=>{
        console.log("Card",card);
    },[])
    return (
        <div>
            <div>
                {
                    card.card.question
                }
            </div>
            {

            }
        </div>
    );
}

export default Card;