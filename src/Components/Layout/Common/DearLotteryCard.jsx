import React from 'react';

const DearLotteryCard = ({ lotteryName, drawDate, prizeAmount, serialNumber }) => {
  return (
    <div
      className="dear-lottery-card"
      style={{
        width: '100%',
        maxWidth: '320px',
        height: 'auto',
        backgroundImage: 'url("https://media.istockphoto.com/id/493765932/photo/yellow-crumpled-paper.jpg?s=612x612&w=0&k=20&c=8cKuHSofW-iWQrWfT-3saVt9AK5l-UE3Rd0JjdqmDF8=")', // Replace with your actual background image path
        backgroundSize: 'cover',
        color: '#fff',
        fontFamily: "'Arial', sans-serif",
        border: '1px solid #000',
        borderRadius: '10px',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div
        style={{
          padding: '20px',
          textAlign: 'center',
        }}
      >
        <h5
          style={{
            fontSize: '18px',
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
          }}
        >
          {lotteryName}
        </h5>
        <p
          style={{
            fontSize: '14px',
            margin: '10px 0',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
          }}
        >
          Draw Date: {drawDate}
        </p>
        <p
          style={{
            fontSize: '24px', // Slightly larger font size for the prize amount
            fontWeight: 'bold',
            margin: '20px 0', // Increase margin to create more space
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
            color: '#FFD700', // Gold color for prize amount
          }}
        >
          ₹{prizeAmount}
        </p>
        <p
      
          style={{
            fontSize: '12px',
            margin: '10px 0',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
            fontWeight: 'bold',
          }}
        >
          Serial No: {serialNumber}
        </p>
      </div>
      {/* <div
        style={{
          position: 'absolute',
          bottom: '10px',
          left: '10px',
          right: '10px',
          fontSize: '10px',
          textAlign: 'center',
          color: '#fff',
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
          padding: '10px 0', // Added padding to ensure clear separation
          background: 'rgba(0, 0, 0, 0.5)', // Optional: Add a semi-transparent background to improve readability
          borderRadius: '5px',
        }}
      >
        <p style={{ marginBottom: '5px' }}>For terms and conditions, visit our website.</p>
        <p style={{ marginBottom: '0' }}>© Dear Lottery 2024</p>
      </div> */}
    </div>
  );
};

export default DearLotteryCard;
