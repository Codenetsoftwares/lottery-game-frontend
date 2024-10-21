import React, { useState } from 'react';
import './DearLotteryCard.css';

const DearLotteryCard = ({
  lotteryName,
  drawDate,
  drawTime,
  firstPrize,
  sem,
  price,
  ticketNumbers,
  onEdit,
  onDelete,
}) => {
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
        maxWidth: '520px',
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
        className="ticket-border"
        style={{
          border: '8px solid #FFD700', // Deep colored border
          borderRadius: '20px',
          padding: '20px',
          // backgroundColor: '#FF6347', // Background color
          width: '1000px', // Wider width
          height: '380px', // Shorter height
        }}
      >
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
          <div className="draw-info" style={{ animation: 'blink 1s infinite' }}>
            <p
              style={{
                fontSize: '14px',
                margin: '5px 0',
                color: 'white',
              }}
            >
              Draw Date: {drawDate}
            </p>
            <p
              style={{
                fontSize: '14px',
                margin: '5px 0',
                color: 'white',
              }}
            >
              Draw Time: {drawTime}
            </p>
          </div>
        </div>
        <div
          style={{
            marginBottom: '15px',
          }}
        >
          <p
            className="text-truncate"
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

          {/* <p style={{ fontSize: "12px", marginTop: "10px" }}>
          Click the ticket to see the next number!
        </p> */}
        </div>

        <div
          className="card-footer"
          style={{
            position: 'relative', // Make footer position relative for absolute positioning of icons
            height: '40px', // Ensure enough height for icons
            padding: '0 20px', // Padding to keep icons away from the edge
            // borderTop: "2px solid #fff",  // Top border
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* Edit Icon - Left aligned */}
          <div
            className="icon-wrapper"
            style={{
              position: 'absolute', // Absolute positioning
              left: '0', // Stick to left edge
              bottom: '10px', // Keep a small gap from bottom
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: '#80CBC4',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              transition: 'transform 0.2s',
            }}
            onClick={onEdit} // Trigger the edit function from props
          >
            <i
              className="fa fa-edit"
              style={{
                color: 'black',
                fontSize: '18px',
              }}
              title="Edit"
            />
          </div>

          {/* Delete Icon - Right aligned */}
          <div
            className="icon-wrapper"
            style={{
              position: 'absolute', // Absolute positioning
              right: '0', // Stick to right edge
              bottom: '10px', // Keep a small gap from bottom
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: '#80CBC4',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              transition: 'transform 0.2s',
            }}
            onClick={onDelete} // Trigger the delete function from props
          >
            <i
              className="fa fa-trash"
              style={{
                color: 'black',
                fontSize: '18px',
              }}
              title="Delete"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DearLotteryCard;
