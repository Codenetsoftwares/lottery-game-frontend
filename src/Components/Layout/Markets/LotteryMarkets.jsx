import React, { useEffect, useState } from "react";
// import "bootstrap/dist/js/bootstrap.bundle.min"; // Ensure Bootstrap JS is included
import SingleCard from "../Common/SingleCard";
import Pagination from "../Common/Pagination";
import DearLotteryCard from "../Common/DearLotteryCard";
import { useAppContext } from "../../../contextApi/context";
import CustomModal from "../Common/modal";
import {
  generateLotteryTicket,
  generateTicketNumber,
} from "../../../Utils/apiService";
import strings from "../../../Utils/constant/stringConstant";
import { getLotteryMarketsInitialState } from "../../../Utils/getInitialState";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatISO } from "date-fns";

const LotteryMarkets = () => {
  const { dispatch } = useAppContext();

  const [state, setState] = useState(getLotteryMarketsInitialState);


    // Load tickets from localStorage when the component mounts
    useEffect(() => {
      const savedTickets = localStorage.getItem("lotteryCards");
      if (savedTickets) {
        setState((prev) => ({
          ...prev,
          lotteryCards: JSON.parse(savedTickets),
        }));
      }
    }, []);

  const handlePageChange = (pageNumber) => {
    setState((prev) => ({ ...prev, currentPage: pageNumber }));
    // Fetch or filter data based on the new page number here
  };

  const handleEntriesChange = (event) => {
    setState((prev) => ({ ...prev, entries: event.target.value }));
    // Handle entries per page change here
  };

  const handleOpenModal = () =>
    setState((prev) => ({ ...prev, showModal: true }));
  const handleCloseModal = () => {
    // Clear input fields when closing the modal
    setState((prev) => ({
      ...prev,
      showModal: false,
      inputs: {
        name: "",
        DateTime: "",
        firstPrize: "",
        sem: "",
        price: "",
      },
    }));
  };

 
  const handleDateChange = (date) => {
    const formattedDate = formatISO(date); // Format date as ISO string
    handleInputChange("DateTime", formattedDate);
  };
  const handleSemChange = (event) => {
    const newSem = event.target.value;
    setState((prev) => ({ ...prev, sem: newSem }));
    // Handle any additional logic related to SEM change if needed
  };
  async function handleGenerateTicketNumber() {
    if (!state.randomToken) {
      const response = await generateTicketNumber({});
      if (response) {
        const ticketNumber = response?.data?.ticketNumber;
        console.log("Generated ticket number:", ticketNumber);

        dispatch({
          type: strings.GENERATE_TICKET_NUMBER,
          payload: ticketNumber,
        });

        setState((prev) => ({ ...prev, randomToken: ticketNumber }));
      } else {
        console.error("Failed to generate ticket number");
      }
    }
  }

  async function handleCreateTicket() {
    if (state.inputs.sem > 0) {
      const response = await generateLotteryTicket({
        name: state.inputs.name,
        date: state.inputs.DateTime,
        firstPrize: state.inputs.firstPrize,
        sem: state.inputs.sem,
        price: state.inputs.price,
      });

      if (response) {
        const createdTicket = {
          lotteryName: state.inputs.name,
          drawDate: state.inputs.DateTime,
          drawTime: "", // Add if needed
          firstPrize: state.inputs.firstPrize,
          sem: state.inputs.sem,
          price: state.inputs.price,
          ticketNumber: state.randomToken,
        };

        const updatedLotteryCards = [...state.lotteryCards, createdTicket];
        setState((prev) => ({
          ...prev,
          lotteryCards: updatedLotteryCards,
        }));

        localStorage.setItem("lotteryCards", JSON.stringify(updatedLotteryCards));

        handleCloseModal();
        setState((prev) => ({ ...prev, randomToken: "" }));
      } else {
        console.error("Failed to create ticket");
      }
    }
  }

  const handleInputChange = (field, value) => {
    setState((prev) => ({
      ...prev,
      inputs: {
        ...prev.inputs,
        [field]: value,
      },
    }));
  };

  return (
    <SingleCard>
      <SingleCard>
        <div className="d-flex justify-content-between align-items-center mb-3">
          {/* SEM Dropdown */}
          <div className="d-flex align-items-center">
            <label
              htmlFor="semSelect"
              className="me-2"
              style={{ color: "#4682B4", fontWeight: "bold" }}
            >
              View Tickets By SEM
            </label>
            <select
              id="semSelect"
              className="form-select"
              style={{ maxWidth: "150px" }}
              onChange={handleSemChange}
              value={state.sem}
            >
              <option value="5">5 SEM</option>
              <option value="10">10 SEM</option>
              <option value="20">20 SEM</option>
              <option value="50">50 SEM</option>
              <option value="100">100 SEM</option>
              <option value="200">200 SEM</option>
            </select>
          </div>

          {/* Generate Ticket Number */}
          <div className="d-flex align-items-center">
            {state.randomToken ? (
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
                Generated Ticket Number: {state.randomToken}
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
                Generate Ticket Number To Create Lottery Ticket
              </span>
            )}
          </div>
        </div>
      </SingleCard>

      <SingleCard>
        <div className="container">
          <div className="row justify-content-center">
            {state.lotteryCards.map((card) => (
              <div className="col-md-4 mb-4" key={card.id}>
                <DearLotteryCard
                  lotteryName={card.lotteryName}
                  drawDate={card.drawDate}
                  drawTime={card.drawTime}
                  firstPrize={card.firstPrize}
                  sem={card.sem}
                  price={card.price}
                  ticketNumber={card.ticketNumber}
                />
              </div>
            ))}
          </div>
        </div>
      </SingleCard>

      <div style={{ marginTop: "20px" }}>
        <Pagination
          totalPages={state.totalPages}
          currentPage={state.currentPage}
          onPageChange={handlePageChange}
        />
      </div>

      {/* Custom Modal for creating a ticket */}
      <CustomModal
        showModal={state.showModal}
        onClose={handleCloseModal}
        heading="Create Lottery Ticket"
        inputs={[
          {
            id: "name",
            label: "Name",
            value: state.inputs.name,
            onChange: (value) => handleInputChange("name", value),
          },
          {
            id: "DateTime",
            label: "Date and Time",
            component: (
              <div className="date-time-picker-container">
                <DatePicker
                  selected={
                    state.inputs.DateTime
                      ? new Date(state.inputs.DateTime)
                      : new Date() // Fallback to current date if DateTime is invalid
                  }
                  onChange={handleDateChange}
                  showTimeSelect
                  dateFormat="yyyy-MM-dd'T'HH:mm:ss.SSSXXX" // Format as ISO
                  className="form-control"
                />
              </div>
            ),
          },
          {
            id: "firstPrize",
            label: "First Prize",
            value: state.inputs.firstPrize,
            onChange: (value) => handleInputChange("firstPrize", value),
          },
          {
            id: "sem",
            label: "SEM",
            type: "number",
            value: state.inputs.sem,
            onChange: (value) => handleInputChange("sem", value),
          },
          {
            id: "price",
            label: "Price",
            value: state.inputs.price,
            onChange: (value) => handleInputChange("price", value),
          },
        ]}
        buttonLabel="Create Ticket"
        onButtonClick={handleCreateTicket}
      />
    </SingleCard>
  );
};

export default LotteryMarkets;
