import React from 'react';

const DearLotteryCard = ({ lotteryName, drawDate, prizeAmount, serialNumber }) => 
   (
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
          ₹{prizeAmount}
        </p>
        <p
          style={{
            fontSize: '12px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
          }}
        >
          Serial No: {serialNumber}
        </p>
      </div>
     
    </div>
  );
;

export default DearLotteryCard;
