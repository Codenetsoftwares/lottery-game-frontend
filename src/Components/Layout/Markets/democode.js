<SingleCard
  style={{
    position: "relative",
    width: "100%",
  }}
>
  <div className="card-header-pill text-bold d-flex  align-items-center justify-content-between">
    {/* Left side: Search Input */}
    <div
      className="flex-fill d-flex align-items-center"
      style={{ flexBasis: "33%" }}
    >
      <input
        type="text"
        placeholder="Search Lottery Tickets by SEM"
        value={state.search}
        onChange={async (e) => {
          const searchValue = e.target.value;
          setState((prevState) => ({
            ...prevState,
            search: searchValue, // Update search term in state
          }));
          await fetchLotteryTickets(1); // Fetch tickets with search
        }}
        style={{
          padding: "5px",
          borderRadius: "5px",
          border: "3px solid #ccc",
          marginRight: "15px",
          width: "100%", // Adjust width if needed
        }}
      />
    </div>
    {/* Generate Ticket Number */}
    <div
      className="flex-fill d-flex align-items-center justify-content-center"
      style={{ flexBasis: "33%" }}
    >
      <div>
        <span
          style={{
            color: "#4682B4",
            fontWeight: "bold",
          }}
        >
          Generate Ticket Number To Create Lottery Ticket By SEM
        </span>
        <div style={{ display: "inline-block", marginLeft: "10px" }}>
          <select
            value={state.inputs.sem || ""}
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
            <option value="" disabled>
              Select SEM
            </option>
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
  <div
    className="flex-fill d-flex align-items-center justify-content-end"
    style={{ flexBasis: "33%" }}
  >
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
      onClick={() => setState((prev) => ({ ...prev, showDeleteModal: true }))}
    ></i>
  </div>
</SingleCard>;
