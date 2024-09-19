import React, { useState } from 'react';
import CustomModal from './CustomModal'; // Import your CustomModal component
import { getSelectSemInModal } from './apiService'; // Import your API function

// Define the initial state function
export const getLotteryMarketsInitialState = (body = {}) => {
  return {
    currentPage: body.currentPage ?? 1,
    totalPages: body.totalPages ?? 10,
    entries: body.entries ?? 10,
    randomToken: body.randomToken ?? "",
    lotteryCards: body.lotteryCards ?? [],
    lotteryId: body.lotteryId ?? "",
    isModalOpen: body.isModalOpen ?? false,
    inputs: body.inputs ?? {
      name: "",
      DateTime: "",
      firstPrize: "",
      sem: "",
      tickets: [],
      price: "",
    },
    showModal: body.showModal ?? false,
    showTicketModal: body.showTicketModal ?? false
  };
};

const YourComponent = () => {
  const [state, setState] = useState(getLotteryMarketsInitialState());
  const [selectedTicketCount, setSelectedTicketCount] = useState(5); // Default to 5

  //GET api to generate the ticket number as by sem values from dropdown
  async function handleGenerateTicketNumber(selectedValue) {
    try {
      const response = await getSelectSemInModal(selectedValue);
      console.log("===>> get api response", response);

      if (response && response.success) {
        setState((prev) => ({
          ...prev,
          inputs: { ...prev.inputs, tickets: response.data.tickets },
          showTicketModal: true, // Show the modal when tickets are fetched
        }));
      } else {
        console.error("Failed to fetch ticket numbers");
      }
    } catch (error) {
      console.error("Error fetching ticket numbers:", error);
    }
  }

  // Define your modal open/close handlers
  const handleOpenModal = () => {
    setState((prev) => ({ ...prev, showModal: true }));
  };

  const handleCloseModal = () => {
    setState((prev) => ({ ...prev, showModal: false }));
  };

  const handleCreateTicket = () => {
    // Implement your ticket creation logic here
    console.log("Creating tickets...");
  };

  return (
    <div className="flex-grow-1 ml-4 mr-5">
      {state.randomToken ? (
        <span
          style={{
            cursor: "pointer",
            color: "#4682B4",
            fontWeight: "bold",
            position: "relative",
            animation: "fadeIn 1s ease-in-out", // Fade-in animation
          }}
          onClick={handleOpenModal}
        >
          Generated Ticket Number
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
        <div>
          <span
            style={{
              cursor: "pointer",
              color: "#4682B4",
              fontWeight: "bold",
            }}
            onClick={() => handleGenerateTicketNumber(selectedTicketCount)}
          >
            Generate Ticket Number To Create Lottery Ticket By SEM
          </span>
          <div style={{ display: "inline-block", marginLeft: "10px" }}>
            <select
              style={{
                padding: "5px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                backgroundColor: "#f1f1f1",
                cursor: "pointer",
              }}
              onChange={(e) => {
                const selectedValue = e.target.value;
                console.log("Selected Value:", selectedValue);
                handleGenerateTicketNumber(selectedValue);
              }}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="200">200</option>
            </select>
          </div>
        </div>
      )}

      <CustomModal
        showModal={state.showModal}
        onClose={handleCloseModal}
        heading="Generated Lottery Tickets"
        inputs={state.inputs.tickets.map((ticket) => ({ label: ticket }))}
        textOnly={true} // Displays ticket numbers only
        buttonLabel="Create Tickets"
        onButtonClick={handleCreateTicket}
        cancelButtonLabel="Cancel"
      />
    </div>
  );
};

export default YourComponent;
