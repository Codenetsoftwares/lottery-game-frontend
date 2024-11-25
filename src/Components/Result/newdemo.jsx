import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetResultMarket, GetWiningResult } from "../../Utils/apiService";

const Result = () => {
  const { marketId } = useParams(); // Access the marketId from the route
  const navigate = useNavigate(); // For navigation
  const [markets, setMarkets] = useState([]);
  const [selectedMarket, setSelectedMarket] = useState(null);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const maxVisibleMarkets = 5;
  const visibleMarkets = markets.slice(scrollIndex, scrollIndex + maxVisibleMarkets);

  // Fetch markets
  useEffect(() => {
    const fetchMarkets = () => {
      GetResultMarket({ date: new Date().toISOString().slice(0, 10) }).then((response) => {
        if (response && response.success && response.data) {
          setMarkets(response.data);
          const defaultMarket = response.data.find(market => market.marketId === marketId) || response.data[0];
          setSelectedMarket(defaultMarket);
          if (!marketId) navigate(`/results/${defaultMarket.marketId}`); // Redirect to default market
        } else {
          setError("Failed to fetch markets or no data available.");
        }
      });
    };
    fetchMarkets();
  }, [marketId, navigate]);

  // Fetch results
  useEffect(() => {
    if (!selectedMarket) return;

    const fetchResults = () => {
      setError(null);
      GetWiningResult({ marketId: selectedMarket.marketId }).then((response) => {
        if (response && response.success) {
          setResults(response.data || []);
          if (!response.data || response.data.length === 0) {
            setError("No prize data available.");
          }
        } else {
          setError(response?.message);
        }
      });
    };

    fetchResults();
  }, [selectedMarket]);

  const handleScrollLeft = () => {
    if (scrollIndex > 0) setScrollIndex(scrollIndex - 1);
  };

  const handleScrollRight = () => {
    if (scrollIndex + maxVisibleMarkets < markets.length) setScrollIndex(scrollIndex + 1);
  };

  const handleMarketSelect = (market) => {
    setSelectedMarket(market);
    navigate(`/results/${market.marketId}`); // Update the URL with the selected marketId
  };

  return (
    <div>
      {/* Navigation Bar */}
      <div>
        <button onClick={handleScrollLeft} disabled={scrollIndex === 0}>
          &#8249;
        </button>
        <div>
          {visibleMarkets.map((market) => (
            <button
              key={market.marketId}
              onClick={() => handleMarketSelect(market)}
              className={market.marketId === selectedMarket?.marketId ? "btn-primary" : "btn-outline-light"}
            >
              {market.marketName}
            </button>
          ))}
        </div>
        <button onClick={handleScrollRight} disabled={scrollIndex + maxVisibleMarkets >= markets.length}>
          &#8250;
        </button>
      </div>

      {/* Results */}
      <div>
        <h2>
          Results for {selectedMarket?.marketName || "Selected Market"}
        </h2>
        {error && <p>{error}</p>}
        {results.length === 0 ? (
          <p>No prize declared yet.</p>
        ) : (
          <ul>
            {results.map((result) => (
              <li key={result.resultId}>{result.prizeCategory}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Result;
