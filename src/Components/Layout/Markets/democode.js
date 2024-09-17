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
  unPurchasedLotteryTicketsDelete,
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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  console.log("===>> all names ", state.lotteryCards);

  useEffect(() => {
    fetchLotteryTickets();
  }, [pagination.page, pagination.limit]);

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
    const formattedDate = formatISO(date);
    handleInputChange("DateTime", formattedDate);
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
        dispatch({
          type: strings.GENERATE_LOTTERY,
          payload: response.data,
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

  const handleDeleteConfirm = async () => {
    const response = await unPurchasedLotteryTicketsDelete(true);
    if (response) {
      setShowDeleteModal(false);
      fetchLotteryTickets();
    } else {
      console.error("Failed to delete all lotteries");
    }
  };

  return (
    <div
      className="bg-white"
      style={{
        minHeight: "100vh",
        margin: "0 auto",
        overflowX: "hidden",
      }}
    >
      <div
        className="card text-center mt-2 mr-5 ml-5"
        style={{
          backgroundColor: "#e6f7ff",
          position: "relative",
        }}
      >
        <SingleCard
          style={{
            position: "relative",
            width: "100%",
          }}
        >
          <div className="card-header-pill text-bold d-flex">
            <div className="flex-grow-1  ml-4 mr-5">
              {state.randomToken ? (
                <span
                  style={{
                    cursor: "pointer",
                    color: "#4682B4",
                    fontWeight: "bold",
                    position: "relative",
                    animation: "fadeIn 1s ease-in-out",
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
                      animation: "pulse 2s infinite",
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
          <div className="mr-4">
            <i
              className="fas fa-trash-alt"
              style={{
                cursor: "pointer",
                fontSize: "2rem",
                color: "#4682B4",
                position: "absolute",
                right: "20px",
                top: "10px",
              }}
              title="Delete all unpurchased lottery tickets"
              onClick={() => setShowDeleteModal(true)}
            ></i>
          </div>
        </SingleCard>

        <div className="card-body mt-2 mb-3">
          <SingleCard className="mb-2 p-4">
            <div className="container">
              <div className="row justify-content-center">
                {state.lotteryCards.length === 0 ? (
                  <div className="text-center mt-5">
                    <img
                      src="https://media.giphy.com/media/jy6UhbChQ5dQ4/giphy.gif"
                      alt="Funny no tickets"
                      style={{ width: "200px" }}
                    />
                    <h4 className="text-warning mt-3">
                      Oops! No Lottery Tickets found!
                    </h4>
                    <p className="text-muted">
                      Seems like the lottery fairy hasn't visited yet. 🧚‍♀️<br />
                      Don’t worry, you can be the magician who creates the first
                      one! 🎩✨
                    </p>
                    <button
                      className="btn btn-primary mt-3"
                      onClick={handleOpenModal}
                      style={{ animation: "shake 0.5s" }}
                    >
                      Create Your Magic Ticket Now!
                    </button>
                  </div>
                ) : (
                  state.lotteryCards.map((card) => (
                    <div className="col-md-4 mb-4" key={card.id}>
                      <DearLotteryCard
                        lotteryName={card.name}
                        drawDate={new Date(card.date).toLocaleDateString()}
                        drawTime={new Date(card.date).toLocaleTimeString()}
                        firstPrize={card.firstPrize}
                        sem={card.sem}
                        price={card.price}
                        ticketNumber={card.ticketNumber}
                      />
                    </div>
                  ))
                )}
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

        <CustomModal
          showModal={state.showModal}
          handleCloseModal={handleCloseModal}
          handleCreateTicket={handleCreateTicket}
          handleDateChange={handleDateChange}
          inputs={state.inputs}
          handleInputChange={handleInputChange}
        />
      </div>

      {/* Delete modal */}
      <CustomModal
        showModal={showDeleteModal}
        handleCloseModal={() => setShowDeleteModal(false)}
        handleConfirm={handleDeleteConfirm}
        title="Confirm Delete"
        body="Are you sure you want to delete all unpurchased lottery tickets?"
      />
    </div>
  );
};

export default LotteryMarkets;
