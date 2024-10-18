import React from 'react';

const CreateMarket = () => {
  return (
    <div className="container-fluid" style={{  backgroundColor: '#f0f4f8' }}>
      {/* Custom Header outside the main container */}
      <div className="text-center" style={{ backgroundColor: '#e6f7ff', padding: '10px 0', borderBottom: '2px solid #4682B4', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px', width: '100%' }}>
        <h2 className="mb-1" style={{ color: '#4682B4', fontWeight: 'bold', letterSpacing: '1px' }}>
          🎟️ Lottery Market
        </h2>
        {/* <h5 className="text-muted" style={{ marginBottom: '0' }}>Coming Soon</h5> */}
      </div>

      {/* Main Content Container */}
      <div className="d-flex align-items-center justify-content-center" style={{ height: 'calc(75vh - 60px)' }}>
        <div className="shadow-lg rounded-3" style={{ padding: '30px', width: '90%', maxWidth: '600px', backgroundColor: '#ffffff' }}>
          {/* Body Content */}
          <div className="text-center py-4">
            <p className="lead" style={{ color: '#333' }}>
              This page of the lottery market will be developed in the near future. Stay tuned for updates!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateMarket;
