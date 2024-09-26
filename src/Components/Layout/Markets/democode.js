import React, { useEffect, useState } from "react";
import SingleCard from "../Common/SingleCard";
import Pagination from "../Common/Pagination";
import DearLotteryCard from "../Common/DearLotteryCard";
import { useAppContext } from "../../../contextApi/context";
import CustomModal from "../Common/modal"; // Custom Modal import
import {
  generateLotteryTicket,
  getLotteryTickets,
  getSelectSemInModal,
  singleLotteryDelete,
  singleLotteryEdit,
  unPurchasedLotteryTicketsDelete,
} from "../../../Utils/apiService";
import strings from "../../../Utils/constant/stringConstant";
import { getLotteryMarketsInitialState } from "../../../Utils/getInitialState";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatISO } from "date-fns";
import "./LotteryMarkets.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { Oval } from "react-loader-spinner";

const LotteryMarkets = () => {
  const { store, dispatch } = useAppContext();
  const [state, setState] = useState(getLotteryMarketsInitialState);
  const [hasMore, setHasMore] = useState(true);

  const accessToken = store?.admin?.accessToken;

  // Fetch tickets when the component mounts
  useEffect(() => {
    if (accessToken) {
      fetchLotteryTickets();
    }
  }, [accessToken, state.pagination.page]);

  const fetchLotteryTickets = async (currentPage = state.pagination.page) => {
    const response = await getLotteryTickets({
      page: currentPage,
      limit: state.pagination.limit || 10,
      totalPages: state.pagination.totalPages || 0,
      totalItems: state.pagination.totalItems || 0,
    });
    if (response) {
      setState((prev) => ({
        ...prev,
        lotteryCards:
          currentPage === 1
            ? response.data
            : [...prev.lotteryCards, ...response.data],
        pagination: {
          ...prev.pagination,
          totalPages: response.pagination?.totalPages || 0,
          totalItems: response.pagination?.totalItems || 0,
        },
      }));
      setHasMore(currentPage < (response.pagination?.totalPages || 0));

      dispatch({
        type: strings.FETCH_LOTTERY_TICKETS,
        payload: response.data,
      });
    } else {
      console.error("Failed to fetch tickets");
      setHasMore(false);
    }
  };

  const handlePageChange = (newPage) => {
    setState((prev) => ({
      ...prev,
      pagination: { ...prev.pagination, page: newPage },
    }));
  };

  // Modal Handlers
  const handleOpenModal = (ticket = null) => {
    if (ticket) {
      // Editing mode
      setState((prev) => ({
        ...prev,
        showModal: true,
        inputs: {
          name: ticket.name,
          DateTime: ticket.date,
          firstPrize: ticket.firstPrize,
          price: ticket.price,
          sem: ticket.sem,
          id: ticket.id, // Include the ID for editing
        },
        isEditMode: true, // Set to true for editing
      }));
    } else {
      // Creating new ticket
      setState((prev) => ({
        ...prev,
        showModal: true,
        inputs: getLotteryMarketsInitialState.inputs, // Reset to initial state for a new ticket
        isEditMode: false, // Set to false for creating
      }));
    }
  };

  const handleCloseModal = () => setState((prev) => ({ ...prev, showModal: false, isEditMode: false }));

  const handleDateChange = (date) => {
    const formattedDate = formatISO(date); // Format date as ISO string
    handleInputChange("DateTime", formattedDate);
  };

  // Generate ticket number by SEM
  async function handleGenerateTicketNumber(selectedValue) {
    const response = await getSelectSemInModal(selectedValue);
    if (response && response.success) {
      setState((prev) => ({
        ...prev,
        inputs: { ...prev.inputs, tickets: response.data.tickets },
        showTicketModal: true, // Show the modal when tickets are fetched
      }));
    } else {
      console.error("Failed to fetch ticket numbers");
    }
  }

  // Create or Edit Lottery Ticket
  async function handleSubmitTicket() {
    if (state.inputs.sem > 0) {
      if (state.isEditMode) {
        const response = await singleLotteryEdit({
          id: state.inputs.id, // Assuming each ticket has an ID
          name: state.inputs.name,
          date: state.inputs.DateTime,
          firstPrize: state.inputs.firstPrize,
          sem: state.inputs.sem,
          price: state.inputs.price,
        });

        if (response) {
          dispatch({
            type: strings.EDIT_LOTTERY,
            payload: response.data,
          });
        } else {
          console.error("Failed to edit ticket");
        }
      } else {
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
        } else {
          console.error("Failed to create ticket");
        }
      }
      handleCloseModal(); // Close the modal after submission
      fetchLotteryTickets();
    }
  }

  const handleInputChange = (field, value) => {
    setState((prev) => ({
      ...prev,
      inputs: { ...prev.inputs, [field]: value },
    }));
  };

  // Delete Confirmation Handler
  const handleDeleteConfirm = async () => {
    const response = await unPurchasedLotteryTicketsDelete(true);
    if (response) {
      setState((prev) => ({ ...prev, showDeleteModal: false }));
      fetchLotteryTickets();
    } else {
      console.error("Failed to delete all lotteries");
    }
  };

  return (
    <div className="bg-white" style={{ minHeight: "100vh", margin: "0 auto", overflowX: "hidden" }}>
      <SingleCard>
        <div className="card-header-pill text-bold d-flex">
          <div className="flex-grow-1 ml-4 mr-5">
            <span style={{ color: "#4682B4", fontWeight: "bold" }}>
              Generate Ticket Number To Create Lottery Ticket By SEM
            </span>
            <select
              value={state.inputs.sem || ""}
              onChange={async (e) => {
                const selectedValue = e.target.value;
                await handleGenerateTicketNumber(selectedValue);
                setState((prevState) => ({
                  ...prevState,
                  inputs: { ...prevState.inputs, sem: selectedValue },
                }));
              }}
            >
              <option value="" disabled>Select SEM</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="200">200</option>
            </select>
          </div>
          <i
            className="fas fa-trash-alt"
            style={{ cursor: "pointer", fontSize: "2rem", color: "#4682B4" }}
            title="Delete all unpurchased lottery tickets"
            onClick={() => setState((prev) => ({ ...prev, showDeleteModal: true }))}
          ></i>
        </div>

        <SingleCard className="mb-2 p-4">
          <InfiniteScroll
            dataLength={state.lotteryCards.length}
            next={fetchLotteryTickets}
            hasMore={hasMore}
            loader={
              <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
                <Oval height={40} width={40} color="#4fa94d" visible={true} ariaLabel="loading" />
              </div>
            }
            height={600}
          >
            <div className="container">
              <div className="row justify-content-center">
                {state.lotteryCards.map((card) => (
                  <div className="col-md-4 mb-4" key={card.id}>
                    <DearLotteryCard
                      lotteryName={card.name}
                      drawDate={new Date(card.date).toLocaleDateString()}
                      drawTime={new Date(card.date).toLocaleTimeString()}
                      firstPrize={card.firstPrize}
                      sem={card.sem}
                      onEdit={() => handleOpenModal(card)} // Pass the card to edit
                    />
                  </div>
                ))}
              </div>
            </div>
          </InfiniteScroll>
        </SingleCard>
      </SingleCard>

      {/* Modal for creating/editing lottery ticket */}
      {state.showModal && (
        <CustomModal onClose={handleCloseModal} title={state.isEditMode ? "Edit Lottery Ticket" : "Create Lottery Ticket"}>
          <div>
            <label>Name</label>
            <input
              type="text"
              value={state.inputs.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
            <label>Date</label>
            <DatePicker
              selected={new Date(state.inputs.DateTime)}
              onChange={handleDateChange}
              dateFormat="yyyy/MM/dd"
            />
            <label>First Prize</label>
            <input
              type="number"
              value={state.inputs.firstPrize}
              onChange={(e) => handleInputChange("firstPrize", e.target.value)}
            />
            <label>Price</label>
            <input
              type="number"
              value={state.inputs.price}
              onChange={(e) => handleInputChange("price", e.target.value)}
            />
          </div>
          <button onClick={handleSubmitTicket}>
            {state.isEditMode ? "Update" : "Create"} Ticket
          </button>
        </CustomModal>
      )}

      {/* Delete Confirmation Modal */}
      {state.showDeleteModal && (
        <CustomModal onClose={() => setState((prev) => ({ ...prev, showDeleteModal: false }))} title="Confirm Deletion">
          <div>Are you sure you want to delete all unpurchased lottery tickets?</div>
          <button onClick={handleDeleteConfirm}>Yes</button>
          <button onClick={() => setState((prev) => ({ ...prev, showDeleteModal: false }))}>No</button>
        </CustomModal>
      )}
    </div>
  );
};

export default LotteryMarkets;
