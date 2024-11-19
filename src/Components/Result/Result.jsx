import React, { useEffect, useState } from 'react';
import { GetWiningResult } from '../../Utils/apiService';
import { useAppContext } from '../../contextApi/context';

const Result = () => {
  const [result, setResult] = useState(null); 
  const { showLoader, hideLoader } = useAppContext();
  const [error, setError] = useState(null);
  const [openAccordion, setOpenAccordion] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      showLoader();
      setLoading(true);
      try {
        const response = await GetWiningResult(); 
        if (response.success) {
          setResult(response.data); // Set the result object
        } else {
          setError(response.message); // Set error message if unsuccessful
        }
      } catch (err) {
        setError('Error fetching prize data');
      } finally {
        setLoading(false);
        hideLoader();
      }
    };

    fetchResults();
  }, []);

  if (loading) {
    return null;
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
      
      {result && result.length > 0 ? ( // Render only if data is available
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
                {new Date(result[0].date).toLocaleDateString()} - {result[0].announceTime}
              </button>
            </h2>
            <div
              id="collapseOne"
              className={`accordion-collapse collapse ${openAccordion ? 'show' : ''}`}
              aria-labelledby="headingOne"
              data-bs-parent="#resultAccordion"
            >
              <div className="accordion-body">
                {result.map((prize, index) => (
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
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Message displayed when no prize data is available
        <div className="container-fluid d-flex justify-content-center">
          <div className="border border-3 rounded-3" style={{ padding: '20px', width: '80%', maxWidth: '600px' }}>
            <div className="text-center py-5">
              <h4>No prize results available at the moment.</h4>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Result;
