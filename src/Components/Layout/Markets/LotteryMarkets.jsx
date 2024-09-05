import React, { useState } from "react";
// import "bootstrap/dist/js/bootstrap.bundle.min"; // Ensure Bootstrap JS is included
import SingleCard from "../Common/SingleCard";
import Pagination from "../Common/Pagination";
import DearLotteryCard from "../Common/DearLotteryCard";
import { useAppContext } from "../../../contextApi/context";
import CustomModal from "../Common/modal";
import { generateLotteryTicket, generateTicketNumber } from "../../../Utils/apiService";
import strings from "../../../Utils/constant/stringConstant";
import { getLotteryMarketsInitialState } from "../../../Utils/getInitialState";


const LotteryMarkets = () => {
  const { dispatch} = useAppContext();

  const [state, setState] = useState(getLotteryMarketsInitialState);

  const handlePageChange = (pageNumber) => {
    setState(prev => ({ ...prev, currentPage: pageNumber }));
    // Fetch or filter data based on the new page number here
  };

  const handleEntriesChange = (event) => {
    setState(prev => ({ ...prev, entries: event.target.value }));
    // Handle entries per page change here
  };

  const handleOpenModal = () => setState(prev => ({ ...prev, showModal: true }));
  const handleCloseModal = () => setState(prev => ({ ...prev, showModal: false }));

  const handleSemChange = (event) => setState(prev => ({ ...prev, sem: event.target.value }));

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

        setState(prev => ({ ...prev, randomToken: ticketNumber }));
      } else {
        console.error("Failed to generate ticket number");
      }
    }
  }

 async function  handleCreateTicket ()  {
  
  if (state.inputs.sem >0) {
    for (let i = 0; i < state.sem; i++){

      console.log(`Creating ticket ${i + 1} with:`, {
        DateTime: state.inputs.randomToken,
        firstPrize: state.inputs.firstPrize,
        sem: state.inputs.sem,
        price: state.inputs.price,
            });
const response = await  generateLotteryTicket({
  name: state.inputs.name,
  date: state.inputs.DateTime,
  firstPrize: state.inputs.firstPrize,
  sem: state.inputs.sem,
  price: state.inputs.price,

})

    // Handle successful response (optional)
    console.log(`Ticket ${i + 1} created successfully:`, response);

    };


  }
      

    handleCloseModal();
    setState(prev => ({ ...prev, randomToken: "" }));
  };

  const handleInputChange = (field, value) => {
    setState(prev => ({
      ...prev,
      inputs: {
        ...prev.inputs,
        [field]: value
      }
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
            id: "lotteryId",
            label: "Lottery ID",
            value: state.inputs.lotteryId,
            onChange: (value) => handleInputChange("lotteryId", value)
          },
          {
            id: "sem",
            label: "SEM",
            type: "number",
            value: state.inputs.sem,
            onChange: (value) => handleInputChange("sem", value)
          },
          {
            id: "price",
            label: "Price",
            value: state.inputs.price,
            readOnly: true
          }
        ]}
        buttonLabel="Create Ticket"
        onButtonClick={handleCreateTicket}
      />
    </SingleCard>
  );
};

export default LotteryMarkets;
