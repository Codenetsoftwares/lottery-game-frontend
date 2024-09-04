import React, { useState } from "react";
import SingleCard from "../Common/SingleCard";
import CustomModal from "../Common/CustomModal";
import Pagination from "../Common/Pagination"; // Assuming you have a Pagination component

const LotteryMarkets = () => {
  const [randomToken, setRandomToken] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sem, setSem] = useState(5);
  const [lotteryId, setLotteryId] = useState("");
  const [price] = useState(6);

  const handleGenerateTicketNumber = () => {
    if (!randomToken) {
      const prefix = Math.floor(Math.random() * (99 - 38 + 1)) + 38;
      const alphabet = "ABCDEGHKL";
      const letter = alphabet[Math.floor(Math.random() * alphabet.length)];
      const number = Math.floor(Math.random() * 100000).toString().padStart(5, "0");
      const token = `${prefix}${letter}${number}`;
      setRandomToken(token);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateTicket = () => {
    // Implement ticket creation logic here
    console.log("Creating ticket with the following details:");
    console.log("Ticket Number:", randomToken);
    console.log("Lottery ID:", lotteryId);
    console.log("SEM:", sem);
    console.log("Price:", price);

    // Reset the state after creating the ticket
    handleCloseModal();
    setRandomToken("");
  };

  return (
    <SingleCard>
      <SingleCard>
        <div className="d-flex justify-content-between align-items-center mb-3">
          {/* Generate Ticket Number */}
          <div className="d-flex align-items-center">
            {randomToken ? (
              <span
                style={{
                  cursor: "pointer",
                  color: "#4682B4",
                  fontWeight: "bold",
                  position: "relative",
                  animation: "fadeIn 1s ease-in-out", // Animation for attention
                }}
                onClick={handleOpenModal}
              >
                Generated Ticket Number: {randomToken}
                <div
                  style={{
                    position: "absolute",
                    top: "20px",
                    left: "0",
                    backgroundColor: "#f8d7da",
                    color: "#721c24",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    boxShadow: "0px 2px 8px rgba(0,0,0,0.15)",
                    animation: "pulse 2s infinite", // Pulse animation
                  }}
                >
                  Click here to create a ticket with this number
                </div>
              </span>
            ) : (
              <span
                style={{
                  cursor: "pointer",
                  color: "#4682B4",
                  fontWeight: "bold",
                }}
                onClick={handleGenerateTicketNumber}
              >
                Generate Ticket Number to Create Lottery Ticket
              </span>
            )}
          </div>
        </div>
      </SingleCard>

      {/* View Tickets By SEM Section */}
      <SingleCard>
        <h4>View Tickets By SEM</h4>
        {/* Add your ticket list and pagination logic here */}
        <Pagination />
      </SingleCard>

      {/* Custom Modal for creating a ticket */}
      <CustomModal
        showModal={isModalOpen}
        onClose={handleCloseModal}
        heading="Create Lottery Ticket"
        bodyContent={
          <form>
            <div className="mb-3">
              <label htmlFor="lotteryId" className="form-label">
                Lottery ID
              </label>
              <input
                type="text"
                className="form-control"
                id="lotteryId"
                value={lotteryId}
                onChange={(e) => setLotteryId(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="semSelect" className="form-label">
                SEM
              </label>
              <select
                id="semSelect"
                className="form-select"
                value={sem}
                onChange={(e) => setSem(e.target.value)}
              >
                <option value="5">5 SEM</option>
                <option value="10">10 SEM</option>
                <option value="20">20 SEM</option>
                <option value="50">50 SEM</option>
                <option value="100">100 SEM</option>
                <option value="200">200 SEM</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Price (Rupees)
              </label>
              <input
                type="number"
                className="form-control"
                id="price"
                value={price}
                readOnly
              />
            </div>
            <div className="mb-3">
              <label htmlFor="drawDate" className="form-label">
                Draw Date
              </label>
              <input
                type="date"
                className="form-control"
                id="drawDate"
              />
            </div>
          </form>
        }
        buttonLabel="Create Ticket"
        onButtonClick={handleCreateTicket}
      />
    </SingleCard>
  );
};

export default LotteryMarkets;
