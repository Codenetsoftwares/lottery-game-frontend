import React, { useState } from 'react';
import './DearLotteryCard.css'; // Ensure you import the CSS file

const DearLotteryCard = ({ lotteryName, drawDate, drawTime, firstPrize, sem, price, ticketNumber }) => {
  const [flipped, setFlipped] = useState(false);

  const handleClick = () => {
    setFlipped(!flipped);
  };

  return (
    <div className="card-container" onClick={handleClick}>
      <div className={`card ${flipped ? 'flipped' : ''}`}>
        <div className="card-inner">
          <div className="card-front">
            <div
              style={{
                marginBottom: '15px',
                paddingBottom: '15px',
                borderBottom: '2px dashed #fff', // Dashed line similar to ticket tear-off
              }}
            >
              <h5
                style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                }}
              >
                {lotteryName}
              </h5>
              <p
                style={{
                  fontSize: '14px',
                  margin: '5px 0',
                }}
              >
                Draw Date: {drawDate} | Time: {drawTime}
              </p>
            </div>
            <div
              style={{
                marginBottom: '15px',
              }}
            >
              <p
                style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: '#FFD700', // Gold color for prize amount
                  margin: '5px 0',
                }}
              >
                First Prize: ₹{firstPrize}
              </p>
              <p
                style={{
                  fontSize: '14px',
                  margin: '5px 0',
                }}
              >
                SEM: {sem} | Price: ₹{price}
              </p>
              <p
                style={{
                  fontSize: '12px',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                }}
              >
                Generated Ticket Number: {ticketNumber}
              </p>
            </div>
          </div>
          <div className="card-back">
            {/* Content for the back of the card, if needed */}
            <p>Back of the ticket</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DearLotteryCard;
