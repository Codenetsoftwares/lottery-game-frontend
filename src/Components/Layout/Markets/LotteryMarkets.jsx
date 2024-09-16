import React, { useEffect, useState } from "react";
import SingleCard from "../Common/SingleCard";
import Pagination from "../Common/Pagination";
import DearLotteryCard from "../Common/DearLotteryCard";
import { useAppContext } from "../../../contextApi/context";
import CustomModal from "../Common/modal";
import {
  generateLotteryTicket,
  generateTicketNumber,
  getLotteryTickets,
} from "../../../Utils/apiService";
import strings from "../../../Utils/constant/stringConstant";
import { getLotteryMarketsInitialState } from "../../../Utils/getInitialState";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatISO } from "date-fns";
import "./LotteryMarkets.css";

const LotteryMarkets = () => {
  const { dispatch } = useAppContext();

  const [state, setState] = useState(getLotteryMarketsInitialState);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalPages: 0,
    totalItems: 0,
  });
  console.log("===>> all names ", state.inputs);

  // Fetch tickets when the component mounts
  useEffect(() => {
    fetchLotteryTickets();
  }, [pagination.page, pagination.limit]); // Empty dependency array ensures this runs only once when the component mounts

  const startIndex = (pagination.page - 1) * pagination.limit + 1;
  const endIndex = Math.min(
    pagination.page * pagination.limit,
    pagination.totalItems
  );

  const fetchLotteryTickets = async () => {
    const response = await getLotteryTickets({
      page: pagination.page,
      limit: pagination.limit,
      totalPages: pagination.totalPages,
      totalItems: pagination.totalItems,
    });
    if (response) {
      setState((prev) => ({
        ...prev,
        lotteryCards: response.data,
      }));

      setPagination({
        page: response.pagination.page,
        limit: response.pagination.limit,
        totalPages: response.pagination.totalPages,
        totalItems: response.pagination.totalItems,
      });
      dispatch({
        type: strings.FETCH_LOTTERY_TICKETS,
        payload: response.data,
      });
    } else {
      console.error("Failed to fetch tickets");
    }
  };
  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  const handleOpenModal = () =>
    setState((prev) => ({ ...prev, showModal: true }));
  const handleCloseModal = () => {
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

  // post api to generate the ticket number
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
  // post Api to generate lottery tickets with the provided fields
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
        // Dispatch to global state
        dispatch({
          type: strings.GENERATE_LOTTERY,
          payload: response.data, // assuming response.data contains the created ticket info
        });

        handleCloseModal();
        setState((prev) => ({ ...prev, randomToken: "" }));
        fetchLotteryTickets();
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
    <div className="bg-white"   style={{
      height: "600px", // Set main div width
      // width:"100",
      margin: "0 auto", // Center the div horizontally
      overflowX: "hidden", // Ensure no horizontal overflow
    }} >
      <div
        className="card text-center mt-2 mr-5 ml-5"
        style={{
          backgroundColor: "#e6f7ff",
          position: "relative",
        }}
      >
        <SingleCard
          style={{
            // backgroundColor: "#e6f7ff",
            position: "relative",
            width: "100%",
          }}
        >
          <div className="card-header-pill text-bold d-flex">
            {/* Generate Ticket Number */}
            <div className="flex-grow-1  ml-4 mr-5">
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
        <div className="card-body  mt-2 mb-3">
          <SingleCard className="mb-2 p-4">
            <div className="container">
              <div className="row justify-content-center">
                {state.lotteryCards.map((card) => (
                  <div className="col-md-4 mb-4" key={card.id}>
                    <DearLotteryCard
                      lotteryName={card.name}
                      drawDate={new Date(card.date).toLocaleDateString()} // Corrected prop and formatting
                      drawTime={new Date(card.date).toLocaleTimeString()} // Formatting draw time
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
        </div>
        <div style={{ marginTop: "20px" }}>
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            handlePageChange={handlePageChange}
            startIndex={startIndex}
            endIndex={endIndex}
            totalData={pagination.totalItems}
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
                <div className="date-time-picker-container text-center">
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
          textOnly={false} // Ensures inputs are rendered
        />
      </div>
    </div>
  );
};

export default LotteryMarkets;
