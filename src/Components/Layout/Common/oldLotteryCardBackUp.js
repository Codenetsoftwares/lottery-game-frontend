import React, { useState } from 'react';
import './DearLotteryCard.css'; 

const DearLotteryCard = ({
  lotteryName,
  drawDate,
  drawTime,
  firstPrize,
  sem,
  price,
  ticketNumbers ,
}) =>{
  const [currentTicket, setCurrentTicket] = useState(0);

  // Function to show the next ticket number
  const showNextTicket = () => {
    setCurrentTicket((prev) => (prev + 1) % ticketNumbers.length);
  };


return (

  
  <div
    className="dear-lottery-card"
    style={{
      width: '100%',
      maxWidth: '320px',
      height: 'auto',
      backgroundColor: '#FF6347', // Main background color of the ticket
      color: '#fff',
      fontFamily: "'Arial', sans-serif",
      border: '2px solid #E5E5E5',
      borderRadius: '20px', // Slightly rounded corners
      position: 'relative',
      padding: '20px',
      textAlign: 'center',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    }}
  >
    {/* Half-curved corners */}
    <div
      style={{
        position: 'absolute',
        top: '-10px',
        left: '-10px',
        width: '20px',
        height: '20px',
        backgroundColor: '#FFFFFF',
        borderTopRightRadius: '20px',
        zIndex: '1',
      }}
    />
    <div
      style={{
        position: 'absolute',
        top: '-10px',
        right: '-10px',
        width: '20px',
        height: '20px',
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: '20px',
        zIndex: '1',
      }}
    />
    <div
      style={{
        position: 'absolute',
        bottom: '-10px',
        left: '-10px',
        width: '20px',
        height: '20px',
        backgroundColor: '#FFFFFF',
        borderBottomRightRadius: '20px',
        zIndex: '1',
      }}
    />
    <div
      style={{
        position: 'absolute',
        bottom: '-10px',
        right: '-10px',
        width: '20px',
        height: '20px',
        backgroundColor: '#FFFFFF',
        borderBottomLeftRadius: '20px',
        zIndex: '1',
      }}
    />

    {/* Left-side curves */}
    <div
      style={{
        position: 'absolute',
        top: '10%',
        left: '-10px',
        width: '20px',
        height: '40px',
        backgroundColor: '#FFFFFF',
        borderTopRightRadius: '50%',
        borderBottomRightRadius: '50%',
        zIndex: '1',
      }}
    />
    <div
      style={{
        position: 'absolute',
        top: '45%',
        left: '-10px',
        width: '20px',
        height: '40px',
        backgroundColor: '#FFFFFF',
        borderTopRightRadius: '50%',
        borderBottomRightRadius: '50%',
        zIndex: '1',
      }}
    />
    <div
      style={{
        position: 'absolute',
        bottom: '10%',
        left: '-10px',
        width: '20px',
        height: '40px',
        backgroundColor: '#FFFFFF',
        borderTopRightRadius: '50%',
        borderBottomRightRadius: '50%',
        zIndex: '1',
      }}
    />

    {/* Right-side curves */}
    <div
      style={{
        position: 'absolute',
        top: '10%',
        right: '-10px',
        width: '20px',
        height: '40px',
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: '50%',
        borderBottomLeftRadius: '50%',
        zIndex: '1',
      }}
    />
    <div
      style={{
        position: 'absolute',
        top: '45%',
        right: '-10px',
        width: '20px',
        height: '40px',
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: '50%',
        borderBottomLeftRadius: '50%',
        zIndex: '1',
      }}
    />
    <div
      style={{
        position: 'absolute',
        bottom: '10%',
        right: '-10px',
        width: '20px',
        height: '40px',
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: '50%',
        borderBottomLeftRadius: '50%',
        zIndex: '1',
      }}
    />

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
        Draw Date: {drawDate}
      </p>
      <p
        style={{
          fontSize: '14px',
          margin: '5px 0',
        }}
      >
        Draw Time: {drawTime}
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
      1st PRIZE: ₹{firstPrize}
      </p>
      <p
        style={{
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#fff',
          margin: '5px 0',
        }}
      >
        Sem: {sem}
      </p>
      <p
        style={{
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#fff',
          margin: '5px 0',
        }}
      >
        Price: ₹{price}
      </p>
      <p
        style={{
          fontSize: '12px',
          fontWeight: 'bold',
          textTransform: 'uppercase',
        }}
      >
        Ticket No:
      </p>

      <ul style={{ listStyleType: 'none', padding: 0 }}>
          {ticketNumbers.map((ticketNumber, index) => (
            <li key={index} style={{ fontSize: '12px', fontWeight: 'bold' }}>
              {ticketNumber}
            </li>
          ))}
        </ul>


        {/* Flipping Ticket Number */}
        <div className="ticket-number-container" onClick={showNextTicket}>
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front ">
                <p
                // className='text-truncate'
                  style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: '#fff',
                    margin: '5px 0',
                  }}
                >
                  Click to reveal Ticket No
                </p>
              </div>
              <div className="flip-card-back ">
                <p
                  // className='text-truncate'
                  style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: '#FFD700', // Gold color for ticket number
                    margin: '5px 0',
                  }}
                >
                  Ticket No: {ticketNumbers[currentTicket]}
                </p>
              </div>
            </div>
          </div>
        </div>
        <p style={{ fontSize: '12px', marginTop: '10px' }}>
          Click the ticket to see the next number!
        </p>
      </div>
    </div>
  // </div>
);
}

export default DearLotteryCard;


// css of above file 
/* Flipping card styles */
.flip-card {
    background-color: transparent;
    perspective: 1000px;
    cursor: pointer;
    display: inline-block;
  }
  
  .flip-card-inner {
    position: relative;
    width: 200px;
    height: 80px;
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
    -webkit-backface-visibility: hidden; /* Safari */
    backface-visibility: hidden;
  }
  
  .flip-card-front {
    background-color: #ff6347; /* Same background as ticket */
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
  