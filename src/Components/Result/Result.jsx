import React, { useEffect, useState } from 'react';
import { GetWiningResult } from '../../Utils/apiService';

const Result = () => {
  const [prizes, setPrizes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrizes = async () => {
      try {
        const response = await GetWiningResult(); // Call the API to fetch prize data
        if (response.success) {
          setPrizes(response.data); // Assuming response.data contains the prize data array
        } else {
          setError(response.message); // Set error message if not successful
        }
      } catch (err) {
        setError('Error fetching prize data');
      } finally {
        setLoading(false);
      }
    };

    fetchPrizes();
  }, []);

  if (loading) {
    return (
      <div className="container-fluid d-flex justify-content-center">
        <div className="border border-3 rounded-3" style={{ padding: '20px', width: '80%', maxWidth: '600px' }}>
          <div className="text-center py-5">
            <h4>Loading results...</h4>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-fluid d-flex justify-content-center">
        <div className="border border-3 rounded-3" style={{ padding: '20px', width: '80%', maxWidth: '600px' }}>
          <div className="text-center py-5">
            <h4>{error}</h4>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="text-center my-4">
        <h2>Prize Results</h2>
      </div>
      {prizes.map((prize, index) => (
        <div key={index} className="border rounded-3 mb-4 p-3" style={{ backgroundColor: '#e6f7ff' }}>
          <h4>{prize.prizeCategory}</h4>
          <p><strong>Draw Time:</strong> {prize.announceTime}</p>
          <p><strong>Prize Amount:</strong>  ₹{prize.prizeAmount.toFixed(2)}</p>
          <h5>Winning Ticket Numbers:</h5>
          <ul className="list-group">
            {prize.ticketNumbers.map((ticketNumber) => (
              <li key={ticketNumber} className="list-group-item">
                {ticketNumber}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Result;
