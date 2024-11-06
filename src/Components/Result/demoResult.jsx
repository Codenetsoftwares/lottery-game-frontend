import React, { useEffect, useState } from 'react';
import { GetWiningResult } from '../../Utils/apiService'; // Ensure the correct import for the API function

const Result = () => {
  const [result, setResult] = useState(null); // Changed to hold single result object
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openAccordion, setOpenAccordion] = useState(false); // State to manage accordion open/close

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await GetWiningResult(); 
        if (response.success) {
          setResult(response.data); // Set the entire result object
        } else {
          setError(response.message); // Set error message if not successful
        }
      } catch (err) {
        setError('Error fetching prize data');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
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
      
      <div className="accordion mb-4" id="resultAccordion">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button
              className="accordion-button"
              type="button"
              onClick={() => setOpenAccordion(!openAccordion)}
              aria-expanded={openAccordion}
              aria-controls="collapseOne"
            >
              {new Date(result.date).toLocaleDateString()} - {result.announceTime}
            </button>
          </h2>
          <div
            id="collapseOne"
            className={`accordion-collapse collapse ${openAccordion ? 'show' : ''}`}
            aria-labelledby="headingOne"
            data-bs-parent="#resultAccordion"
          >
            <div className="accordion-body">
              {/* {result.data.map((prize, index) => (
                <div key={index} className="border rounded-3 mb-3 p-3" style={{ backgroundColor: '#e6f7ff' }}>
                  <h4>{prize.prizeCategory}</h4>
                  <p><strong>Prize Amount:</strong> ₹{prize.prizeAmount.toFixed(2)}</p>
                  <h5>Winning Ticket Numbers:</h5>
                  <ul className="list-group">
                    {prize.ticketNumbers.map((ticketNumber) => (
                      <li key={ticketNumber} className="list-group-item">
                        {ticketNumber}
                      </li>
                    ))}
                  </ul>
                </div>
              ))} */}
              {result.data && result.data.length > 0 ? (
  result.data.map((prize, index) => (
    <div key={index} className="border rounded-3 mb-3 p-3" style={{ backgroundColor: '#e6f7ff' }}>
      <h4>{prize.prizeCategory}</h4>
      <p><strong>Prize Amount:</strong> ₹{prize.prizeAmount.toFixed(2)}</p>
      <h5>Winning Ticket Numbers:</h5>
      <ul className="list-group">
        {prize.ticketNumbers.map((ticketNumber) => (
          <li key={ticketNumber} className="list-group-item">
            {ticketNumber}
          </li>
        ))}
      </ul>
    </div>
  ))
) : (
  <p>No prize data available.</p> // Display a message when there's no prize data
)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
