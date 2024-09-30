import React, { useEffect, useState } from "react";
import SingleCard from "../Common/SingleCard";
import Pagination from "../Common/Pagination";
import DearLotteryCard from "../Common/DearLotteryCard";
import { useAppContext } from "../../../contextApi/context";
import { Form,Button} from "react-bootstrap";
import CustomModal from "../Common/modal";
import {
  generateLotteryTicket,
  getLotteryTickets,
  getSelectSemInModal,
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
  const [lotteryCards, setLotteryCards] = useState([]); // State to hold fetched lottery tickets
  
  console.log("===>>> random token", state.inputs.tickets);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalPages: 0,
    totalItems: 0,
  });

  // Fetch tickets when the component mounts
  useEffect(() => {
    fetchLotteryTickets();
  }, [state.pagination.page]);

  const [searchParams, setSearchParams] = useState({
    searchType: "",
    sem: "",
    
  });

  const startIndex = (state.pagination.page - 1) * state.pagination.limit + 1;
  const endIndex = Math.min(
    startIndex + state.pagination.limit - 1,
    state.pagination.totalItems
  );

  // get lottery tickets in the admin panel
  const fetchLotteryTickets = async () => {
    
    const response = await getLotteryTickets({
      page: state.pagination.page || 1,
      limit: state.pagination.limit || 10,
      totalPages: state.pagination.totalPages || 0,
      totalItems: state.pagination.totalItems || 0,
      sem: searchParams.sem || 0
    
    });
    console.log(response)
    if (response) {
      // Save current cards to backup before updating
         setLotteryCards(response.data);
         setState((prev) => ({
        ...prev,
        lotteryCards: response.data,
        pagination: {
          ...prev.pagination,
          totalPages: response.pagination ? response.pagination.totalPages : 0 ,
          totalItems: response.pagination ? response.pagination.totalItems : 0,
        },
      }));

      dispatch({
        type: strings.FETCH_LOTTERY_TICKETS,
        payload: response.data,
      });
    } else {
      console.error("Failed to fetch tickets");
    }
  };
  

  const handleSearchInputChange = (e) => {
    const { name, value } = e.target;
  
    // Update the sem value
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }));
   
  
  if (name === "sem" && value === "") {  // If SEM is cleared, reset pagination to the first page
    setState((prev) => ({
      ...prev,
      pagination: {
        ...prev.pagination,
        page: 1, // Reset to the first page
      },
    }));
  }
};
useEffect(() => {
  fetchLotteryTickets(); // Fetch tickets whenever pagination or SEM changes
}, [searchParams.sem, state.pagination.page]);

 
  const handlePageChange = (newPage) => {
    setState((prev) => ({
      ...prev,

      pagination: {
        ...prev.pagination,
        page: newPage,
      },
    }));
  };

  const handleOpenModal = () =>
    setState((prev) => ({ ...prev, showTicketModal: false, showModal: true }));
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
  


  //GET api to generate the ticket number as by sem values from dropdown
  async function handleGenerateTicketNumber(selectedValue) {
    console.log("Fetching tickets for SEM:", selectedValue);
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
  }
 

  // Define your modal open/close handlers
  const handleTicketOpenModal = () => {
    setState((prev) => ({ ...prev, showTicketModal: true }));
  };

  const handleTicketCloseModal = () => {
    setState((prev) => ({ ...prev, showTicketModal: false }));
  };
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

  // Handle SEM dropdown change
  const handleSemChange = async (value) => {
    // Update the state with the selected SEM value
    handleInputChange("sem", value);

    // Log the selected value to the console
    console.log("SEM selected:", value);
  };

  // Function to handle delete confirmation
  const handleDeleteConfirm = async () => {
    const response = await unPurchasedLotteryTicketsDelete(true); // Call the delete API
    if (response) {
      // Update state to close the delete modal
      setState((prev) => ({
        ...prev,
        showDeleteModal: false, // Close the delete modal
      }));
      fetchLotteryTickets(); // Refresh tickets after deletion
    } else {
      console.error("Failed to delete all lotteries");
    }
  };
  const inputStyle = {
    width: "150px",
    border: searchParams.sem ? "2px solid blue" : "1px solid #ccc", // Change border color when input is not empty
    backgroundColor: searchParams.sem ? "#e6ffe6" : "white", // Change background color when input has value
    padding: "10px",
    borderRadius: "4px",
    boxShadow: searchParams.sem ? "0 0 10px rgba(0, 255, 0, 0.5)" : "none", // Add box-shadow when input is not empty
    transition: "all 0.3s ease", // Smooth transition when styles change
  };
  return (
    <div
      className="bg-white"
      style={{
        minHeight: "100vh",
        // width:"100",
        margin: "0 auto", // Center the div horizontally
        overflowX: "hidden", // Ensure no horizontal overflow
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
            // backgroundColor: "#e6f7ff",
            position: "relative",
            width: "100%",
          }}
        >
          <div className="card-header-pill text-bold d-flex">
            {/* Generate Ticket Number */}
            <div className="flex-grow-1  ml-4 mr-5">
              {/* {state.randomToken ? (
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
                      animation: "pulse 2s infinite",
                    }}
                  >
                    Click here to create a ticket with this number
                  </div>
                </span>
              ) :  */}
                <div>
                  <Form.Group className="d-flex mb-4">
                  <Form.Control
                    type="text"
                     name="sem"
                    value={searchParams.sem}
                    onChange={handleSearchInputChange} // Update the state
                    placeholder="Search by SEM"
                    className="mr-2"
                     style={inputStyle}
                    />
             </Form.Group>
                </div>   
 
               <div>              
                <span
                  style={{
                    cursor: "pointer",
                    color: "#4682B4",
                    fontWeight: "bold",
                  }}
                 
                >
                  Generate Ticket Number To Create Lottery Ticket By SEM
                </span>
                <div style={{ display: "inline-block", marginLeft: "10px" }}>
                  <select
                   value={state.inputs.sem || ""}  //set the default value = "slct sem ",whenever state chnges
                    style={{
                      padding: "5px",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                      backgroundColor: "#f1f1f1",
                      cursor: "pointer",
                    }}
                    
                    onChange={async (e) => {
                      const selectedValue = e.target.value;
                      console.log("Selected Value:", selectedValue);
                      await handleGenerateTicketNumber(selectedValue);
                      setState((prevState) => ({
                        ...prevState,
                        inputs: {
                          ...prevState.inputs,
                          sem: selectedValue, // Set SEM in state
                          
                        },
                       
                      }));
                      
                    }}
                  >
                     
                    <option value="">Select SEM</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    <option value="200">200</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          {/* Delete icon */}
          <div className="mr-4">
            <i
              className="fas fa-trash-alt"
              style={{
                cursor: "pointer",
                fontSize: "2rem",
                color: "#4682B4",
                position: "absolute",
                right: "20px", // Adjusted positioning
                top: "10px", // Adjusted positioning for better visibility
              }}
              title="Delete all unpurchased lottery tickets"
              onClick={() =>
                setState((prev) => ({ ...prev, showDeleteModal: true }))
              }
            ></i>
          </div>
        </SingleCard>
        <div className="card-body  mt-2 mb-3">
          <SingleCard className="mb-2 p-4">
            <div className="container">
              <div className="row justify-content-center">
                {state.lotteryCards ? (
                  state.lotteryCards.map((card) => (
                    <div className="col-md-4 mb-4" key={card.id}>
                      <DearLotteryCard
                        lotteryName={card.name}
                        drawDate={new Date(card.date).toLocaleDateString()}
                        drawTime={new Date(card.date).toLocaleTimeString()}
                        firstPrize={card.firstPrize}
                        sem={card.sem}
                        price={card.price}
                        ticketNumbers={card.ticketNumber}
                      />
                    </div>
                  ))
                ) : (
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
                      Seems like the lottery fairy hasn't visited yet. 🧚‍♀️
                      <br />
                      Don’t worry, you can be the magician who creates the first
                      one! 🎩✨
                    </p>
                    {/* <button
                      className="btn btn-primary mt-3"
                      onClick={handleOpenModal}
                      style={{ animation: "shake 0.5s" }}
                    >
                      Create Your Magic Ticket Now!
                    </button> */}
                  </div>
                )}
              </div>
            </div>
          </SingleCard>
        </div>
        <div style={{ marginTop: "20px" }}>
          <Pagination
            currentPage={state.pagination.page}
            totalPages={state.pagination.totalPages}
            handlePageChange={handlePageChange}
            startIndex={startIndex}
            endIndex={endIndex}
            totalData={state.pagination.totalItems}
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
              value:
                state.inputs.name ??
                (state?.lotteryCards?.length
                  ? state?.lotteryCards[0]?.card?.name
                  : ""),
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
              value:
                state.inputs.firstPrize ??
                (state?.lotteryCards?.length
                  ? state?.lotteryCards[0]?.card?.firstPrize
                  : ""),
              onChange: (value) => handleInputChange("firstPrize", value),
            },

            {
              id: "sem",
              label: "SEM",
              // component: (
              //   <select
              //     className="form-control"
              //     value={state.inputs.sem}
              //     onChange={(e) => handleSemChange(e.target.value)}
              //   >
              //     <option value="">Select SEM</option>
              //     {[5, 10, 25, 50, 100, 200].map((option) => (
              //       <option key={option} value={option}>
              //         {option}
              //       </option>
              //     ))}
              //   </select>
              // ),

              component: (
                <input
                  className="form-control"
                  value={state.inputs.sem} // Display SEM value from state
                  readOnly
                  style={{ backgroundColor: "#e9ecef", cursor: "not-allowed" }} // Optional: Style to make it look disabled
                />
              ),
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

        {/* Modal for confirming deletion */}
        <CustomModal
          showModal={state.showDeleteModal}
          onClose={() =>
            setState((prevState) => ({ ...prevState, showDeleteModal: false }))
          }
          heading={
            <span
              className="text-danger "
              style={{ fontWeight: "900", fontSize: "1.5rem" }}
            >
              Alert !
            </span>
          }
          inputs={[
            {
              label: (
                <>
                  Are you sure you want to delete all the unpurchased lottery
                  tickets?
                </>
              ),
            },
          ]}
          buttonLabel="Delete"
          onButtonClick={handleDeleteConfirm} // Trigger delete when confirmed
          cancelButtonLabel="Cancel"
          textOnly={true}
        />

        <CustomModal
          showModal={state.showTicketModal}
          onClose={() =>
            setState((prevState) => ({ ...prevState, 
              showTicketModal: false,
              inputs: { ...prevState.inputs, sem: "Select SEM" },
            }))
          }
          heading="Generated Lottery Ticket Numbers"
          inputs={(state.inputs.tickets || []).map((ticket) => ({
            label: ticket,
          }))}
          textOnly={true} // Displays ticket numbers only
          buttonLabel="Create Tickets"
          onButtonClick={handleOpenModal}
          cancelButtonLabel="Cancel"
        />
      </div>
    </div>
  );
};

export default LotteryMarkets;
