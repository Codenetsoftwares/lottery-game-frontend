import React, { useState } from 'react';
import './DearLotteryCard.css'; // Import CSS for animations

const DearLotteryCard = ({
  lotteryName,
  drawDate,
  drawTime,
  firstPrize,
  sem,
  price,
  ticketNumbers,
}) => {
  const [currentTicket, setCurrentTicket] = useState(0);

  // Function to show the next ticket number
  const showNextTicket = () => {
    setCurrentTicket((prev) => (prev + 1) % ticketNumbers.length);
  };

  // Calculate total price
  const totalPrice = price * sem;

  return (
    <div className="dear-lottery-card" style={{ position: 'relative' }}>
      <div
        className="ticket-border"
        style={{
          border: '8px solid #FFD700', // Deep colored border
          borderRadius: '20px',
          padding: '20px',
          backgroundColor: '#FF6347', // Background color
          width: '400px', // Wider width
          height: '180px', // Shorter height
        }}
      >
        {/* Ticket Header */}
        <div className="ticket-header">
          <h5 className="lottery-name">{lotteryName}</h5>
          <div className="ticket-number-container" onClick={showNextTicket}>
            <div className="flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <p>Click for Ticket No</p>
                </div>
                <div className="flip-card-back">
                  <p>Ticket No: {ticketNumbers[currentTicket]}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Draw Date and Time */}
        <div className="draw-info" style={{ animation: 'blink 1s infinite' }}>
          <p>Draw Date: {drawDate}</p>
          <p>Draw Time: {drawTime}</p>
        </div>

        {/* Prize Information */}
        <div className="prize-info">
          <div className="first-prize">
            <h2 className="first-prize-text">
              1st PRIZE: ₹{firstPrize}
            </h2>
            <img src="path/to/animation.gif" alt="Celebration" />
          </div>
          <div className="price-info">
            <p>
              Ticket Price: ₹{price} x {sem} = ₹{totalPrice}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DearLotteryCard;

// css for this file
/* Overall Card Styling */
.dear-lottery-card {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px auto;
  font-family: 'Arial', sans-serif;
}

/* Ticket Border */
.ticket-border {
  position: relative;
  background-color: #FF6347; /* Background color of ticket */
}

/* Header Styling */
.ticket-header {
  margin-bottom: 15px;
  text-align: center;
}

/* Lottery Name */
.lottery-name {
  font-size: 20px;
  font-weight: bold;
  text-transform: uppercase;
  color: white;
}

/* Draw Info */
.draw-info {
  font-size: 12px;
  color: white;
}

/* Blinking Effect */
@keyframes blink {
  50% {
    opacity: 0.5;
  }
}

/* Prize Information */
.prize-info {
  text-align: center;
}

/* First Prize */
.first-prize {
  font-weight: bold;
  color: #FFD700; /* Gold */
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Price Info */
.price-info {
  color: white;
}

/* Flipping Card Styles */
.flip-card {
  background-color: transparent;
  perspective: 1000px;
  cursor: pointer;
  display: inline-block;
}

.flip-card-inner {
  position: relative;
  width: 150px;
  height: 60px;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}

.flip-card-front {
  background-color: #FF6347;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}

.flip-card-back {
  background-color: #333;
  color: white;
  transform: rotateY(180deg);
  display: flex;
  justify-content: center;
  align-items: center;
}

