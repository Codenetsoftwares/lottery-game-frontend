import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const generateRandomTickets = (count) => {
  return Array.from({ length: count }, () =>
    Math.floor(100000 + Math.random() * 900000).toString()
  );
};

const DemoResult = () => {
  const markets = [
    { id: 1, name: "Market A", drawTime: "12:00 PM" },
    { id: 2, name: "Market B", drawTime: "03:00 PM" },
    { id: 3, name: "Market C", drawTime: "06:00 PM" },
    { id: 4, name: "Market D", drawTime: "09:00 PM" },
    { id: 5, name: "Market E", drawTime: "11:00 PM" },
    { id: 6, name: "Market F", drawTime: "01:00 AM" },
  ];

  const [selectedMarket, setSelectedMarket] = useState(markets[0]);
  const [scrollIndex, setScrollIndex] = useState(0);

  const prizeDistribution = {
    1: { amount: "10000", complementaryAmount: "5000", ticketNumbers: ["123456"] },
    2: { amount: "5000", ticketNumbers: generateRandomTickets(10) },
    3: { amount: "2000", ticketNumbers: generateRandomTickets(10) },
    4: { amount: "1000", ticketNumbers: generateRandomTickets(10) },
    5: { amount: "500", ticketNumbers: generateRandomTickets(50) },
  };

  const maxVisibleMarkets = 5;
  const visibleMarkets = markets.slice(scrollIndex, scrollIndex + maxVisibleMarkets);

  const handleScrollLeft = () => {
    if (scrollIndex > 0) setScrollIndex(scrollIndex - 1);
  };

  const handleScrollRight = () => {
    if (scrollIndex + maxVisibleMarkets < markets.length) setScrollIndex(scrollIndex + 1);
  };

  const handleOldResults = () => {
    alert("This portion is under development.");
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", margin: "20px" }}>
      {/* Top Navigation Bar */}
      <div
        className="d-flex align-items-center"
        style={{
          backgroundColor: "#4682B4",
          padding: "10px",
          borderRadius: "8px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Left Arrow */}
        <button
          className="btn btn-light"
          style={{
            padding: "5px 10px",
            fontSize: "18px",
            borderRadius: "50%",
            marginRight: "10px",
          }}
          onClick={handleScrollLeft}
          disabled={scrollIndex === 0}
        >
          &#8249;
        </button>

        {/* Market Buttons */}
        <div
          className="d-flex flex-nowrap justify-content-center"
          style={{
            overflow: "hidden",
            gap: "10px",
          }}
        >
          {visibleMarkets.map((market) => (
            <button
              key={market.id}
              className={`btn ${
                market.id === selectedMarket.id ? "btn-primary" : "btn-outline-light"
              }`}
              onClick={() => setSelectedMarket(market)}
              style={{
                fontSize: "16px",
                borderRadius: "4px",
                whiteSpace: "nowrap",
              }}
            >
              {market.name}{" "}
              <span style={{ fontSize: "12px", color: "#d3f1ff" }}>
                ({market.drawTime})
              </span>
            </button>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          className="btn btn-light"
          style={{
            padding: "5px 10px",
            fontSize: "18px",
            borderRadius: "50%",
            marginLeft: "10px",
          }}
          onClick={handleScrollRight}
          disabled={scrollIndex + maxVisibleMarkets >= markets.length}
        >
          &#8250;
        </button>

        {/* Old Results Button */}
        <button
          className="btn btn-warning"
          onClick={handleOldResults}
          style={{
            marginLeft: "auto",
            borderRadius: "20px",
            padding: "5px 15px",
            fontWeight: "bold",
            fontSize: "14px",
          }}
        >
          Old Results
        </button>
      </div>

      {/* Market Result Display */}
      <div className="mt-4">
        <h2 className="text-center" style={{ color: "#3b6e91" }}>
          Results for <span style={{ color: "#4682B4" }}>{selectedMarket.name}</span>
        </h2>
        <p className="text-center" style={{ fontSize: "18px", color: "#555" }}>
          Draw Time: <strong>{selectedMarket.drawTime}</strong>
        </p>

        {/* Accordion for Prize Distribution */}
        <div className="accordion mt-4" id="prizeAccordion">
          {Object.entries(prizeDistribution).map(([level, details]) => (
            <div className="accordion-item" key={level}>
              <h2 className="accordion-header" id={`heading${level}`}>
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse${level}`}
                  aria-expanded="false"
                  aria-controls={`collapse${level}`}
                >
                  Prize Level {level} - Amount: {details.amount}
                  {details.complementaryAmount && (
                    <span className="ms-2 text-muted">
                      (Complementary: {details.complementaryAmount})
                    </span>
                  )}
                </button>
              </h2>
              <div
                id={`collapse${level}`}
                className="accordion-collapse collapse"
                aria-labelledby={`heading${level}`}
                data-bs-parent="#prizeAccordion"
              >
                <div className="accordion-body">
                  <strong>Winning Ticket Numbers:</strong>
                  <ul>
                    {details.ticketNumbers.map((ticket, index) => (
                      <li key={index}>{ticket}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DemoResult;
