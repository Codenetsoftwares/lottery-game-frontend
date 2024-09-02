import React, { useState } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min"; // Ensure Bootstrap JS is included
import SingleCard from "../Common/SingleCard";
import Pagination from "../Common/Pagination";
import CustomModal from "../Common/modal";
import DearLotteryCard from "../Common/DearLotteryCard";

const LotteryMarkets = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10; // Set this based on your data
  const [entries, setEntries] = useState(10); // Number of entries dropdown
  const [showModal, setShowModal] = useState(false);
  const [randomToken, setRandomToken] = useState("");
  const [lotteryCards, setLotteryCards] = useState([]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Fetch or filter data based on the new page number here
  };

  const handleEntriesChange = (event) => {
    setEntries(event.target.value);
    // Handle entries per page change here
  };

  const handleCreateMarketClick = () => {
    // Generate a random 12-character alphanumeric string
    const token = Math.random().toString(36).substring(2, 14).toUpperCase();
    setRandomToken(token);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleCreateMarket = () => {
    console.log("Market created with token:", randomToken);

    // Generate a list of Dear Lottery cards
    const newLotteryCards = Array.from({ length: 15 }, (_, index) => ({
      id: index + 1,
      lotteryName: `Dear Lottery ${index + 1}`,
      drawDate: "2024-09-15",
      prizeAmount: (Math.random() * 1000000).toFixed(2),
      serialNumber: `DL-${Math.random()
        .toString(36)
        .substring(2, 10)
        .toUpperCase()}`,
    }));

    // Update the state to display the cards
    setLotteryCards(newLotteryCards);
    setShowModal(false);
  };

  return (
    <SingleCard>
      <SingleCard>
        <div className="d-flex justify-content-between align-items-center mb-3">
          {/* Search Bar */}
          <div className="input-group" style={{ maxWidth: "300px" }}>
            <input type="text" className="form-control" placeholder="Search" />
          </div>

          {/* Create Market Button */}
          <div className="d-flex align-items-center">
            <button
              className="btn btn-light rounded-circle me-2"
              style={{
                backgroundColor: "#e6f7ff",
                border: "1px solid #4682B4",
              }}
              onClick={handleCreateMarketClick}
            >
              <i className="fas fa-plus" style={{ color: "#4682B4" }}></i>
            </button>
            <span style={{ color: "#4682B4", fontWeight: "bold" }}>
              Generate Token
            </span>
          </div>

          {/* Entries Dropdown */}
          <div className="input-group" style={{ maxWidth: "150px" }}>
            <select className="form-select" onChange={handleEntriesChange} value={entries}>
              <option value="10">10 entries</option>
              <option value="25">25 entries</option>
              <option value="50">50 entries</option>
            </select>
          </div>
        </div>
      </SingleCard>
      <SingleCard>
        <div className="container">
          <div className="row justify-content-center">
            {lotteryCards.map((card) => (
              <div className="col-md-4 mb-4" key={card.id}>
                <DearLotteryCard
                  lotteryName={card.lotteryName}
                  drawDate={card.drawDate}
                  prizeAmount={card.prizeAmount}
                  serialNumber={card.serialNumber}
                />
              </div>
            ))}
          </div>
        </div>
      </SingleCard>

      <div style={{ marginTop: "20px" }}>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
        <CustomModal
          showModal={showModal}
          onClose={handleModalClose}
          heading="Token Generated"
          bodyContent={`Your token is: ${randomToken}`}
          buttonLabel="Create Market"
          onButtonClick={handleCreateMarket}
        />
      </div>
    </SingleCard>
  );
};

export default LotteryMarkets;
